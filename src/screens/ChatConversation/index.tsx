import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Wrapper,
  AppText,
  ChatHeader,
  ChatInputBar,
  MessageBubble,
  TypingIndicator,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import {
  selectConversation,
  selectConvMessages,
  selectConvIsLoading,
  appendOlderMessages,
  addOptimisticMessage,
  confirmMessage,
  removeMessage,
  markAllMessagesRead,
  setUnreadCount,
  ConvMessage,
} from '../../redux/slices/conversationSlice';
import {
  joinConversation,
  leaveConversation,
  onTyping,
  onStopTyping,
  onMessagesSeen,
  emitTyping,
  emitStopTyping,
  markMessagesRead,
} from '../../utils/chatSocket';
import {
  useSendChatMessageMutation,
  apiSlice,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

import { LocalMessage, PendingAttachment } from './types';
import { chatStyles as styles } from './styles';

const toLocal = (m: ConvMessage): LocalMessage => ({
  _id: m._id,
  senderId: m.senderId,
  text: m.text,
  attachments: m.attachments,
  createdAt: new Date(m.createdAt),
  isRead: m.isRead,
  isOptimistic: m.isOptimistic,
});

const rawToConv = (m: any): ConvMessage => ({
  _id: m._id,
  senderId: typeof m.senderId === 'string' ? m.senderId : m.senderId?._id ?? '',
  text: m.content ?? m.text ?? '',
  attachments: m.attachments ?? [],
  createdAt: m.createdAt ?? new Date().toISOString(),
  isRead: m.isRead ?? false,
});

// ---------------------------------------------------------------------------
// ChatConversation screen
// ---------------------------------------------------------------------------
const ChatConversation = ({ navigation }: any) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  // Single conversation object from Redux
  const conversation = useSelector(selectConversation);
  const reduxMessages = useSelector(selectConvMessages);

  const convId = conversation?._id ?? '';
  const recipientName = conversation?.recipientName ?? 'Admin';
  const recipientAvatar = conversation?.recipientAvatar ?? null;
  const adminId = conversation?.adminId ?? null;
  const adminOnline = conversation?.adminOnline ?? false;
  const adminLastSeen = conversation?.adminLastSeen ?? null;

  // UI-only state
  const [inputText, setInputText] = useState('');
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<
    PendingAttachment[]
  >([]);
  // On re-entry redux may already hold messages from a previous visit.
  // Derive the current page from the loaded count so pagination and the
  // kick-back guard both start from the correct position.
  const initialPage = Math.floor(reduxMessages.length / 20) || 1;
  const [page, setPage] = useState(initialPage);
  // createConversation hardcodes totalPages:1 in redux regardless of real count.
  // Seed with initialPage+1 when we have a full page so handleLoadMore can fire
  // on first scroll-to-top. The real value is updated from each getMessages response.
  const [totalPages, setTotalPages] = useState(
    reduxMessages.length >= 20 ? initialPage + 1 : 1,
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  // Ref mirrors isFetchingMore so handleLoadMore always reads the latest value
  // even before React re-renders — prevents concurrent page loads when
  // onEndReached fires multiple times in the same JS tick.
  const isFetchingMoreRef = useRef(false);
  // Android: KAV doesn't reliably reset after keyboard dismisses in edge-to-edge
  // mode (RN 0.76+). Track exact keyboard height manually instead.
  const [androidKeyboardOffset, setAndroidKeyboardOffset] = useState(0);
  const convIsLoading = useSelector(selectConvIsLoading);

  const flatListRef = useRef<FlatList>(null);

  // Convert Redux messages (ISO dates) -> LocalMessage (Date objects) for render
  const messages: LocalMessage[] = useMemo(
    () => reduxMessages.map(toLocal),
    [reduxMessages],
  );

  const [sendChatMessage] = useSendChatMessageMutation();

  // -- Keyboard (Android only) -----------------------------------------------
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const show = Keyboard.addListener('keyboardDidShow', e => {
      setAndroidKeyboardOffset(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setAndroidKeyboardOffset(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // -- Pagination ------------------------------------------------------------
  const handleLoadMore = useCallback(async () => {
    if (isFetchingMoreRef.current || page >= totalPages || !convId) return;
    isFetchingMoreRef.current = true; // synchronous guard — blocks re-entrant calls
    setIsFetchingMore(true);
    try {
      const result = await dispatch(
        (apiSlice.endpoints as any).getMessages.initiate(
          { conversationId: convId, page: page + 1, limit: 20 },
          { forceRefetch: true },
        ),
      );
      if (result.data) {
        const realTotalPages = result.data.totalPages ?? totalPages;
        setTotalPages(realTotalPages);
        if (result.data.messages.length > 0) {
          const older = [...result.data.messages].reverse().map(rawToConv);
          dispatch(appendOlderMessages(older));
          setPage(page + 1);
        }
      }
    } finally {
      isFetchingMoreRef.current = false;
      setIsFetchingMore(false);
    }
  }, [page, totalPages, convId, dispatch]);

  // -- Socket ----------------------------------------------------------------
  useEffect(() => {
    if (!convId) return;
    joinConversation(convId);
    markMessagesRead(convId, user?._id);
    dispatch(setUnreadCount(0));

    const unsubTyping = onTyping(data => {
      if (data.conversationId === convId && data.senderId !== user?._id)
        setIsOtherTyping(true);
    });

    const unsubStopTyping = onStopTyping(data => {
      if (data.conversationId === convId && data.senderId !== user?._id)
        setIsOtherTyping(false);
    });

    const unsubMessagesSeen = onMessagesSeen(data => {
      if (data.conversationId === convId && data.seenBy === adminId) {
        dispatch(markAllMessagesRead());
      }
    });

    return () => {
      unsubTyping();
      unsubStopTyping();
      unsubMessagesSeen();
      leaveConversation(convId);
    };
  }, [convId, user?._id, adminId, dispatch]);

  // -- Typing -------------------------------------------------------
  const handleInputFocus = useCallback(() => {
    if (!convId || !adminId) return;
    emitTyping(convId, adminId);
  }, [convId, adminId]);

  const handleInputBlur = useCallback(() => {
    if (!convId || !adminId) return;
    emitStopTyping(convId, adminId);
  }, [convId, adminId]);

  // -- Image picker ----------------------------------------------------------
  const handlePickAttachment = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'mixed', selectionLimit: 5, quality: 0.8 },
      response => {
        if (response.didCancel || response.errorCode) return;
        const picked: PendingAttachment[] = (response.assets ?? []).map(a => ({
          uri: a.uri!,
          name: a.fileName ?? `file_${Date.now()}`,
          type: a.type ?? 'image/jpeg',
        }));
        setPendingAttachments(prev => [...prev, ...picked].slice(0, 5));
      },
    );
  }, []);

  const handleRemoveAttachment = useCallback((uri: string) => {
    setPendingAttachments(prev => prev.filter(a => a.uri !== uri));
  }, []);

  // -- Send ------------------------------------------------------------------
  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text && pendingAttachments.length === 0) return;
    if (!convId) return;

    const optimisticId = `local_${Date.now()}`;
    const snapshot = pendingAttachments;

    const optimistic: ConvMessage = {
      _id: optimisticId,
      senderId: user?._id,
      text,
      attachments: snapshot.map(a => a.uri),
      createdAt: new Date().toISOString(),
      isRead: false,
      isOptimistic: true,
    };

    dispatch(addOptimisticMessage(optimistic));
    setInputText('');
    setPendingAttachments([]);
    Keyboard.dismiss();

    const formData = new FormData();
    if (text) formData.append('content', text);
    snapshot.forEach(a => {
      formData.append('attachments', {
        uri: a.uri,
        name: a.name,
        type: a.type,
      } as any);
    });

    try {
      const res = await sendChatMessage({
        conversationId: convId,
        formData,
      }).unwrap();
      dispatch(
        confirmMessage({
          optimisticId,
          message: rawToConv(res.data),
        }),
      );
    } catch (err: any) {
      dispatch(removeMessage(optimisticId));
      setPendingAttachments(snapshot);
      showToast(
        'error',
        'Send Failed',
        err?.data?.message || 'Message not sent',
      );
    }
  }, [
    inputText,
    convId,
    user?._id,
    pendingAttachments,
    sendChatMessage,
    dispatch,
  ]);

  // -- Render ----------------------------------------------------------------
  return (
    <Wrapper
      style={styles.container}
    >
      <ChatHeader
        name={recipientName}
        avatar={recipientAvatar}
        isOtherTyping={isOtherTyping}
        adminOnline={adminOnline}
        adminLastSeen={adminLastSeen}
        paddingTop={sizes.screenHeight * 0.02}
        onBack={() => navigation.goBack()}
      />
      {convIsLoading && messages.length === 0 ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.blueNormal} />
        </View>
      ) : Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item._id}
            inverted
            style={styles.flex}
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isOwn={item.senderId === user?._id}
              />
            )}
            ListHeaderComponent={isOtherTyping ? <TypingIndicator /> : null}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              isFetchingMore ? (
                <View style={styles.loadingMoreWrap}>
                  <ActivityIndicator size="small" color={colors.blueNormal} />
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyWrap}>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.placeholderText}
                  align="center"
                >
                  No messages yet.{'\n'}Say hello! 👋
                </AppText>
              </View>
            }
          />
          <ChatInputBar
            inputText={inputText}
            pendingAttachments={pendingAttachments}
            convId={convId}
            paddingBottom={insets.bottom || 8}
            onChangeText={setInputText}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onPickAttachment={handlePickAttachment}
            onRemoveAttachment={handleRemoveAttachment}
            onSend={handleSend}
          />
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.flex, { paddingBottom: androidKeyboardOffset }]}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item._id}
            inverted
            style={styles.flex}
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isOwn={item.senderId === user?._id}
              />
            )}
            ListHeaderComponent={isOtherTyping ? <TypingIndicator /> : null}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              isFetchingMore ? (
                <View style={styles.loadingMoreWrap}>
                  <ActivityIndicator size="small" color={colors.blueNormal} />
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyWrap}>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.placeholderText}
                  align="center"
                >
                  No messages yet.{'\n'}Say hello! 👋
                </AppText>
              </View>
            }
          />
          <ChatInputBar
            inputText={inputText}
            pendingAttachments={pendingAttachments}
            convId={convId}
            paddingBottom={insets.bottom || 8}
            onChangeText={setInputText}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onPickAttachment={handlePickAttachment}
            onRemoveAttachment={handleRemoveAttachment}
            onSend={handleSend}
          />
        </View>
      )}
    </Wrapper>
  );
};

export default ChatConversation;
