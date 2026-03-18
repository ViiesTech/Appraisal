/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ShadowCard,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
};

const SCHEDULE_ITEMS = [
  {
    id: 1,
    date: 'Jan 21',
    time: '10:00 AM',
    address: '1234 Oak Street, San Francisco',
    type: 'Residential',
    company: 'ABC Real Estate',
  },
  {
    id: 2,
    date: 'Jan 21',
    time: '2:00 PM',
    address: '5678 Pine Avenue, Los Angeles',
    type: 'Commercial',
    company: 'XYZ Corp',
  },
  {
    id: 3,
    date: 'Jan 23',
    time: '11:00 AM',
    address: '9012 Maple Drive, San Diego',
    type: 'Residential',
    company: 'First Bank',
  },
  {
    id: 4,
    date: 'Jan 25',
    time: '3:00 PM',
    address: '3456 Elm Street, Sacramento',
    type: 'Multi-Family',
    company: 'Global Appraisals',
  },
  {
    id: 5,
    date: 'Jan 28',
    time: '9:00 AM',
    address: '7890 Birch Road, Oakland',
    type: 'Commercial',
    company: 'Metro Bank',
  },
];

const TODAY_SCHEDULE = [
  {
    id: 1,
    dayLabel: 'Today',
    time: '10:00 AM',
    address: '1234 Oak Street, San Francisco',
    type: 'Residential',
    company: '•  ABC Real Estate',
  },
  {
    id: 2,
    dayLabel: 'Today',
    time: '2:00 PM',
    address: '5678 Pine Avenue, Los Angeles',
    type: 'Commercial',
    company: '•  XYZ Corp',
  },
];

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Month View');
  const [selected, setSelected] = useState('2026-01-21');

  const getTypeChipStyle = (type: string) => {
    if (type === 'Multi-Family') {
      return {
        backgroundColor: '#EEF2FF',
        color: '#4F46E5',
      };
    }

    return {
      backgroundColor: '#EAF1FF',
      color: '#2F5EBB',
    };
  };

  const markedDates: any = {
    '2026-01-23': {
      customStyles: {
        container: {
          backgroundColor: '#F6F7FB',
          borderWidth: 1,
          borderColor: '#DDE2EB',
          borderRadius: 6,
        },
        text: {
          color: colors.textDark,
          fontFamily: fontFamily.Regular,
        },
      },
    },
    '2026-01-25': {
      customStyles: {
        container: {
          backgroundColor: '#F6F7FB',
          borderWidth: 1,
          borderColor: '#DDE2EB',
          borderRadius: 6,
        },
        text: {
          color: colors.textDark,
          fontFamily: fontFamily.Regular,
        },
      },
    },
    '2026-01-28': {
      customStyles: {
        container: {
          backgroundColor: '#F6F7FB',
          borderWidth: 1,
          borderColor: '#DDE2EB',
          borderRadius: 6,
        },
        text: {
          color: colors.textDark,
          fontFamily: fontFamily.Regular,
        },
      },
    },
    [selected]: {
      customStyles: {
        container: {
          backgroundColor: colors.blueNormal,
          borderRadius: 6,
        },
        text: {
          color: colors.white,
          fontFamily: fontFamily.Bold,
        },
      },
    },
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
              style={[
                styles.tab,
                activeTab === 'Month View' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Month View')}
              activeOpacity={0.7}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={
                  activeTab === 'Month View'
                    ? colors.blueNormal
                    : colors.textLighter
                }
              >
                Month View
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'List View' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('List View')}
              activeOpacity={0.7}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={activeTab === 'List View' ? colors.textDark : '#7E8696'}
              >
                List View
              </AppText>
            </TouchableOpacity>
          </View>
        }
      />

      {activeTab === 'Month View' ? (
        <AppScrollView contentContainerStyle={styles.monthViewContent}>
          <ShadowCard style={styles.calendarCardShadow}>
            <View style={styles.calendarContainer}>
              <Calendar
                current={'2026-01-21'}
                markingType="custom"
                markedDates={markedDates}
                onDayPress={day => setSelected(day.dateString)}
                renderArrow={direction => (
                  <Icon
                    name={
                      direction === 'left' ? 'chevron-left' : 'chevron-right'
                    }
                    size={16}
                    color={colors.textDark}
                  />
                )}
                theme={{
                  backgroundColor: colors.white,
                  calendarBackground: colors.white,
                  textSectionTitleColor: '#A1A8B6',
                  selectedDayBackgroundColor: colors.blueNormal,
                  selectedDayTextColor: colors.white,
                  todayTextColor: colors.blueNormal,
                  todayBackgroundColor: colors.white,
                  dayTextColor: colors.textDark,
                  textDisabledColor: '#D1D5DE',
                  dotColor: colors.blueNormal,
                  selectedDotColor: colors.white,
                  arrowColor: colors.textDark,
                  monthTextColor: colors.textDark,
                  indicatorColor: colors.blueNormal,
                  textDayFontFamily: fontFamily.Regular,
                  textMonthFontFamily: fontFamily.Bold,
                  textDayHeaderFontFamily: fontFamily.Regular,
                  textDayFontSize: 13,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 11,
                }}
              />
            </View>
          </ShadowCard>

          <ShadowCard style={styles.sectionCardShadow}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                  <Icon name="calendar" size={14} color={colors.blueNormal} />
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color="#101928"
                  >
                    Today's Schedule
                  </AppText>
                </View>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={'#6A7283'}
                >
                  Jan 21, 2026
                </AppText>
              </View>

              {TODAY_SCHEDULE.map(item => (
                <View key={item.id} style={styles.todayCardShadow}>
                  <View style={styles.todayCard}>
                    <View style={styles.timeBadge}>
                      <AppText
                        fontSize={12}
                        fontFamily={fontFamily.Regular}
                        color={colors.white}
                      >
                        {item.dayLabel}
                      </AppText>
                      <AppText
                        fontSize={12}
                        fontFamily={fontFamily.Bold}
                        color={colors.white}
                      >
                        {item.time}
                      </AppText>
                    </View>

                    <View style={styles.todayContent}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color={colors.textDark}
                        />
                        <AppText
                          fontSize={fontSize.smallM}
                          fontFamily={fontFamily.Bold}
                          color="#101928"
                        >
                          {item.address}
                        </AppText>
                      </View>
                      <View style={styles.metaRow}>
                        <AppText
                          fontSize={fontSize.small}
                          fontFamily={fontFamily.Regular}
                          color={colors.textLighter}
                        >
                          {item.type}
                        </AppText>
                        <AppText
                          fontSize={fontSize.small}
                          fontFamily={fontFamily.Regular}
                          color={colors.textLighter}
                        >
                          {item.company}
                        </AppText>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ShadowCard>

          <ShadowCard style={styles.sectionCardShadow}>
            <View style={styles.sectionCard}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.upcomingTitle}
              >
                Upcoming This Week
              </AppText>

              {SCHEDULE_ITEMS.slice(2).map(item => {
                const [month, day] = item.date.split(' ');

                return (
                  <View key={item.id} style={styles.upcomingCardShadow}>
                    <View style={styles.upcomingRow}>
                      <View style={styles.dateBadge}>
                        <AppText
                          fontSize={10}
                          fontFamily={fontFamily.Regular}
                          color={'#364153'}
                        >
                          {month}
                        </AppText>
                        <AppText
                          fontSize={fontSize.smallM}
                          fontFamily={fontFamily.Bold}
                          color="#364153"
                        >
                          {day}
                        </AppText>
                      </View>

                      <View style={styles.upcomingContent}>
                        <AppText
                          fontSize={fontSize.smallM}
                          fontFamily={fontFamily.Bold}
                          color="#101928"
                        >
                          {item.address}
                        </AppText>
                        <View style={styles.timeRow}>
                          <Icon
                            name="clock"
                            size={12}
                            color={colors.textLighter}
                          />
                          <AppText
                            fontSize={fontSize.small}
                            fontFamily={fontFamily.Regular}
                            color={colors.textLighter}
                          >
                            {item.time}
                          </AppText>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ShadowCard>
        </AppScrollView>
      ) : (
        <AppScrollView contentContainerStyle={styles.listViewContent}>
          {SCHEDULE_ITEMS.map(item => (
            <ShadowCard key={item.id} style={styles.listCardShadow}>
              <View style={styles.listCard}>
                <View
                  style={[
                    styles.listDateBadge,
                    item.id <= 2 && styles.listDateBadgeActive,
                  ]}
                >
                  <AppText
                    fontSize={10}
                    fontFamily={fontFamily.Regular}
                    color={item.id <= 2 ? colors.white : '#8D95A6'}
                  >
                    Jan
                  </AppText>
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={item.id <= 2 ? colors.white : colors.textDark}
                  >
                    {item.date.split(' ')[1]}
                  </AppText>
                </View>

                <View style={styles.listContent}>
                  <View style={styles.listTopRow}>
                    <View style={styles.addressRow}>
                      <Icon
                        name="map-pin"
                        size={12}
                        color={colors.blueNormal}
                      />
                      <AppText
                        fontSize={fontSize.smallM}
                        fontFamily={fontFamily.Bold}
                        color={colors.textDark}
                      >
                        {item.address}
                      </AppText>
                    </View>
                    <Icon name="check-circle" size={14} color={'#C3C8D4'} />
                  </View>

                  <View style={styles.timeRow}>
                    <Icon name="clock" size={12} color={'#4A5565'} />
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={'#4A5565'}
                    >
                      {item.time}
                    </AppText>
                  </View>

                  <View style={styles.metaRow}>
                    <View
                      style={[
                        styles.typeChip,
                        {
                          backgroundColor: getTypeChipStyle(item.type)
                            .backgroundColor,
                        },
                      ]}
                    >
                      <AppText
                        fontSize={fontSize.small}
                        fontFamily={fontFamily.Regular}
                        color={getTypeChipStyle(item.type).color}
                      >
                        {item.type}
                      </AppText>
                    </View>
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={'#8D95A6'}
                    >
                      {item.company}
                    </AppText>
                  </View>
                </View>
              </View>
            </ShadowCard>
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
    backgroundColor: '#F3F4F8',
  },
  tabsWrapper: {
    flexDirection: 'row',
    // marginHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.007,
    marginBottom: sizes.screenHeight * 0.012,
    borderRadius: sizes.screenWidth * 0.03,
    padding: 5,
    backgroundColor: colors.white,
    gap: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: sizes.screenHeight * 0.01,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderRadius: sizes.screenWidth * 0.025,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: sizes.screenHeight * 0.013,
  },
  monthViewContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.014,
    paddingBottom: sizes.screenHeight * 0.028,
    gap: sizes.screenHeight * 0.016,
  },
  listViewContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.014,
    paddingBottom: sizes.screenHeight * 0.028,
    gap: sizes.screenHeight * 0.012,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.01,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7EAF0',
    shadowColor: '#091E4224',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarCardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionCardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#E4E8EF',
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.014,
    gap: sizes.screenHeight * 0.012,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.015,
  },
  todayCard: {
    backgroundColor: colors.AppBG,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.025,
    paddingVertical: sizes.screenHeight * 0.017,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizes.screenWidth * 0.03,
    borderWidth: 1.5,
    borderColor: '#e8e8ef',
  },
  todayCardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  timeBadge: {
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.025,
    paddingVertical: sizes.screenHeight * 0.008,
    paddingHorizontal: sizes.screenWidth * 0.018,
    minWidth: sizes.screenWidth * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  todayContent: {
    flex: 1,
    gap: sizes.screenHeight * 0.006,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
  },
  typeChip: {
    paddingHorizontal: sizes.screenWidth * 0.015,
    paddingVertical: sizes.screenHeight * 0.0035,
    borderRadius: sizes.screenWidth * 0.014,
  },
  upcomingTitle: {
    marginBottom: sizes.screenHeight * 0.002,
  },
  upcomingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    backgroundColor: '#F9FAFB',
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.025,
    paddingVertical: sizes.screenHeight * 0.011,
  },
  upcomingCardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dateBadge: {
    width: sizes.screenWidth * 0.11,
    borderRadius: sizes.screenWidth * 0.02,
    backgroundColor: '#E8E8EF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sizes.screenHeight * 0.008,
    borderWidth: 1,
    borderColor: '#E4E8EF',
  },
  upcomingContent: {
    flex: 1,
    gap: sizes.screenHeight * 0.004,
  },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.025,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#E3E7EE',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listCardShadow: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  listDateBadge: {
    width: sizes.screenWidth * 0.11,
    borderRadius: sizes.screenWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sizes.screenHeight * 0.008,
    backgroundColor: '#E8E8EF',
    borderWidth: 1,
    borderColor: '#E4E8EF',
  },
  listDateBadgeActive: {
    backgroundColor: colors.blueNormal,
    borderColor: colors.blueNormal,
  },
  listContent: {
    flex: 1,
    gap: sizes.screenHeight * 0.005,
  },
  listTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: sizes.screenWidth * 0.012,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.012,
  },
});
