import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Wrapper, AppHeader, AppText, AppScrollView } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const SCHEDULE_ITEMS = [
  {
    id: 1,
    date: 'Jan 21',
    time: '10:00 AM',
    address: '1234 Oak Street, San Francisco',
    type: 'Residential',
    status: 'Scheduled',
  },
  {
    id: 2,
    date: 'Jan 21',
    time: '2:00 PM',
    address: '5678 Pine Avenue, Los Angeles',
    type: 'Commercial',
    status: 'Scheduled',
  },
  {
    id: 3,
    date: 'Jan 23',
    time: '11:00 AM',
    address: '1812 Maple Drive, San Diego',
    type: 'Residential',
    status: 'Unscheduled',
  },
  {
    id: 4,
    date: 'Jan 25',
    time: '3:40 PM',
    address: '3456 Elm Street, Sacramento',
    type: 'Multi-Family',
    status: 'Scheduled',
  },
  {
    id: 5,
    date: 'Jan 28',
    time: '9:00 AM',
    address: '7890 Birch Road, Oakland',
    type: 'Commercial',
    status: 'Scheduled',
  },
];

const TODAY_SCHEDULE = [
  {
    id: 1,
    time: '10:00 AM',
    address: '1234 Oak Street, San Francisco',
    type: 'Residential',
    statusColor: '#4263EB',
  },
  {
    id: 2,
    time: '3:00 PM',
    address: '5678 Pine Avenue, Los Angeles',
    type: 'Commercial',
    statusColor: '#22C55E',
  },
];

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Month View');
  const [_selected, setSelected] = useState('2026-01-21');

  const markedDates: any = {
    '2026-01-21': { selected: true, marked: true, selectedColor: colors.blueNormal },
    '2026-01-23': { marked: true, dotColor: colors.blueNormal },
    '2026-01-25': { marked: true, dotColor: colors.blueNormal },
    '2026-01-28': { marked: true, dotColor: colors.blueNormal },
  };

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Schedule"
        showBackground
        hideBackButton
        description="Manage your assignments"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.tabsWrapper}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Month View' && styles.activeTab]}
              onPress={() => setActiveTab('Month View')}
              activeOpacity={0.7}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={activeTab === 'Month View' ? colors.white : colors.textDark}
              >
                Month View
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'List View' && styles.activeTab]}
              onPress={() => setActiveTab('List View')}
              activeOpacity={0.7}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={activeTab === 'List View' ? colors.white : colors.textDark}
              >
                List View
              </AppText>
            </TouchableOpacity>
          </View>
        }
      />

      {activeTab === 'Month View' ? (
        <AppScrollView contentContainerStyle={styles.monthViewContent}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={'2026-01-21'}
              markedDates={markedDates}
              onDayPress={(day) => setSelected(day.dateString)}
              theme={{
                backgroundColor: colors.white,
                calendarBackground: colors.white,
                textSectionTitleColor: colors.textLighter,
                selectedDayBackgroundColor: colors.blueNormal,
                selectedDayTextColor: colors.white,
                todayTextColor: colors.blueNormal,
                todayBackgroundColor: colors.white,
                dayTextColor: colors.textDark,
                textDisabledColor: colors.placeholderText,
                dotColor: colors.blueNormal,
                selectedDotColor: colors.white,
                arrowColor: colors.blueNormal,
                monthTextColor: colors.textDark,
                indicatorColor: colors.blueNormal,
                textDayFontFamily: fontFamily.Regular,
                textMonthFontFamily: fontFamily.Bold,
                textDayHeaderFontFamily: fontFamily.Regular,
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
            />
          </View>

          <View style={styles.scheduleSection}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Today's Schedule
            </AppText>

            {TODAY_SCHEDULE.map((item) => (
              <View key={item.id} style={styles.scheduleCard}>
                <View style={styles.scheduleTime}>
                  <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={colors.textDark}
                  >
                    {item.time}
                  </AppText>
                </View>

                <View style={styles.scheduleDetails}>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                  >
                    {item.address}
                  </AppText>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.placeholderText}
                    style={styles.typeLabel}
                  >
                    {item.type}
                  </AppText>
                </View>

                <Icon name="chevron-right" size={18} color={colors.placeholderText} />
              </View>
            ))}
          </View>

          <View style={styles.scheduleSection}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Upcoming This Week
            </AppText>

            {SCHEDULE_ITEMS.map((item) => (
              <View key={item.id} style={styles.scheduleCard}>
                <View style={styles.scheduleHeader}>
                  <View style={styles.dateAndTime}>
                    <AppText
                      fontSize={fontSize.smallM}
                      fontFamily={fontFamily.Bold}
                      color={colors.blueNormal}
                    >
                      {item.date}
                    </AppText>
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={colors.textDark}
                    >
                      {item.time}
                    </AppText>
                  </View>
                  <View style={[styles.statusBadge, item.status === 'Scheduled' ? styles.scheduledBadge : styles.unscheduledBadge]}>
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Bold}
                      color={item.status === 'Scheduled' ? '#22C55E' : colors.orange}
                    >
                      {item.status}
                    </AppText>
                  </View>
                </View>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                  style={styles.addressText}
                >
                  {item.address}
                </AppText>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.placeholderText}
                >
                  {item.type}
                </AppText>
              </View>
            ))}
          </View>
        </AppScrollView>
      ) : (
        <AppScrollView contentContainerStyle={styles.listViewContent}>
          {SCHEDULE_ITEMS.map((item) => (
            <View key={item.id} style={styles.listCard}>
              <View style={styles.listHeader}>
                <View>
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={colors.textDark}
                  >
                    {item.date} • {item.time}
                  </AppText>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                    style={styles.listAddress}
                  >
                    {item.address}
                  </AppText>
                </View>
                <View style={[styles.statusBadge, item.status === 'Scheduled' ? styles.scheduledBadge : styles.unscheduledBadge]}>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Bold}
                    color={item.status === 'Scheduled' ? '#22C55E' : colors.orange}
                  >
                    {item.status}
                  </AppText>
                </View>
              </View>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.placeholderText}
              >
                {item.type}
              </AppText>
            </View>
          ))}
        </AppScrollView>
      )}
    </Wrapper>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  tabsWrapper: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    paddingVertical: sizes.screenHeight * 0.008,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderRadius: sizes.screenWidth * 0.08,
    backgroundColor: '#f2f3f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.blueNormal,
  },
  monthViewContent: {
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.016,
  },
  listViewContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.012,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    paddingHorizontal: sizes.screenWidth * 0.02,
    overflow: 'hidden',
    marginHorizontal: sizes.screenWidth * 0.02,
    marginBottom: sizes.screenHeight * 0.008,
  },
  scheduleSection: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    gap: sizes.screenHeight * 0.012,
  },
  sectionTitle: {
    marginBottom: sizes.screenHeight * 0.006,
  },
  scheduleCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.012,
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.008,
  },
  dateAndTime: {
    gap: sizes.screenHeight * 0.004,
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scheduleDetails: {
    flex: 1,
    gap: sizes.screenHeight * 0.004,
  },
  statusBadge: {
    paddingVertical: sizes.screenHeight * 0.006,
    paddingHorizontal: sizes.screenWidth * 0.03,
    borderRadius: sizes.screenWidth * 0.02,
  },
  scheduledBadge: {
    backgroundColor: '#DCFCE7',
  },
  unscheduledBadge: {
    backgroundColor: '#FEF3C7',
  },
  addressText: {
    marginBottom: sizes.screenHeight * 0.004,
  },
  typeLabel: {
    marginTop: sizes.screenHeight * 0.004,
  },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.008,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: sizes.screenWidth * 0.02,
  },
  listAddress: {
    marginTop: sizes.screenHeight * 0.004,
  },
});
