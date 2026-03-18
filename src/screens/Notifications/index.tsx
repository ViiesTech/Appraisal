import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ScreenFooterActions,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
};

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'assignment',
    icon: 'file-text',
    title: 'New Assignment',
    description: 'You have been assigned a new property at 1234 Oak Street',
    time: '3 minutes ago',
    unread: true,
  },
  {
    id: 2,
    type: 'reminder',
    icon: 'calendar',
    title: 'Inspection Reminder',
    description: 'Inspection scheduled for 5678 Pine Avenue today at 2:00 PM',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'warning',
    icon: 'alert-triangle',
    title: 'Deadline Warning',
    description: 'Report for 9012 Maple Drive is due in 2 days',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 4,
    type: 'update',
    icon: 'file-text',
    title: 'Template Updated',
    description: 'Residential Property Appraisal template has been updated',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 5,
    type: 'success',
    icon: 'check-circle',
    title: 'Report Submitted',
    description:
      'Your report for 3456 Elm Street has been successfully submitted',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 6,
    type: 'pending',
    icon: 'clock',
    title: 'Pending Task',
    description: 'You have 3 pending checklist items for 7890 Birch Road',
    time: '3 days ago',
    unread: false,
  },
];

const NOTIFICATION_TABS = ['All (6)', 'Unread (3)', 'Assignments', 'Reports'];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All (6)');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIconStyles = (unread: boolean) => ({
    container: unread ? styles.unreadIconContainer : styles.readIconContainer,
    color: unread ? colors.white : '#667085',
  });

  const filteredNotifications =
    activeTab === 'Unread (3)'
      ? notifications.filter(n => n.unread)
      : activeTab === 'All (6)'
      ? notifications
      : notifications;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, unread: false })));
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
        title="Notifications"
        hideBackButton
        containerStyle={headerContainerStyle}
        rightActionNode={
          <View style={styles.newBadge}>
            <AppText
              fontSize={12}
              fontFamily={fontFamily.Bold}
              color={colors.white}
            >
              {unreadCount} New
            </AppText>
          </View>
        }
        renderCustomTabs={
          <View style={styles.tabsContainer}>
            {NOTIFICATION_TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={
                    activeTab === tab ? fontFamily.Bold : fontFamily.Regular
                  }
                  color={activeTab === tab ? colors.white : colors.textLighter}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        }
      />

      <AppScrollView contentContainerStyle={styles.notificationsContent}>
        {filteredNotifications.map(notification => {
          const iconStyles = getNotificationIconStyles(notification.unread);

          return (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.unread && styles.unreadNotificationCard,
              ]}
            >
              <View style={[styles.iconContainer, iconStyles.container]}>
                <Icon
                  name={notification.icon}
                  size={16}
                  color={iconStyles.color}
                />
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={colors.textDark}
                  >
                    {notification.title}
                  </AppText>
                  {notification.unread && <View style={styles.unreadDot} />}
                </View>

                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                  numberOfLines={2}
                >
                  {notification.description}
                </AppText>

                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.placeholderText}
                  style={styles.timeText}
                >
                  {notification.time}
                </AppText>
              </View>
            </View>
          );
        })}
      </AppScrollView>

      <ScreenFooterActions
        primaryLabel="Mark All as Read"
        onPrimaryPress={handleMarkAllAsRead}
        primaryVariant="outline"
        containerStyle={styles.footer}
        primaryButtonStyle={styles.markAllBtn}
        primaryTextStyle={styles.markAllBtnText}
      />
    </Wrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  newBadge: {
    backgroundColor: colors.blueNormal,
    borderRadius: 999,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.006,
  },
  tabsContainer: {
    flexDirection: 'row',
    // paddingHorizontal: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.012,
    gap: sizes.screenWidth * 0.02,
  },
  tabButton: {
    paddingVertical: sizes.screenHeight * 0.01,
    paddingHorizontal: sizes.screenWidth * 0.032,
    borderRadius: sizes.screenWidth * 0.02,
    backgroundColor: '#F5F6FA',
  },
  activeTabButton: {
    backgroundColor: colors.blueNormal,
  },
  notificationsContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    paddingBottom: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.01,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: sizes.screenWidth * 0.03,
    padding: sizes.screenWidth * 0.035,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizes.screenWidth * 0.03,
  },
  unreadNotificationCard: {
    backgroundColor: '#F1F3F5',
    borderWidth: 1.5,
    borderColor: '#E8E8EF',
  },
  iconContainer: {
    width: sizes.screenWidth * 0.11,
    height: sizes.screenWidth * 0.11,
    borderRadius: sizes.screenWidth * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.002,
  },
  unreadIconContainer: {
    backgroundColor: colors.blueNormal,
  },
  readIconContainer: {
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  notificationContent: {
    flex: 1,
    gap: sizes.screenHeight * 0.006,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blueNormal,
  },
  timeText: {
    marginTop: sizes.screenHeight * 0.004,
  },
  trailingIcon: {
    marginTop: sizes.screenHeight * 0.008,
  },
  footer: {
    backgroundColor: colors.white,
    paddingTop: sizes.screenHeight * 0.02,
  },
  markAllBtn: {
    backgroundColor: '#fff',
    borderColor: '#CDD3DF',
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.052,
  },
  markAllBtnText: {
    color: '#111928',
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
  },
});
