import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily, sizes } from '../../services/utilities';

interface TaskCardProps {
  status: string;
  priority: string;
  address: string;
  progress: number;
  dueDate: string;
  organizationName?: string;
  statusColor: string;
  priorityColor: string;
  progressColor: string;
  variant?: 'home' | 'task';
  onPress?: () => void;
}

const TaskCard = ({
  status,
  priority,
  address,
  progress,
  dueDate,
  organizationName,
  statusColor,
  priorityColor,
  progressColor,
  variant = 'home',
  onPress,
}: TaskCardProps) => {
  const isHomeVariant = variant === 'home';
  const isUrgent = status === 'Overdue' && priority.includes('URGENT');
  const shouldShowPriorityBadge = priority !== 'Low';

  // Get priority badge background color
  const getPriorityBG = () => {
    if (priority === 'High Priority' || priority === 'High') return colors.priorityRedBG;
    if (priority === 'Medium') return colors.priorityAmberBG;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[
        styles.container,
        isHomeVariant ? styles.homeVariant : styles.taskVariant,
        isUrgent && styles.urgentContainer,
      ]}
    >
      {/* URGENT Banner - Full Width */}
      {isUrgent && (
        <View style={styles.urgentBanner}>
          <Icon name="alert-circle" size={16} color={colors.error} />
          <AppText
            fontSize={fontSize.small}
            fontFamily={fontFamily.Bold}
            color={colors.error}
            style={styles.urgentText}
          >
            URGENT - Overdue
          </AppText>
        </View>
      )}

      {/* Status and Priority Row */}
      <View style={styles.statusRow}>
        <View style={styles.statusBadgeContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.statusText}
          >
            {status}
          </AppText>
        </View>
        {shouldShowPriorityBadge && (
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityBG() }]}>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Bold}
              color={priorityColor}
            >
              {priority}
            </AppText>
          </View>
        )}
      </View>

      {/* Address */}
      <AppText
        fontSize={fontSize.smallM}
        fontFamily={fontFamily.Bold}
        color={colors.textDark}
        style={styles.addressText}
        numberOfLines={2}
      >
        {address}
      </AppText>

      {/* Progress Section */}
      <View style={styles.progressHeader}>
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
        >
          Progress
        </AppText>
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Bold}
          color={colors.textLighter}
        >
          {progress}%
        </AppText>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarWrapper}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      {/* Bottom Row - Different for home vs task */}
      {isHomeVariant ? (
        <View style={styles.homeBottomRow}>
          <Icon
            name="clock"
            size={fontSize.small}
            color={colors.placeholderText}
          />
          <AppText
            color={colors.placeholderText}
            fontSize={fontSize.small}
            fontFamily={fontFamily.Regular}
            style={styles.dueDateText}
          >
            Due: {dueDate}
          </AppText>
        </View>
      ) : (
        <View style={styles.taskBottomRow}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
          >
            {organizationName}
          </AppText>
          <AppText
            fontSize={fontSize.small}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
          >
            Due: {dueDate}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    padding: sizes.screenWidth * 0.04,
    overflow: 'hidden',
  },
  homeVariant: {
    backgroundColor: colors.blueGrey,
    borderColor: colors.borderLight,
  },
  taskVariant: {
    backgroundColor: colors.white,
    borderColor: '#E6E8EF',
  },
  urgentContainer: {
    borderColor: colors.error,
    borderWidth: 1.5,
    backgroundColor: '#FEF2F2',
  },
  urgentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.priorityRedBG,
    borderRadius: 8,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.008,
    marginBottom: sizes.screenHeight * 0.012,
    gap: 6,
  },
  urgentText: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.01,
  },
  statusBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {},
  priorityBadge: {
    borderRadius: 6,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.005,
  },
  addressText: {
    marginBottom: sizes.screenHeight * 0.01,
    lineHeight: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.008,
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: '#E5E6EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: sizes.screenHeight * 0.012,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  homeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  dueDateText: {
    marginLeft: sizes.screenWidth * 0.015,
  },
});

export default TaskCard;
