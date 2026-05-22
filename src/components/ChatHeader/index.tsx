import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppText from '../AppText';
import AppImage from '../AppImage';
import { colors, fontFamily, fontSize } from '../../utils';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';

interface Props {
  name: string;
  avatar: string | null | undefined;
  isOtherTyping: boolean;
  adminOnline: boolean;
  adminLastSeen: string | null;
  paddingTop: number;
  onBack: () => void;
}

const ChatHeader: React.FC<Props> = ({
  name,
  avatar,
  isOtherTyping,
  adminOnline,
  adminLastSeen,
  paddingTop,
  onBack,
}) => {
  const statusText = isOtherTyping
    ? 'Typing...'
    : adminOnline
    ? 'Online'
    : adminLastSeen
    ? `Last seen ${new Date(adminLastSeen).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    : 'Offline';

  const statusColor = isOtherTyping
    ? colors.blueNormal
    : adminOnline
    ? '#22C55E'
    : colors.placeholderText;

  return (
    <View style={[styles.header, { paddingTop }]}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Icon name="arrow-left" size={22} color={colors.textDark} />
      </TouchableOpacity>

      <View style={styles.headerAvatar}>
        {avatar ? (
          <AppImage
            source={{ uri: avatar }}
            style={styles.headerAvatarImg}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.headerAvatarFallback}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.white}
            >
              {name?.charAt(0).toUpperCase()}
            </AppText>
          </View>
        )}
        {adminOnline && <View style={styles.headerOnlineDot} />}
      </View>

      <View style={styles.headerInfo}>
        <AppText
          fontSize={fontSize.smallM}
          fontFamily={fontFamily.Bold}
          color={colors.textDark}
          numberOfLines={1}
        >
          {name}
        </AppText>
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={statusColor}
        >
          {statusText}
        </AppText>
      </View>

    </View>
  );
};

export default ChatHeader;
