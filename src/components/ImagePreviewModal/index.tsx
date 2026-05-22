import React from 'react';
import {
  View,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';

const SCREEN_W = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  attachments: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<Props> = ({
  visible,
  attachments,
  initialIndex,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.previewOverlay}>
        <FlatList
          data={attachments}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: SCREEN_W,
            offset: SCREEN_W * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={styles.previewPage}>
              <Image
                source={{ uri: item }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            </View>
          )}
        />
        <TouchableOpacity style={styles.previewClose} onPress={onClose}>
          <Icon name="x" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImagePreviewModal;
