import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppKeyboardAvoidingView,
  ScreenFooterActions,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import type { ViewStyle } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setCredentials } from '../../redux/slices/authSlice';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
};

const EditProfile = ({ navigation }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [profession, setProfession] = useState(user?.profession || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [location, setLocation] = useState(user?.location?.address || '');
  const [photoAsset, setPhotoAsset] = useState<Asset | null>(null);
  const [photoName, setPhotoName] = useState('Upload new photo');

  const handlePickProfilePhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result.didCancel) return;

      if (result.errorCode) {
        Alert.alert(
          'Photo Picker',
          result.errorMessage || 'Failed to pick image',
        );
        return;
      }

      const selectedAsset = result.assets?.[0];
      if (selectedAsset) {
        setPhotoAsset(selectedAsset);
        setPhotoName(selectedAsset.fileName || 'Photo selected');
      }
    } catch {
      Alert.alert('Photo Picker', 'Something went wrong while selecting photo');
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('profession', profession);
    formData.append('bio', bio);
    formData.append('phoneNumber', phone);

    // Send location as an object with static coordinates (Times Square) until GPS is integrated
    const locationObj = {
      address: location,
      coordinates: [40.758, -73.9855], // Times Square, NYC (static placeholder)
    };
    formData.append('location', JSON.stringify(locationObj));

    if (photoAsset?.uri) {
      formData.append('profile', {
        uri: photoAsset.uri,
        type: photoAsset.type || 'image/jpeg',
        name: photoAsset.fileName || 'profile.jpg',
      } as any);
    }

    try {
      const result = await updateProfile(formData).unwrap();
      if (result.success) {
        dispatch(setCredentials({ user: result.appraiser }));
        showToast(
          'success',
          'Profile Updated',
          result.message || 'Your profile has been updated.',
        );
        navigation.goBack();
      } else {
        showToast('error', 'Update Failed', result.message);
      }
    } catch (err: any) {
      console.log('erroor',err)
      const errorMsg = err?.data?.message || 'Failed to update profile';
      showToast('error', 'Update Failed', errorMsg);
    }
  };

  // const handleGetStarted = async () => {
  //   try {
  //     const url = `https://easylandmaintenance.apiforapp.link/auth/landscraper/signup`;

  //     // 3. Construct FormData
  //     const uploadData = new FormData();
  //     uploadData.append('name', 'Alpha');
  //     uploadData.append('email', 'alpha@yopmail.com');
  //     uploadData.append('phone', '1234567890');
  //     uploadData.append('password', 'password123');
  //     uploadData.append('pricingPerKm', '5');
  //     if (photoAsset?.uri) {
  //       uploadData.append('profile', {
  //         uri: photoAsset.uri,
  //         type: photoAsset.type || 'image/jpeg',
  //         name: photoAsset.fileName || 'profile.jpg',
  //       } as any);
  //     }
  //     let locationData = {
  //       address: '123 Main St, Anytown, USA',
  //       coordinates: [40.7128, -74.006], // Static coordinates for now
  //     };
  //     let workingHours = {
  //       monday: { isOpen: true, startTime: '09:00', endTime: '18:00' },
  //       tuesday: { isOpen: true, startTime: '09:00', endTime: '18:00' },
  //       wednesday: { isOpen: true, startTime: '09:00', endTime: '18:00' },
  //       thursday: { isOpen: true, startTime: '09:00', endTime: '18:00' },
  //       friday: { isOpen: true, startTime: '09:00', endTime: '18:00' },
  //       saturday: { isOpen: false },
  //       sunday: { isOpen: false },
  //     };

  //     // Stringify objects/arrays for Multipart/Form-Data
  //     uploadData.append(
  //       'services',
  //       JSON.stringify(['69e94f8766693295faa9b5bf']),
  //     );
  //     uploadData.append('workingHours', JSON.stringify(workingHours || []));
  //     uploadData.append('location', JSON.stringify(locationData));

  //     // 4. Append Profile Image
  //     // if (state.profileImage?.uri) {
  //     //   uploadData.append('profile', {
  //     //     uri: state.profileImage.uri,
  //     //     type: state.profileImage.type || 'image/jpeg',
  //     //     name: state.profileImage.fileName || `profile_${Date.now()}.jpg`,
  //     //   });
  //     // }

  //     // 5. Append Portfolio Images (Multi-file)
  //     // if (Array.isArray(state.portfolio)) {
  //     //   state.portfolio.forEach((image, index) => {
  //     //     if (image.uri) {
  //     //       uploadData.append('portfolio', {
  //     //         uri: image.uri,
  //     //         type: image.type || 'image/jpeg',
  //     //         name: image.fileName || `portfolio_${Date.now()}_${index}.jpg`,
  //     //       });
  //     //     }
  //     //   });
  //     // }
  //   console('FormData prepared for submission:', uploadData);
  //     // 6. Execute Request
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         // Content-Type is omitted: fetch sets it automatically for FormData
  //         // ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //       },
  //       body: uploadData,
  //     });

  //     const dataRes = await response.json();

  //     if (response.ok && dataRes?.success) {
  //       console.log('Signup successful!', dataRes);
  //       // Handle success (e.g., Navigate to Home or Show Toast)
  //     } else {
  //       console.error('Signup failed:', dataRes?.message || 'Unknown Error');
  //       // Show user-friendly error message here
  //     }
  //   } catch (error) {
  //     console.error('NETWORK ERROR:', error);
  //     // Handle offline status or timeout here
  //   }
  // };

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Edit Profile"
        showBackground
        containerStyle={headerContainerStyle}
        rightActionText="Save"
        rightActionIcon="save"
      />

      <AppKeyboardAvoidingView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Profile Photo
          </AppText>
          <TouchableOpacity
            style={styles.uploadPhotoBox}
            activeOpacity={0.8}
            onPress={handlePickProfilePhoto}
          >
            <View style={styles.photoIconWrap}>
              <Icon name="user" size={24} color={colors.blueNormal} />
            </View>
            <View style={styles.photoTextWrap}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                numberOfLines={1}
              >
                {photoName}
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                JPG, PNG or GIF Max size 5MB
              </AppText>
            </View>
            <Icon name="upload" size={18} color={colors.blueNormal} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Personal Information
          </AppText>

          <AppText style={styles.label}>First Name *</AppText>
          <View style={styles.inputWrap}>
            <Icon name="user" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor={colors.placeholderText}
            />
          </View>

          <AppText style={styles.label}>Last Name *</AppText>
          <View style={styles.inputWrap}>
            <Icon name="user" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor={colors.placeholderText}
            />
          </View>

          <AppText style={styles.label}>Profession</AppText>
          <View style={styles.inputWrap}>
            <Icon name="briefcase" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={profession}
              onChangeText={setProfession}
              placeholderTextColor={colors.placeholderText}
            />
          </View>

          <AppText style={styles.label}>Bio</AppText>
          <TextInput
            style={styles.textArea}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself..."
            placeholderTextColor={colors.placeholderText}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            maxLength={200}
          />
          <AppText style={styles.counterText}>
            {bio.length}/200 characters
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Contact Information
          </AppText>

          <AppText style={styles.label}>Phone Number</AppText>
          <View style={styles.inputWrap}>
            <Icon name="phone" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor={colors.placeholderText}
            />
          </View>

          <AppText style={styles.label}>Location</AppText>
          <View style={styles.inputWrap}>
            <Icon name="map-pin" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your address"
              placeholderTextColor={colors.placeholderText}
            />
          </View>
        </View>
      </AppKeyboardAvoidingView>

      <ScreenFooterActions
        primaryLabel="Save Changes"
        // onPrimaryPress={handleGetStarted}
        onPrimaryPress={handleSave}
        isLoading={isLoading}
        secondaryLabel="Cancel"
        onSecondaryPress={() => navigation.goBack()}
        containerStyle={[styles.footer, { paddingBottom: Math.max(insets.bottom, sizes.screenHeight * 0.01) }]}
        primaryButtonStyle={styles.primaryBtn}
        secondaryButtonStyle={styles.secondaryBtn}
      />
    </Wrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.012,
    paddingBottom: sizes.screenHeight * 0.016,
    gap: sizes.screenHeight * 0.014,
  },
  footer: {
    backgroundColor: colors.AppBG,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.012,
    borderTopWidth: 1,
    borderTopColor: '#E6E8EF',
    gap: sizes.screenHeight * 0.012,
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
    marginBottom: sizes.screenHeight * 0.012,
  },
  uploadPhotoBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.03,
    backgroundColor: '#F8FAFC',
    padding: sizes.screenWidth * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoIconWrap: {
    width: sizes.screenWidth * 0.12,
    height: sizes.screenWidth * 0.12,
    borderRadius: sizes.screenWidth * 0.06,
    backgroundColor: '#EAF0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoTextWrap: {
    flex: 1,
    marginHorizontal: sizes.screenWidth * 0.03,
    gap: 2,
  },
  label: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
    marginBottom: sizes.screenHeight * 0.006,
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
    marginBottom: sizes.screenHeight * 0.01,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
    paddingVertical: 0,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.025,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.012,
    minHeight: sizes.screenHeight * 0.11,
    backgroundColor: '#F8FAFC',
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
  },
  counterText: {
    marginTop: sizes.screenHeight * 0.006,
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.placeholderText,
  },
  primaryBtn: {
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtn: {
    backgroundColor: colors.priorityGrayBG,
    // borderColor: colors.borderLight,
    // borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
