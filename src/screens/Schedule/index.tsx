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
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useGetOrdersQuery } from '../../redux/api/apiSlice';
import { useNavigation } from '@react-navigation/native';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
};

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Month View');
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const navigation = useNavigation<any>();

  const { data, isLoading } = useGetOrdersQuery({
    status: 'scheduled',
    thisWeek: true,
    getMonthSchedule: true,
    limit: 100,
  });

  const allOrders = data?.orders ?? [];
  const thisWeekOrders = data?.thisWeekOrders ?? [];
  const scheduledDates = data?.scheduledDates ?? [];
  const thisWeekRange = data?.thisWeekRange ?? '';

  // Parse "09-May-2026" → "2026-05-09" for calendar marking
  const parsedScheduledDates = scheduledDates.map(d =>
    moment(d, 'DD-MMM-YYYY').format('YYYY-MM-DD'),
  );

  // Orders for selected date (month view)
  const selectedDateOrders = allOrders.filter(order => {
    const scheduledAt = order.timeline?.scheduledAt;
    return scheduledAt && moment(scheduledAt).format('YYYY-MM-DD') === selected;
  });

  // Build markedDates for calendar
  const markedDates: any = {};
  parsedScheduledDates.forEach(dateStr => {
    markedDates[dateStr] = {
      customStyles: {
        container: {
          backgroundColor: '#F6F7FB',
          borderWidth: 1,
          borderColor: '#DDE2EB',
          borderRadius: 6,
        },
        text: { color: colors.textDark, fontFamily: fontFamily.Regular },
      },
    };
  });
  // Selected date overrides
  markedDates[selected] = {
    customStyles: {
      container: { backgroundColor: colors.blueNormal, borderRadius: 6 },
      text: { color: colors.white, fontFamily: fontFamily.Bold },
    },
  };

  const getTypeChipStyle = (type: string) => {
    if (type === 'Multi-Family') {
      return { backgroundColor: '#EEF2FF', color: '#4F46E5' };
    }
    return { backgroundColor: '#EAF1FF', color: '#2F5EBB' };
  };

  return (
    <Wrapper
      style={styles.container}
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
                color={activeTab === 'Month View' ? colors.blueNormal : colors.textLighter}
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
                color={activeTab === 'List View' ? colors.blueNormal : colors.textLighter}
              >
                List View
              </AppText>
            </TouchableOpacity>
          </View>
        }
      />

      {activeTab === 'Month View' ? (
        <AppScrollView contentContainerStyle={styles.monthViewContent}>
          {/* ── Calendar ── */}
          <ShadowCard style={styles.calendarCardShadow}>
            <View style={styles.calendarContainer}>
              <Calendar
                current={selected}
                markingType="custom"
                markedDates={markedDates}
                onDayPress={day => setSelected(day.dateString)}
                renderArrow={direction => (
                  <Icon
                    name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
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

          {/* ── Selected Date Schedule ── */}
          <ShadowCard style={styles.sectionCardShadow}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                  <Icon name="calendar" size={14} color={colors.blueNormal} />
                  <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color="#101928">
                    {moment(selected).isSame(moment(), 'day') ? "Today's Schedule" : moment(selected).format('MMM D, YYYY')}
                  </AppText>
                </View>
                <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={'#6A7283'}>
                  {moment(selected).format('MMM D, YYYY')}
                </AppText>
              </View>

              {isLoading ? (
                <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
                  Loading...
                </AppText>
              ) : selectedDateOrders.length === 0 ? (
                <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
                  No inspections scheduled for this date.
                </AppText>
              ) : (
                selectedDateOrders.map(item => (
                  <TouchableOpacity
                    key={item._id}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('AssignmentDetails', { orderId: item._id })}
                  >
                    <View style={styles.todayCard}>
                      <View style={styles.timeBadge}>
                        <AppText fontSize={12} fontFamily={fontFamily.Regular} color={colors.white}>
                          {moment(selected).isSame(moment(), 'day') ? 'Today' : moment(selected).format('MMM D')}
                        </AppText>
                        <AppText fontSize={12} fontFamily={fontFamily.Bold} color={colors.white}>
                          {item.timeline?.scheduledAt ? moment(item.timeline.scheduledAt).format('h:mm A') : 'TBD'}
                        </AppText>
                      </View>
                      <View style={styles.todayContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                          <Ionicons name="location-outline" size={16} color={colors.textDark} />
                          <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color="#101928">
                            {item.property?.address ?? '—'}
                          </AppText>
                        </View>
                        <View style={styles.metaRow}>
                          <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
                            {item.property?.type ?? '—'}
                          </AppText>
                          <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
                            {'•  '}{item.lender?.companyName ?? '—'}
                          </AppText>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ShadowCard>

          {/* ── This Week ── */}
          {thisWeekOrders.length > 0 && (
            <ShadowCard style={styles.sectionCardShadow}>
              <View style={styles.sectionCard}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Bold}
                  color={colors.textDark}
                  style={styles.upcomingTitle}
                >
                  {thisWeekRange ? `This Week (${thisWeekRange})` : 'Upcoming This Week'}
                </AppText>

                {thisWeekOrders.map(item => {
                  const scheduledAt = item.timeline?.scheduledAt;
                  const month = scheduledAt ? moment(scheduledAt).format('MMM') : '—';
                  const day = scheduledAt ? moment(scheduledAt).format('D') : '—';
                  return (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('AssignmentDetails', { orderId: item._id })}
                    >
                      <View style={styles.upcomingRow}>
                        <View style={styles.dateBadge}>
                          <AppText fontSize={10} fontFamily={fontFamily.Regular} color={'#364153'}>{month}</AppText>
                          <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color="#364153">{day}</AppText>
                        </View>
                        <View style={styles.upcomingContent}>
                          <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color="#101928">
                            {item.property?.address ?? '—'}
                          </AppText>
                          <View style={styles.timeRow}>
                            <Icon name="clock" size={12} color={colors.textLighter} />
                            <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
                              {scheduledAt ? moment(scheduledAt).format('h:mm A') : 'TBD'}
                            </AppText>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ShadowCard>
          )}
        </AppScrollView>
      ) : (
        /* ── List View ── */
        <AppScrollView contentContainerStyle={styles.listViewContent}>
          {isLoading ? (
            <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.textLighter}>
              Loading...
            </AppText>
          ) : allOrders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconWrapper}>
                <Icon name="calendar" size={36} color={colors.blueNormal} />
              </View>
              <AppText
                fontSize={fontSize.h6}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.emptyTitle}
              >
                No Inspections Scheduled
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={'#8D95A6'}
                style={styles.emptySubtitle}
              >
                You have no scheduled inspections at the moment. Check back later or switch to Month View to explore upcoming dates.
              </AppText>
            </View>
          ) : (
            allOrders.map(item => {
              const scheduledAt = item.timeline?.scheduledAt;
              const isToday = scheduledAt ? moment(scheduledAt).isSame(moment(), 'day') : false;
              const isPast = scheduledAt ? moment(scheduledAt).isBefore(moment(), 'day') : false;
              return (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('AssignmentDetails', { orderId: item._id })}
                >
                  <ShadowCard style={styles.listCardShadow}>
                    <View style={styles.listCard}>
                      <View style={[styles.listDateBadge, (isToday || isPast) && styles.listDateBadgeActive]}>
                        <AppText fontSize={10} fontFamily={fontFamily.Regular} color={(isToday || isPast) ? colors.white : '#8D95A6'}>
                          {scheduledAt ? moment(scheduledAt).format('MMM') : '—'}
                        </AppText>
                        <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color={(isToday || isPast) ? colors.white : colors.textDark}>
                          {scheduledAt ? moment(scheduledAt).format('D') : '—'}
                        </AppText>
                      </View>

                      <View style={styles.listContent}>
                        <View style={styles.listTopRow}>
                          <View style={styles.addressRow}>
                            <Icon name="map-pin" size={12} color={colors.blueNormal} />
                            <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color={colors.textDark}>
                              {item.property?.address ?? '—'}
                            </AppText>
                          </View>
                          <Icon name="check-circle" size={14} color={'#C3C8D4'} />
                        </View>

                        <View style={styles.timeRow}>
                          <Icon name="clock" size={12} color={'#4A5565'} />
                          <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={'#4A5565'}>
                            {scheduledAt ? moment(scheduledAt).format('h:mm A') : 'TBD'}
                          </AppText>
                        </View>

                        <View style={styles.metaRow}>
                          <View style={[styles.typeChip, { backgroundColor: getTypeChipStyle(item.property?.type ?? '').backgroundColor }]}>
                            <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={getTypeChipStyle(item.property?.type ?? '').color}>
                              {item.property?.type ?? '—'}
                            </AppText>
                          </View>
                          <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={'#8D95A6'}>
                            {item.lender?.companyName ?? '—'}
                          </AppText>
                        </View>
                      </View>
                    </View>
                  </ShadowCard>
                </TouchableOpacity>
              );
            })
          )}
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
    backgroundColor: '#E8ECF4',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.1,
    paddingHorizontal: sizes.screenWidth * 0.06,
    gap: sizes.screenHeight * 0.014,
  },
  emptyIconWrapper: {
    width: sizes.screenWidth * 0.22,
    height: sizes.screenWidth * 0.22,
    borderRadius: sizes.screenWidth * 0.11,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizes.screenHeight * 0.006,
  },
  emptyTitle: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.004,
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 20,
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
