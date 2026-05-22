import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ScreenFooterActions,
  NotificationsSkeleton,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
};

type TabKey =
  | 'all'
  | 'unread'
  | 'order'
  | 'template'
  | 'account'
  | 'commentExample'
  | 'system';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'order', label: 'Order' },
  { key: 'template', label: 'Template' },
  { key: 'account', label: 'Account' },
  { key: 'commentExample', label: 'Comment' },
  { key: 'system', label: 'System' },
];

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'order':
      return 'file-text';
    case 'template':
      return 'layout';
    case 'account':
      return 'user';
    case 'commentExample':
      return 'message-square';
    case 'system':
      return 'settings';
    default:
      return 'bell';
  }
};

const buildQueryParams = (
  tabKey: TabKey,
): { isRead?: boolean; type?: string; page: number; limit: number } => {
  if (tabKey === 'all') return { page: 1, limit: 20 };
  if (tabKey === 'unread') return { isRead: false, page: 1, limit: 20 };
  return { type: tabKey, page: 1, limit: 20 };
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const queryParams = buildQueryParams(activeTab);
  const { data, isLoading, isFetching } = useGetNotificationsQuery(queryParams);
  const [markAllRead, { isLoading: isMarkingRead }] =
    useMarkAllNotificationsAsReadMutation();

  const notifications = useMemo(() => {
    const list = data?.notifications ?? [];
    if (activeTab === 'all') {
      return [...list].sort((a, b) =>
        a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1,
      );
    }
    return list;
  }, [data, activeTab]);

  const unreadCount = data?.unreadCount ?? 0;

  const getIconStyles = (isRead: boolean) => ({
    container: isRead ? styles.readIconContainer : styles.unreadIconContainer,
    color: isRead ? '#667085' : colors.white,
  });

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Notifications"
        hideBackButton
        containerStyle={headerContainerStyle}
        rightActionNode={
          unreadCount > 0 ? (
            <View style={styles.newBadge}>
              <AppText
                fontSize={12}
                fontFamily={fontFamily.Bold}
                color={colors.white}
              >
                {unreadCount} New
              </AppText>
            </View>
          ) : undefined
        }
        renderCustomTabs={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={
                    activeTab === tab.key ? fontFamily.Bold : fontFamily.Regular
                  }
                  color={
                    activeTab === tab.key ? colors.white : colors.textLighter
                  }
                >
                  {tab.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
      />

      {isLoading || isFetching ? (
        <AppScrollView contentContainerStyle={styles.notificationsContent}>
          <NotificationsSkeleton />
        </AppScrollView>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="bell-off" size={36} color={colors.borderLight} />
          <AppText
            fontFamily={fontFamily.Bold}
            color={colors.textLighter}
            style={styles.emptyText}
          >
            No notifications
          </AppText>
        </View>
      ) : (
        <AppScrollView contentContainerStyle={styles.notificationsContent}>
          {notifications.map(item => {
            const iconStyles = getIconStyles(item.isRead);
            return (
              <View
                key={item._id}
                style={[
                  styles.notificationCard,
                  !item.isRead && styles.unreadNotificationCard,
                ]}
              >
                <View style={[styles.iconContainer, iconStyles.container]}>
                  <Icon
                    name={getNotificationIcon(item.type)}
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
                      {item.title}
                    </AppText>
                    {!item.isRead && <View style={styles.unreadDot} />}
                  </View>

                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                    numberOfLines={2}
                  >
                    {item.message}
                  </AppText>

                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.placeholderText}
                    style={styles.timeText}
                  >
                    {moment(item.createdAt).fromNow()}
                  </AppText>
                </View>
              </View>
            );
          })}
        </AppScrollView>
      )}

      <ScreenFooterActions
        primaryLabel="Mark All as Read"
        onPrimaryPress={async () => {
          try {
            await markAllRead().unwrap();
            showToast('success', 'All notifications marked as read');
          } catch {
            showToast('error', 'Failed to mark notifications as read');
          }
        }}
        primaryVariant="outline"
        isLoading={isMarkingRead}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: sizes.screenHeight * 0.015,
  },
});
