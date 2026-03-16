import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Wrapper, AppHeader, AppText, AppScrollView } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';
import type { ViewStyle } from 'react-native';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
};

const EditProfile = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('John Anderson');
  const [profession, setProfession] = useState('Senior Real Estate Appraiser');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('john.anderson@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [location, setLocation] = useState('San Francisco, CA');

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Edit Profile"
        showBackground
        containerStyle={headerContainerStyle}
        rightActionText="Save"
        rightActionIcon="save"
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Profile Photo
          </AppText>
          <TouchableOpacity style={styles.uploadPhotoBox} activeOpacity={0.8}>
            <View style={styles.photoIconWrap}>
              <Icon name="user" size={24} color={colors.blueNormal} />
            </View>
            <View style={styles.photoTextWrap}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                Upload new photo
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

          <AppText style={styles.label}>Full Name *</AppText>
          <View style={styles.inputWrap}>
            <Icon name="user" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
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

          <AppText style={styles.label}>Email Address *</AppText>
          <View style={styles.inputWrap}>
            <Icon name="mail" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.placeholderText}
            />
          </View>

          <AppText style={styles.label}>Phone Number *</AppText>
          <View style={styles.inputWrap}>
            <Icon name="phone" size={14} color={colors.placeholderText} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
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
              placeholderTextColor={colors.placeholderText}
            />
          </View>
        </View>
      </AppScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => console.log('Save changes')}>
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
          >
            Save Changes
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
          >
            Cancel
          </AppText>
        </TouchableOpacity>
      </View>
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
    paddingBottom: sizes.screenHeight * 0.025,
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
