import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppText from '../AppText';
import { colors, fontFamily, fontSize } from '../../utils';
import { PendingAttachment } from '../../screens/ChatConversation/types';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'];
const isImageUri = (uri: string): boolean => {
  const ext = uri.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
  return IMAGE_EXTS.includes(ext);
};

const getFilename = (uri: string): string =>
  decodeURIComponent(uri.split('/').pop()?.split('?')[0] ?? 'File');

interface Props {
  inputText: string;
  pendingAttachments: PendingAttachment[];
  convId: string;
  paddingBottom: number;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onPickAttachment: () => void;
  onRemoveAttachment: (uri: string) => void;
  onSend: () => void;
}

const ChatInputBar: React.FC<Props> = ({
  inputText,
  pendingAttachments,
  convId,
  paddingBottom,
  onChangeText,
  onFocus,
  onBlur,
  onPickAttachment,
  onRemoveAttachment,
  onSend,
}) => {
  const inputRef = useRef<TextInput>(null);

  // Force-clear the native input on Android when value is reset to empty
  useEffect(() => {
    if (inputText === '') {
      inputRef.current?.clear();
    }
  }, [inputText]);

  const canSend = (!!inputText.trim() || pendingAttachments.length > 0) && !!convId;

  return (
    <>
      {/* Attachment preview strip */}
      {pendingAttachments.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.attachPreviewStrip}
          contentContainerStyle={styles.attachPreviewContent}
        >
          {pendingAttachments.map(a => (
            <View key={a.uri} style={styles.attachThumbWrap}>
              {isImageUri(a.uri) ? (
                <Image source={{ uri: a.uri }} style={styles.attachThumb} resizeMode="cover" />
              ) : (
                <View style={styles.attachDocThumb}>
                  <Icon name="file-text" size={26} color={colors.blueNormal} />
                  <AppText
                    fontSize={8}
                    fontFamily={fontFamily.Regular}
                    color={colors.textDark}
                    numberOfLines={2}
                    style={styles.attachDocName}
                  >
                    {getFilename(a.uri)}
                  </AppText>
                </View>
              )}
              <TouchableOpacity
                style={styles.attachRemoveBtn}
                onPress={() => onRemoveAttachment(a.uri)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Icon name="x" size={10} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Input row */}
      <View style={[styles.inputBar, { paddingBottom }]}>
        <View style={styles.inputWrap}>
          <TouchableOpacity
            style={styles.attachBtn}
            activeOpacity={0.7}
            onPress={onPickAttachment}
          >
            <Icon
              name="paperclip"
              size={18}
              color={
                pendingAttachments.length > 0
                  ? colors.blueNormal
                  : colors.placeholderText
              }
            />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.placeholderText}
            value={inputText}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline
            maxLength={1000}
            editable={!!convId}
          />
        </View>
        <TouchableOpacity
          style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
          onPress={onSend}
          activeOpacity={0.8}
          disabled={!canSend}
        >
          <Icon name="send" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatInputBar;
