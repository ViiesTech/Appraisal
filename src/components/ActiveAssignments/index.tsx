import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
  ShadowCard,
  AppText,
  TaskCard,
  ActiveAssignmentsInnerSkeleton,
} from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily } from '../../utils';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useGetOrdersQuery } from '../../redux/api/apiSlice';

const ACTIVE_STATUSES = 'assigned,scheduled,finalReportInProgress,overdue';

const getStatusDisplay = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'assigned':
      return { label: 'Assigned', color: colors.statusBlue };
    case 'scheduled':
      return { label: 'Scheduled', color: colors.statusAmber };
    case 'finalReportInProgress':
      return { label: 'In Progress', color: colors.statusBlue };
    case 'overdue':
      return { label: 'Overdue', color: colors.priorityRedText };
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

const ActiveAssignments = () => {
  const navigation = useNavigation<any>();

  const { data, isLoading, isFetching } = useGetOrdersQuery({
    status: ACTIVE_STATUSES,
  });
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
        statusColor={statusDisplay.color}
        priorityColor={priorityDisplay.color}
        progressColor={statusDisplay.color}
        variant="home"
        onPress={() =>
          navigation.navigate('AssignmentDetails', { orderId: item._id })
        }
      />
    );
  };

  return (
    <ShadowCard style={styles.container}>
      <View style={styles.header}>
        <AppText
          fontSize={fontSize.h6}
          fontFamily={fontFamily.Bold}
          color={colors.textDark}
          style={styles.headerTitle}
        >
          Active Assignments
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.seeAllContainer}
          onPress={() => navigation.navigate('Tasks')}
        >
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Black}
            color={colors.blueNormal}
            style={styles.seeAllText}
          >
            See All
          </AppText>
          <Icon
            name="chevron-right"
            size={fontSize.medium}
            color={colors.blueNormal}
          />
        </TouchableOpacity>
      </View>

      {isLoading || isFetching ? (
        <ActiveAssignmentsInnerSkeleton />
      ) : (
        <FlatList
          data={orders.slice(0, 3)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          scrollEnabled={false}
          style={styles.flatList}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText fontFamily={fontFamily.Bold} color={colors.textLighter}>
                No active assignments
              </AppText>
            </View>
          }
        />
      )}
    </ShadowCard>
  );
};

export default ActiveAssignments;
