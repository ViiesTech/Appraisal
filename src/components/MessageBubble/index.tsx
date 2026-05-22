import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppText from '../AppText';
import { colors, fontFamily, fontSize } from '../../utils';
import { LocalMessage } from '../../screens/ChatConversation/types';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';
import ImageGrid from '../ImageGrid';
import ImagePreviewModal from '../ImagePreviewModal';
import { useNavigation } from '@react-navigation/native';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'];

const isImageUrl = (url: string): boolean => {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
  return IMAGE_EXTS.includes(ext);
};

const getFilename = (url: string): string =>
  decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? 'Document');

interface Props {
  message: LocalMessage;
  isOwn: boolean;
}

const MessageBubble: React.FC<Props> = ({ message, isOwn }) => {
  const navigation = useNavigation<any>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const allAttachments = message.attachments ?? [];
  const imageAttachments = allAttachments.filter(isImageUrl);
  const docAttachments = allAttachments.filter(a => !isImageUrl(a));

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const openDoc = (url: string) => {
    navigation.navigate('DocumentViewer', {
      url,
      title: getFilename(url),
    });
  };

  const timeStr = message.createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const hasAttachments = imageAttachments.length > 0 || docAttachments.length > 0;
  const hasText = !!message.text;

  const tickIcon = message.isOptimistic ? (
    <Icon
      name="clock"
      size={11}
      color="rgba(255,255,255,0.5)"
      style={{ marginLeft: 4 }}
    />
  ) : (
    <Icon
      name={message.isRead ? 'check-circle' : 'check'}
      size={11}
      color={message.isRead ? '#93C5FD' : 'rgba(255,255,255,0.6)'}
      style={{ marginLeft: 4 }}
    />
  );

  return (
    <>
      <ImagePreviewModal
        visible={previewVisible}
        attachments={imageAttachments}
        initialIndex={previewIndex}
        onClose={() => setPreviewVisible(false)}
      />

      <View style={[styles.bubbleRow, isOwn ? styles.bubbleRowOwn : styles.bubbleRowOther]}>
        <View
          style={[
            styles.bubble,
            isOwn ? styles.bubbleOwn : styles.bubbleOther,
            message.isOptimistic && styles.bubbleOptimistic,
          ]}
        >
          {/* Images — smart grid */}
          {imageAttachments.length > 0 && (
            <ImageGrid attachments={imageAttachments} onPress={openPreview} />
          )}

          {/* Documents */}
          {docAttachments.map((url) => (
            <TouchableOpacity
              key={url}
              style={[styles.docCard, isOwn ? styles.docCardOwn : styles.docCardOther]}
              activeOpacity={0.75}
              onPress={() => openDoc(url)}
            >
              <Icon name="file-text" size={16} color={isOwn ? colors.white : colors.blueNormal} />
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.SemiBold}
                color={isOwn ? colors.white : colors.textDark}
                numberOfLines={1}
                style={styles.docCardInfo}
              >
                {getFilename(url)}
              </AppText>
              <Icon name="external-link" size={13} color={isOwn ? 'rgba(255,255,255,0.6)' : colors.placeholderText} />
            </TouchableOpacity>
          ))}

          {/* Text + time inline (when message also has images) */}
          {hasText && hasAttachments && (
            <View style={styles.bubbleTextRow}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={isOwn ? colors.white : colors.textDark}
                style={styles.bubbleTextContent}
              >
                {message.text}
                {'  '}
              </AppText>
              <View style={styles.bubbleMetaInline}>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={isOwn ? 'rgba(255,255,255,0.6)' : colors.placeholderText}
                >
                  {timeStr}
                </AppText>
                {isOwn && tickIcon}
              </View>
            </View>
          )}

          {/* Plain text only — stacked layout */}
          {hasText && !hasAttachments && (
            <>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={isOwn ? colors.white : colors.textDark}
              >
                {message.text}
              </AppText>
              <View style={styles.bubbleMeta}>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={isOwn ? 'rgba(255,255,255,0.6)' : colors.placeholderText}
                >
                  {timeStr}
                </AppText>
                {isOwn && tickIcon}
              </View>
            </>
          )}

          {/* Image only — time below */}
          {!hasText && (
            <View style={styles.bubbleMeta}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={isOwn ? 'rgba(255,255,255,0.6)' : colors.placeholderText}
              >
                {timeStr}
              </AppText>
              {isOwn && tickIcon}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default MessageBubble;
