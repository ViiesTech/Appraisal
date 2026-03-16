import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Wrapper, AppHeader, AppText, AppScrollView } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'assignment',
    icon: 'briefcase',
    title: 'New Assignment',
    description: 'New property at 1234 Oak Street, San Francisco',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'reminder',
    icon: 'alert-circle',
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
    description: 'Report for 1812 Maple Drive, San Diego is due in 2 days',
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 4,
    type: 'success',
    icon: 'check-circle',
    title: 'Report Submitted',
    description: 'Your report for 3456 Elm Street has been successfully submitted',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: 5,
    type: 'update',
    icon: 'activity',
    title: 'Template Updated',
    description: 'Residential Property template has been updated with new criteria',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 6,
    type: 'update',
    icon: 'activity',
    title: 'Template Updated',
    description: 'Residential Property template has been updated with new criteria',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 7,
    type: 'success',
    icon: 'check-circle',
    title: 'Report Submitted',
    description: 'Your report for 5480 Elm Street has been successfully submitted',
    time: '3 days ago',
    unread: false,
  },
];

const NOTIFICATION_TABS = ['All (8)', 'Unread (2)', 'Assignments', 'Reports'];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All (8)');

  const getIconColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return colors.blueNormal;
      case 'reminder':
        return colors.blueNormal;
      case 'warning':
        return colors.orange;
      case 'success':
        return '#22C55E';
      case 'update':
        return colors.blueNormal;
      default:
        return colors.textLighter;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'assignment':
        return '#EAF0FF';
      case 'reminder':
        return '#EAF0FF';
      case 'warning':
        return '#FEF3C7';
      case 'success':
        return '#DCFCE7';
      case 'update':
        return '#EAF0FF';
      default:
        return '#F3F4F6';
    }
  };

  const filteredNotifications =
    activeTab === 'Unread (2)'
      ? NOTIFICATIONS.filter((n) => n.unread)
      : activeTab === 'All (8)'
      ? NOTIFICATIONS
      : NOTIFICATIONS;

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
      />

      <View style={styles.tabsScrollContainer}>
        <View style={styles.tabsContainer}>
          {NOTIFICATION_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <AppText
                fontSize={fontSize.small}
                fontFamily={activeTab === tab ? fontFamily.Bold : fontFamily.Regular}
                color={activeTab === tab ? colors.blueNormal : colors.textLighter}
              >
                {tab}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AppScrollView contentContainerStyle={styles.notificationsContent}>
        {filteredNotifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getIconBackground(notification.type) },
              ]}
            >
              <Icon name={notification.icon} size={20} color={getIconColor(notification.type)} />
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

            <TouchableOpacity activeOpacity={0.7}>
              <Icon name="more-vertical" size={18} color={colors.placeholderText} />
            </TouchableOpacity>
          </View>
        ))}
      </AppScrollView>
    </Wrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  tabsScrollContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenWidth * 0.02,
  },
  tabButton: {
    paddingVertical: sizes.screenHeight * 0.008,
    paddingHorizontal: sizes.screenWidth * 0.04,
    borderRadius: sizes.screenWidth * 0.06,
  },
  activeTabButton: {
    backgroundColor: '#EAF0FF',
  },
  notificationsContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.012,
    gap: sizes.screenHeight * 0.01,
  },
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    padding: sizes.screenWidth * 0.035,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: sizes.screenWidth * 0.11,
    height: sizes.screenWidth * 0.11,
    borderRadius: sizes.screenWidth * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.002,
  },
  notificationContent: {
    flex: 1,
    gap: sizes.screenHeight * 0.006,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
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
});
