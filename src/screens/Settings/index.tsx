import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Wrapper, AppHeader, AppText, AppScrollView } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';
import type { ViewStyle } from 'react-native';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const Settings = () => {
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
        <View style={styles.sectionBlock}>
          <AppText style={styles.sectionHeading}>Account</AppText>
          <TouchableOpacity style={styles.rowCard} activeOpacity={0.8}>
            <View style={styles.rowLeft}>
              <Icon name="lock" size={16} color={colors.blueNormal} />
              <AppText style={styles.rowTitle}>Change Password</AppText>
            </View>
            <Icon name="chevron-right" size={18} color={colors.placeholderText} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionBlock}>
          <AppText style={styles.sectionHeading}>Notifications</AppText>
          <View style={styles.cardContainer}>
            <View style={styles.rowWithSwitch}>
              <View style={styles.rowLeft}>
                <Icon name="bell" size={16} color={colors.blueNormal} />
                <View>
                  <AppText style={styles.rowTitle}>Enable Notifications</AppText>
                  <AppText style={styles.rowSub}>Receive all notifications</AppText>
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
                  <AppText style={styles.rowSub}>Get notified via email</AppText>
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
                  <AppText style={styles.rowSub}>Get push alerts on your device</AppText>
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

        <View style={styles.sectionBlock}>
          <AppText style={styles.sectionHeading}>Preferences</AppText>
          <View style={styles.rowCardDisabled}>
            <View style={styles.rowLeft}>
              <Icon name="moon" size={16} color={colors.placeholderText} />
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

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85}>
          <Icon name="log-out" size={16} color={colors.error} />
          <AppText style={styles.logoutText}>Logout</AppText>
        </TouchableOpacity>
      </View>
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
  sectionBlock: {},
  sectionHeading: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
    marginBottom: sizes.screenHeight * 0.01,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.035,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: sizes.screenWidth * 0.03,
  },
  rowCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.035,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: sizes.screenHeight * 0.068,
    paddingHorizontal: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCardDisabled: {
    backgroundColor: '#F8FAFC',
    borderRadius: sizes.screenWidth * 0.035,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: sizes.screenHeight * 0.068,
    paddingHorizontal: sizes.screenWidth * 0.03,
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
    gap: sizes.screenWidth * 0.025,
    flex: 1,
  },
  rowLeftIndented: {
    paddingLeft: sizes.screenWidth * 0.09,
    flex: 1,
  },
  rowTitle: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Regular,
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
    paddingBottom: sizes.screenHeight * 0.02,
    paddingTop: sizes.screenHeight * 0.008,
  },
  logoutBtn: {
    minHeight: sizes.screenHeight * 0.058,
    borderRadius: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#F3B3B6',
    backgroundColor: '#FFF5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.screenWidth * 0.02,
  },
  logoutText: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.error,
  },
});
