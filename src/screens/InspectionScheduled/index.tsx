import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Wrapper, AppText } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

const InspectionScheduled = ({ navigation, route }: any) => {
  const { date, time } = route.params || { date: '2026-01-23', time: '11:00' };

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={false}
      statusBarHidden={false}
      barStyle="dark-content"
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.content}>
        {/* ── Check Icon ── */}
        <View style={styles.iconCircle}>
          <Icon
            name="check-circle"
            size={sizes.screenWidth * 0.18}
            color={colors.blueNormal}
          />
        </View>

        {/* ── Title ── */}
        <AppText
          fontSize={fontSize.h5}
          fontFamily={fontFamily.Black}
          color={colors.textDark}
          style={styles.title}
        >
          Inspection Scheduled!
        </AppText>

        {/* ── Subtitle ── */}
        <AppText
          fontSize={fontSize.smallM}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={styles.subtitle}
        >
          Your inspection has been scheduled for
        </AppText>

        {/* ── Date & Time ── */}
        <AppText
          fontSize={fontSize.medium}
          fontFamily={fontFamily.Black}
          color={colors.blueNormal}
          style={styles.dateTime}
        >
          {date} at {time}
        </AppText>

        {/* ── Notice ── */}
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={styles.notice}
        >
          A notification has been sent to the Super Admin
        </AppText>
      </View>

      {/* ── Back to Assignment Button ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BottomTab', { screen: 'Tasks' })}
        >
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
          >
            Back to Assignment
          </AppText>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default InspectionScheduled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.screenWidth * 0.08,
  },
  iconCircle: {
    marginBottom: sizes.screenHeight * 0.035,
    backgroundColor: '#F0F4FF',
    borderRadius: sizes.screenWidth * 0.2,
    padding: sizes.screenWidth * 0.06,
  },
  title: {
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.015,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.008,
  },
  dateTime: {
    textAlign: 'center',
    marginBottom: sizes.screenHeight * 0.015,
  },
  notice: {
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingBottom: sizes.screenHeight * 0.035,
  },
  backBtn: {
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.019,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
