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
} from 'react-native';
import { AppText } from '../../../components';
import { colors, fontFamily, fontSize, sizes } from '../../../utils';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  initialTitle?: string;
  isLoading?: boolean;
}

const CategoryModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  initialTitle = '',
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (visible) setTitle(initialTitle);
  }, [visible, initialTitle]);

  const handleSave = () => {
    if (title.trim()) onSave(title.trim());
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

            <AppText
              fontSize={fontSize.h6}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.modalTitle}
            >
              {initialTitle ? 'Edit Category' : 'Add Category'}
            </AppText>

            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={styles.label}
            >
              Category Title
            </AppText>

            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Exterior Inspection"
              placeholderTextColor={colors.placeholderText}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />

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
                  (!title.trim() || isLoading) && styles.disabled,
                ]}
                onPress={handleSave}
                activeOpacity={0.8}
                disabled={!title.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                  >
                    {initialTitle ? 'Update' : 'Add'}
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

export default CategoryModal;

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
    paddingBottom: sizes.screenHeight * 0.04,
    paddingTop: sizes.screenHeight * 0.016,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: sizes.screenHeight * 0.018,
  },
  modalTitle: {
    marginBottom: sizes.screenHeight * 0.018,
  },
  label: {
    marginBottom: sizes.screenHeight * 0.008,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.014,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Regular,
    color: colors.textDark,
    backgroundColor: '#F9FAFB',
    marginBottom: sizes.screenHeight * 0.024,
  },
  btnRow: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.03,
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
