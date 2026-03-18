import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ScreenFooterActions,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';
import type { ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeAuthToken } from '../../store/authSlice';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const Settings = () => {
  const dispatch = useDispatch();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader title="Settings" containerStyle={headerContainerStyle} />
      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeading}>Account</AppText>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.rowCard} activeOpacity={0.8}>
            <View style={styles.rowLeft}>
              <View style={styles.leadingIconWrap}>
                <Icon name="lock" size={15} color={colors.blueNormal} />
              </View>
              <AppText style={styles.rowTitle}>Change Password</AppText>
            </View>
            <Icon
              name="chevron-right"
              size={18}
              color={colors.placeholderText}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeading}>Notifications</AppText>
          <View style={styles.sectionDivider} />
          <View style={styles.cardContainer}>
            <View style={styles.rowWithSwitch}>
              <View style={styles.rowLeft}>
                <View style={styles.leadingIconWrap}>
                  <Icon name="bell" size={15} color={colors.placeholderText} />
                </View>
                <View>
                  <AppText style={styles.rowTitle}>
                    Enable Notifications
                  </AppText>
                  <AppText style={styles.rowSub}>
                    Receive all notifications
                  </AppText>
                </View>
              </View>
              <Switch
                value={emailNotif}
                onValueChange={setEmailNotif}
                trackColor={{ false: '#D1D5DB', true: colors.blueNormal }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.rowWithSwitch}>
              <View style={styles.rowLeftIndented}>
                <View>
                  <AppText style={styles.rowTitle}>Email Notifications</AppText>
                  <AppText style={styles.rowSub}>
                    Get notified via email
                  </AppText>
                </View>
              </View>
              <Switch
                value={emailNotif}
                onValueChange={setEmailNotif}
                trackColor={{ false: '#D1D5DB', true: colors.blueNormal }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.rowWithSwitchNoBorder}>
              <View style={styles.rowLeftIndented}>
                <View>
                  <AppText style={styles.rowTitle}>Push Notifications</AppText>
                  <AppText style={styles.rowSub}>
                    Get push alerts on your device
                  </AppText>
                </View>
              </View>
              <Switch
                value={pushNotif}
                onValueChange={setPushNotif}
                trackColor={{ false: '#D1D5DB', true: colors.blueNormal }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <AppText style={styles.sectionHeading}>Preferences</AppText>
          <View style={styles.sectionDivider} />
          <View style={styles.rowCardDisabled}>
            <View style={styles.rowLeft}>
              <View style={styles.leadingIconWrap}>
                <Icon name="moon" size={15} color={colors.placeholderText} />
              </View>
              <View>
                <AppText style={styles.rowTitle}>Dark Mode</AppText>
                <AppText style={styles.rowSub}>Coming soon</AppText>
              </View>
            </View>
            <Switch
              value={false}
              disabled
              trackColor={{ false: '#E5E7EB', true: '#E5E7EB' }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      </AppScrollView>

      <ScreenFooterActions
        primaryLabel="Logout"
        primaryVariant="outline"
        onPrimaryPress={() => dispatch(removeAuthToken())}
        containerStyle={styles.footer}
        primaryButtonStyle={styles.logoutBtn}
        primaryTextStyle={styles.logoutText}
      />
    </Wrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.015,
    paddingBottom: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.018,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingTop: sizes.screenHeight * 0.012,
    paddingBottom: sizes.screenHeight * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
    marginBottom: sizes.screenHeight * 0.008,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#EEF0F4',
    marginHorizontal: -sizes.screenWidth * 0.03,
    marginBottom: sizes.screenHeight * 0.008,
  },
  cardContainer: {
    paddingHorizontal: sizes.screenWidth * 0.01,
  },
  rowCard: {
    backgroundColor: 'transparent',
    minHeight: sizes.screenHeight * 0.068,
    paddingHorizontal: sizes.screenWidth * 0.006,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCardDisabled: {
    backgroundColor: 'transparent',
    minHeight: sizes.screenHeight * 0.068,
    paddingHorizontal: sizes.screenWidth * 0.006,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowWithSwitch: {
    minHeight: sizes.screenHeight * 0.068,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F4',
  },
  rowWithSwitchNoBorder: {
    minHeight: sizes.screenHeight * 0.068,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
    flex: 1,
  },
  leadingIconWrap: {
    width: sizes.screenWidth * 0.08,
    height: sizes.screenWidth * 0.08,
    borderRadius: sizes.screenWidth * 0.024,
    backgroundColor: '#F3F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLeftIndented: {
    paddingLeft: sizes.screenWidth * 0.09,
    flex: 1,
  },
  rowTitle: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Medium,
    color: colors.textDark,
  },
  rowSub: {
    marginTop: 2,
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
  },
  footer: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.02,
    paddingBottom: sizes.screenHeight * 0.05,
  },
  logoutBtn: {
    minHeight: sizes.screenHeight * 0.058,
    borderRadius: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#F3B3B6',
    backgroundColor: '#FFF5F5',
    marginTop: sizes.screenHeight * 0.015,
  },
  logoutText: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.error,
  },
});
