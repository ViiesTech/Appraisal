import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ScreenFooterActions,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import type { ViewStyle } from 'react-native';
import { useChangePasswordMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

interface PasswordErrors {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = ({ navigation }: any) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<PasswordErrors>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validate = (): boolean => {
    const newErrors: PasswordErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!oldPassword.trim()) {
      newErrors.oldPassword = 'Current password is required';
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (newPassword === oldPassword) {
      newErrors.newPassword = 'New password must differ from current password';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !newErrors.oldPassword && !newErrors.newPassword && !newErrors.confirmPassword;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const result = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      showToast('success', result.message || 'Password changed successfully');
      navigation.goBack();
    } catch (err: any) {
      const message = err?.data?.message || 'Failed to change password';
      showToast('error', message);
    }
  };

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader title="Change Password" containerStyle={headerContainerStyle} />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconWrap}>
            <Icon name="shield" size={18} color={colors.blueNormal} />
          </View>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textDark}
            style={styles.infoText}
          >
            Your new password must be at least 8 characters and different from
            your current password.
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Update Password
          </AppText>

          {/* Current Password */}
          <AppText style={styles.label}>Current Password *</AppText>
          <View
            style={[
              styles.inputWrap,
              !!errors.oldPassword && styles.inputWrapError,
            ]}
          >
            <Icon name="lock" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={oldPassword}
              onChangeText={(t) => {
                setOldPassword(t);
                if (errors.oldPassword) setErrors(prev => ({ ...prev, oldPassword: '' }));
              }}
              placeholder="Enter current password"
              placeholderTextColor={colors.placeholderText}
              secureTextEntry={!showOld}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowOld(v => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                name={showOld ? 'eye' : 'eye-off'}
                size={16}
                color={colors.placeholderText}
              />
            </TouchableOpacity>
          </View>
          {!!errors.oldPassword && (
            <AppText style={styles.errorText}>{errors.oldPassword}</AppText>
          )}

          {/* New Password */}
          <AppText style={[styles.label, styles.labelSpacing]}>New Password *</AppText>
          <View
            style={[
              styles.inputWrap,
              !!errors.newPassword && styles.inputWrapError,
            ]}
          >
            <Icon name="lock" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={(t) => {
                setNewPassword(t);
                if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
              }}
              placeholder="Enter new password"
              placeholderTextColor={colors.placeholderText}
              secureTextEntry={!showNew}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNew(v => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                name={showNew ? 'eye' : 'eye-off'}
                size={16}
                color={colors.placeholderText}
              />
            </TouchableOpacity>
          </View>
          {!!errors.newPassword && (
            <AppText style={styles.errorText}>{errors.newPassword}</AppText>
          )}

          {/* Confirm New Password */}
          <AppText style={[styles.label, styles.labelSpacing]}>Confirm New Password *</AppText>
          <View
            style={[
              styles.inputWrap,
              !!errors.confirmPassword && styles.inputWrapError,
            ]}
          >
            <Icon name="lock" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              placeholder="Re-enter new password"
              placeholderTextColor={colors.placeholderText}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(v => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                name={showConfirm ? 'eye' : 'eye-off'}
                size={16}
                color={colors.placeholderText}
              />
            </TouchableOpacity>
          </View>
          {!!errors.confirmPassword && (
            <AppText style={styles.errorText}>{errors.confirmPassword}</AppText>
          )}
        </View>
      </AppScrollView>

      <ScreenFooterActions
        primaryLabel="Update Password"
        onPrimaryPress={handleSubmit}
        isLoading={isLoading}
        secondaryLabel="Cancel"
        onSecondaryPress={() => navigation.goBack()}
      />
    </Wrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.016,
    paddingBottom: sizes.screenHeight * 0.016,
    gap: sizes.screenHeight * 0.014,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EAF0FF',
    borderRadius: sizes.screenWidth * 0.03,
    padding: sizes.screenWidth * 0.035,
    gap: sizes.screenWidth * 0.03,
  },
  infoIconWrap: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.016,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: sizes.screenHeight * 0.014,
  },
  label: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
    marginBottom: sizes.screenHeight * 0.006,
  },
  labelSpacing: {
    marginTop: sizes.screenHeight * 0.012,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.025,
    paddingHorizontal: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
    backgroundColor: '#F8FAFC',
  },
  inputWrapError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
    paddingVertical: 0,
  },
  errorText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.error,
    marginTop: sizes.screenHeight * 0.004,
  },
});
