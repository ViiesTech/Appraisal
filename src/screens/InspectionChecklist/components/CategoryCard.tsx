import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppText } from '../../../components';
import { colors, fontFamily, fontSize, sizes } from '../../../utils';
import { ChecklistCategory, ChecklistItem } from '../types';
import ChecklistItemRow from './ChecklistItemRow';

interface Props {
  category: ChecklistCategory;
  onEdit: () => void;
  onDelete: () => void;
  onAddItem: () => void;
  onEditItem: (item: ChecklistItem) => void;
  onDeleteItem: (itemId: string) => void;
  onToggleItem: (itemId: string, isCompleted: boolean) => void;
  togglingId?: string | null;
}

const CategoryCard: React.FC<Props> = ({
  category,
  onEdit,
  onDelete,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleItem,
  togglingId,
}) => {
  const [expanded, setExpanded] = useState(true);

  const total = category.items.length;
  const done = category.items.filter(i => i.isCompleted).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const isComplete = total > 0 && done === total;
  const progressColor = isComplete ? '#22C55E' : '#4263EB';

  const confirmDelete = () =>
    Alert.alert(
      'Delete Category',
      `Delete "${category.title}" and all its items?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ],
    );

  return (
    <View style={styles.card}>
      {/* ── Header ── */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(v => !v)}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.dot, isComplete && styles.dotDone]}>
            {isComplete ? (
              <Icon name="check" size={12} color={colors.white} />
            ) : (
              <AppText
                fontSize={fontSize.tiny}
                fontFamily={fontFamily.Bold}
                color={'#4263EB'}
              >
                {percent}%
              </AppText>
            )}
          </View>
          <View style={styles.titleBlock}>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
            >
              {category.title}
            </AppText>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
            >
              {done}/{total} completed
            </AppText>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={onEdit}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.iconBtn}
          >
            <Icon name="edit-2" size={14} color={colors.textLighter} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.iconBtn}
          >
            <Icon name="trash-2" size={14} color="#E53E3E" />
          </TouchableOpacity>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={colors.textLighter}
          />
        </View>
      </TouchableOpacity>

      {/* ── Progress bar ── */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${percent}%`, backgroundColor: progressColor },
          ]}
        />
      </View>

      {/* ── Items (expanded) ── */}
      {expanded && (
        <View style={styles.itemsWrap}>
          {category.items.map(item => (
            <ChecklistItemRow
              key={item._id}
              item={item}
              onToggle={() => onToggleItem(item._id, !item.isCompleted)}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item._id)}
              isToggling={togglingId === item._id}
            />
          ))}

          <TouchableOpacity
            style={styles.addItemRow}
            onPress={onAddItem}
            activeOpacity={0.7}
          >
            <Icon name="plus" size={14} color={colors.blueNormal} />
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.blueNormal}
            >
              Add Item
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.014,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: sizes.screenWidth * 0.03,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.02,
  },
  iconBtn: { padding: 4 },
  progressTrack: {
    height: 5,
    backgroundColor: '#E2E8F0',
    marginHorizontal: sizes.screenWidth * 0.04,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: sizes.screenHeight * 0.014,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  itemsWrap: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.012,
    paddingTop: sizes.screenHeight * 0.006,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: sizes.screenHeight * 0.012,
    marginTop: sizes.screenHeight * 0.006,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});
