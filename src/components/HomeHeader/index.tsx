import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImage, AppText } from '..';
import { fontSize, fontFamily } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import styles from './style';
import images from '../../utils/images';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useCreateConversationMutation } from '../../redux/api/apiSlice';
import { ADMIN_ID } from '../../redux/constant';
import {
  selectConversation,
  setConversation,
  setConvLoading,
  ConvMessage,
  selectConvMessages,
  selectUnreadCount,
} from '../../redux/slices/conversationSlice';
import { sizes } from '../../utils';

const HomeHeader = () => {
  const { user } = useSelector((state: any) => state.auth);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [createConversation] = useCreateConversationMutation();

  const conversation = useSelector(selectConversation);
  const unreadCount = useSelector(selectUnreadCount);
  console.log('HomeHeader conversation from Redux:', conversation);
  const isChatReady = !!conversation;
  const reduxMessages = useSelector(selectConvMessages);
  console.log('HomeHeader messages from Redux:', reduxMessages);

  useEffect(() => {
    // if (conversation) return; // Redux mn conversation hai — API mat chalao
    dispatch(setConvLoading(true));
    createConversation({ recipientId: ADMIN_ID })
      .unwrap()
      .then(res => {
        const conv = res.conversation;
        console.log('conversation', conv);
        const adminParticipant = conv.participants?.find(
          (p: any) => p.model === 'Admin',
        );
        const adminInfo = adminParticipant?.participantId;

        const messages: ConvMessage[] = [...(conv.messages ?? [])]
          .reverse()
          .map((m: any) => ({
            _id: m._id,
            senderId:
              typeof m.senderId === 'string'
                ? m.senderId
                : m.senderId?._id ?? '',
            text: m.content ?? '',
            attachments: m.attachments ?? [],
            createdAt: m.createdAt ?? new Date().toISOString(),
            isRead: m.isRead ?? false,
          }));

        dispatch(
          setConversation({
            _id: conv._id,
            adminId: adminInfo?._id ?? '',
            recipientName: adminInfo
              ? `${adminInfo.firstName ?? ''} ${
                  adminInfo.lastName ?? ''
                }`.trim()
              : 'Admin',
            recipientAvatar: adminInfo?.profile ?? null,
            adminOnline: adminInfo?.isOnline ?? false,
            adminLastSeen: adminInfo?.lastSeen ?? null,
            messages,
            totalPages: 1,
            unreadCount: conv.unreadCount?.[user?._id] ?? 0,
          }),
        );
      })
      .catch(err => {
        console.warn(
          '[HomeHeader] createConversation error:',
          err?.data?.message,
        );
        dispatch(setConvLoading(false));
      });
  }, []);

  const handleChatPress = () => {
    if (!conversation) return;
    navigation.navigate('ChatConversation');
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={images.appHeaderBG}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={[styles.topRow, { paddingTop: sizes.screenHeight * 0.02 }]}>
        <AppImage
          source={images.logoWhite}
          style={styles.logo}
          // resizeMode="contain"
        />
        <View style={styles.topRowRight}>
          <TouchableOpacity
            style={[styles.chatBtn, !isChatReady && styles.chatBtnDisabled]}
            activeOpacity={0.75}
            onPress={handleChatPress}
            disabled={!isChatReady}
          >
            {!isChatReady ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Icon name="message-circle" size={20} color={colors.white} />
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <AppText style={styles.badgeText}>
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </AppText>
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
          <AppImage
            source={user?.profile ? { uri: user.profile } : images.logoWhite}
            style={styles.userImage}
            // resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.content}>
        <AppText
          fontSize={20}
          fontFamily={fontFamily.Regular}
          color={colors.textWhite}
        >
          Welcome Back 👋
        </AppText>
        <AppText
          // fontSize={fontSize.h6}
          fontSize={20}
          fontFamily={fontFamily.Black}
          color={colors.white}
        >
          {user?.firstName} {user?.lastName}
        </AppText>
        <AppText
          fontSize={16}
          fontFamily={fontFamily.Regular}
          color={colors.textBlue}
          style={styles.userRole}
        >
          {user?.role}
        </AppText>
      </View>
    </ImageBackground>
  );
};

export default HomeHeader;
