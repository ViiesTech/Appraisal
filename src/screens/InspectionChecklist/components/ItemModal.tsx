import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppText } from '../../../components';
import { colors, fontFamily, fontSize, sizes } from '../../../utils';
import { ChecklistItem, LocalImage } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (
    task: string,
    notes: string,
    isCompleted: boolean,
    images: LocalImage[],
  ) => void;
  initialItem?: Partial<ChecklistItem>;
  isLoading?: boolean;
}

const ItemModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  initialItem,
  isLoading = false,
}) => {
  const [task, setTask] = useState('');
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [images, setImages] = useState<LocalImage[]>([]);

  useEffect(() => {
    if (visible) {
      setTask(initialItem?.task ?? '');
      setNotes(initialItem?.notes ?? '');
      setIsCompleted(initialItem?.isCompleted ?? false);
      setImages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const pickImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5,
        quality: 0.8,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage ?? 'Cannot pick image');
        return;
      }
      const assets = (result.assets ?? []).map(a => ({
        uri: a.uri ?? '',
        type: a.type,
        fileName: a.fileName,
      }));
      setImages(prev => [...prev, ...assets].slice(0, 5));
    } catch {
      Alert.alert('Error', 'Something went wrong picking images');
    }
  };

  const handleSave = () => {
    if (!task.trim()) return;
    onSave(task.trim(), notes.trim(), isCompleted, images);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.kavContainer} pointerEvents="box-none">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.kav}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.titleRow}>
              <AppText
                fontSize={fontSize.h6}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                {initialItem?._id ? 'Edit Item' : 'Add Item'}
              </AppText>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon name="x" size={20} color={colors.textLighter} />
              </TouchableOpacity>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Task */}
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.label}
              >
                Task *
              </AppText>
              <TextInput
                style={styles.input}
                value={task}
                onChangeText={setTask}
                placeholder="Describe the task..."
                placeholderTextColor={colors.placeholderText}
                multiline
                textAlignVertical="top"
              />

              {/* Notes */}
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.label}
              >
                Notes
              </AppText>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional notes..."
                placeholderTextColor={colors.placeholderText}
                multiline
                textAlignVertical="top"
              />

              {/* Completed toggle */}
              <TouchableOpacity
                style={styles.toggleRow}
                onPress={() => setIsCompleted(v => !v)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, isCompleted && styles.checkboxDone]}>
                  {isCompleted && (
                    <Icon name="check" size={12} color={colors.white} />
                  )}
                </View>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Regular}
                  color={colors.textDark}
                >
                  Mark as completed
                </AppText>
              </TouchableOpacity>

              {/* Photos */}
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.label}
              >
                Photos ({images.length}/5)
              </AppText>
              <View style={styles.photosRow}>
                {images.map((img, idx) => (
                  <View key={idx} style={styles.thumbWrap}>
                    <Image source={{ uri: img.uri }} style={styles.thumb} />
                    <TouchableOpacity
                      style={styles.removeThumb}
                      onPress={() => setImages(p => p.filter((_, i) => i !== idx))}
                    >
                      <Icon name="x" size={10} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ))}
                {images.length < 5 && (
                  <TouchableOpacity
                    style={styles.addPhotoBtn}
                    onPress={pickImages}
                    activeOpacity={0.7}
                  >
                    <Icon name="camera" size={20} color={colors.textLighter} />
                    <AppText
                      fontSize={fontSize.tiny}
                      fontFamily={fontFamily.Regular}
                      color={colors.textLighter}
                      style={{ marginTop: 4 }}
                    >
                      Add
                    </AppText>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <AppText
                  fontSize={fontSize.medium}
                  fontFamily={fontFamily.Bold}
                  color={colors.textDark}
                >
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  (!task.trim() || isLoading) && styles.disabled,
                ]}
                onPress={handleSave}
                activeOpacity={0.8}
                disabled={!task.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                  >
                    {initialItem?._id ? 'Update' : 'Add'}
                  </AppText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ItemModal;

const THUMB = sizes.screenWidth * 0.18;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  kavContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  kav: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.screenWidth * 0.06,
    borderTopRightRadius: sizes.screenWidth * 0.06,
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.016,
    paddingBottom: sizes.screenHeight * 0.04,
    maxHeight: sizes.screenHeight * 0.88,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: sizes.screenHeight * 0.014,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.016,
  },
  scrollContent: {
    paddingBottom: sizes.screenHeight * 0.016,
  },
  label: {
    marginBottom: sizes.screenHeight * 0.008,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Regular,
    color: colors.textDark,
    backgroundColor: '#F9FAFB',
    marginBottom: sizes.screenHeight * 0.016,
  },
  notesInput: {
    minHeight: sizes.screenHeight * 0.08,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.012,
    marginBottom: sizes.screenHeight * 0.016,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  photosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.025,
  },
  thumbWrap: { position: 'relative' },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: sizes.screenWidth * 0.02,
  },
  removeThumb: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoBtn: {
    width: THUMB,
    height: THUMB,
    borderRadius: sizes.screenWidth * 0.02,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  btnRow: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.03,
    marginTop: sizes.screenHeight * 0.016,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.015,
    alignItems: 'center',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.015,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
});
