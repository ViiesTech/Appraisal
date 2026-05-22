import React, { useState } from 'react';
import {
  Wrapper,
  AppText,
  AppHeader,
  TaskCard,
  TaskCardSkeleton,
} from '../../components';
import { fontSize, fontFamily } from '../../utils/fonts';
import { colors, sizes } from '../../utils';
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation';
import { useGetOrdersQuery } from '../../redux/api/apiSlice';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

const headerContainerStyle: ViewStyle = {
  // paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

type TabKey =
  | 'all'
  | 'assigned'
  | 'scheduled'
  | 'underReview'
  | 'finalReportInProgress'
  | 'overdue'
  | 'completed';

interface Tab {
  key: TabKey;
  label: string;
}

const TABS: Tab[] = [
  { key: 'all', label: 'All' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'underReview', label: 'Under Review' },
  { key: 'finalReportInProgress', label: 'Final Report In Progress' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'completed', label: 'Completed' },
];

const getStatusDisplay = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'assigned':
      return { label: 'Assigned', color: colors.statusBlue };
    case 'scheduled':
      return { label: 'Scheduled', color: colors.statusAmber };
    case 'underreview':
      return { label: 'Under Review', color: colors.statusAmber };
    case 'finalreportinprogress':
      return { label: 'Final Report In Progress', color: colors.statusBlue };
    case 'overdue':
      return { label: 'Overdue', color: colors.priorityRedText };
    case 'completed':
      return {
        label: 'Completed',
        color: colors.statusGreen ?? colors.statusBlue,
      };
    default:
      return { label: status, color: colors.statusGray };
  }
};

const getPriorityDisplay = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return { label: 'High', color: colors.priorityRedText };
    case 'medium':
      return { label: 'Medium', color: colors.priorityAmberText };
    default:
      return { label: 'Low', color: colors.priorityGrayText };
  }
};

const TasksSkeleton = () => (
  <View style={{ gap: sizes.screenHeight * 0.012 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <TaskCardSkeleton key={i} />
    ))}
  </View>
);

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const queryParams =
    activeTab === 'all'
      ? { page: 1, limit: 50 }
      : { status: activeTab, page: 1, limit: 50 };

  const { data, isLoading, isFetching } = useGetOrdersQuery(queryParams);
  const orders = data?.orders ?? [];

  const renderItem = ({ item }: { item: (typeof orders)[0] }) => {
    const statusDisplay = getStatusDisplay(item.status);
    const priorityDisplay = getPriorityDisplay(item.priority);
    return (
      <TaskCard
        status={statusDisplay.label}
        priority={priorityDisplay.label}
        address={item.property?.address ?? '—'}
        progress={item.progressPercent ?? 0}
        dueDate={
          item.deadline ? moment.utc(item.deadline).format('MMM D, YYYY') : '—'
        }
        organizationName={item.client?.name}
        statusColor={statusDisplay.color}
        priorityColor={priorityDisplay.color}
        progressColor={statusDisplay.color}
        variant="task"
        onPress={() =>
          navigation.navigate('AssignmentDetails', { orderId: item._id })
        }
      />
    );
  };

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="My Tasks"
        showBackground
        hideBackButton
        description="Manage your assignments"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.headerTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.headerTabsContent}
            >
              {TABS.map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    onPress={() => setActiveTab(tab.key)}
                    style={[
                      styles.headerTab,
                      isActive && styles.headerTabActive,
                    ]}
                  >
                    <AppText
                      fontSize={fontSize.smallM}
                      fontFamily={fontFamily.Bold}
                      color={isActive ? colors.blueNormal : colors.white}
                    >
                      {tab.label}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
      />

      {isLoading || isFetching ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TasksSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            orders.length === 0 && styles.emptyContainer,
          ]}
          ListEmptyComponent={
            <View style={styles.emptyContent}>
              <Icon name="clipboard" size={40} color={colors.textLighter} />
              <AppText
                fontSize={fontSize.h6}
                fontFamily={fontFamily.Bold}
                color={colors.textLighter}
                style={styles.emptyTitle}
              >
                No tasks found
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.placeholderText}
                style={styles.emptySubtitle}
              >
                {activeTab === 'all'
                  ? 'You have no assignments yet'
                  : `No ${TABS.find(
                      t => t.key === activeTab,
                    )?.label.toLowerCase()} tasks`}
              </AppText>
            </View>
          }
        />
      )}
    </Wrapper>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  headerTabsContainer: {
    paddingVertical: sizes.screenHeight * 0.01,
    paddingTop: sizes.screenHeight * 0.001,
  },
  headerTabsContent: {
    gap: sizes.screenWidth * 0.025,
  },
  headerTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.015,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.008,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  headerTabActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.018,
    paddingBottom: sizes.screenHeight * 0.03,
    gap: sizes.screenHeight * 0.012,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.1,
    gap: sizes.screenHeight * 0.012,
  },
  emptyTitle: {
    marginTop: sizes.screenHeight * 0.008,
  },
  emptySubtitle: {
    textAlign: 'center',
  },
});
