import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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

const CHECKLIST_ITEMS = [
  { id: '1', title: 'Exterior Inspection', done: 12, total: 12, completed: true },
  { id: '2', title: 'Interior Inspection', done: 15, total: 15, completed: true },
  { id: '3', title: 'Cosmetic Damages', done: 5, total: 8, completed: false },
  { id: '4', title: 'Required Damages', done: 2, total: 6, completed: false },
  { id: '5', title: 'Final Documentation', done: 0, total: 3, completed: false },
];

const overallPercent = 57;

const InspectionChecklist = () => {
  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Inspection Checklist"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.headerExtraContainer}>
            <View style={styles.propertyCard}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.blueNormal}
              >
                Property
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.textDark}
                style={styles.propertyValue}
              >
                1234 Oak Street, San Francisco, CA 94102
              </AppText>
            </View>

            <View style={styles.overallRow}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.textDark}
              >
                Overall Progress
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={'#4263EB'}
              >
                {overallPercent}%
              </AppText>
            </View>

            <View style={styles.headerProgressTrack}>
              <View
                style={[
                  styles.headerProgressFill,
                  { width: `${overallPercent}%` },
                ]}
              />
            </View>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={styles.overallHint}
            >
              34 of 60 items completed
            </AppText>
          </View>
        }
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {CHECKLIST_ITEMS.map(item => {
          const percent = Math.round((item.done / item.total) * 100);
          const isComplete = item.completed;

          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemTopRow}>
                <View style={styles.itemLeft}>
                  <View
                    style={[
                      styles.itemStatusCircle,
                      isComplete && styles.itemStatusCircleDone,
                    ]}
                  >
                    {isComplete && (
                      <Icon name="check" size={13} color={colors.white} />
                    )}
                  </View>
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Regular}
                    color={colors.textDark}
                  >
                    {item.title}
                  </AppText>
                </View>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  {item.done}/{item.total}
                </AppText>
              </View>

              <View style={styles.itemProgressTrack}>
                <View
                  style={[
                    styles.itemProgressFill,
                    { width: `${percent}%` },
                    isComplete
                      ? styles.itemProgressFillDone
                      : styles.itemProgressFillInProgress,
                  ]}
                />
              </View>
            </View>
          );
        })}
      </AppScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
          >
            Save & Resume Later
          </AppText>
        </TouchableOpacity>

        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={styles.footerHint}
        >
          Your progress is automatically saved
        </AppText>
      </View>
    </Wrapper>
  );
};

export default InspectionChecklist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  headerExtraContainer: {
    marginTop: sizes.screenHeight * 0.012,
  },
  propertyCard: {
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.012,
  },
  propertyValue: {
    marginTop: sizes.screenHeight * 0.004,
  },
  overallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.014,
    marginBottom: sizes.screenHeight * 0.008,
  },
  headerProgressTrack: {
    height: sizes.screenHeight * 0.012,
    borderRadius: sizes.screenHeight * 0.006,
    backgroundColor: '#D7DBE4',
    overflow: 'hidden',
  },
  headerProgressFill: {
    height: '100%',
    borderRadius: sizes.screenHeight * 0.006,
    backgroundColor: '#4263EB',
  },
  overallHint: {
    marginTop: sizes.screenHeight * 0.008,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.018,
    paddingBottom: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.012,
  },
  itemCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.035,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.016,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.012,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.025,
    flex: 1,
  },
  itemStatusCircle: {
    width: sizes.screenWidth * 0.05,
    height: sizes.screenWidth * 0.05,
    borderRadius: sizes.screenWidth * 0.025,
    borderWidth: 1.5,
    borderColor: '#C4C9D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStatusCircleDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  itemProgressTrack: {
    height: sizes.screenHeight * 0.008,
    borderRadius: sizes.screenHeight * 0.004,
    backgroundColor: '#D9DDE5',
    overflow: 'hidden',
    marginLeft: sizes.screenWidth * 0.075,
  },
  itemProgressFill: {
    height: '100%',
    borderRadius: sizes.screenHeight * 0.004,
  },
  itemProgressFillDone: {
    backgroundColor: '#22C55E',
  },
  itemProgressFillInProgress: {
    backgroundColor: '#4263EB',
  },
  footer: {
    backgroundColor: colors.AppBG,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.01,
    paddingBottom: sizes.screenHeight * 0.02,
    borderTopWidth: 1,
    borderTopColor: '#E6E8EF',
  },
  saveBtn: {
    backgroundColor: colors.blueNormal,
    minHeight: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerHint: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },
});
