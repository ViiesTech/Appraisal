import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AppText } from '../../../components';
import { colors, fontFamily, fontSize, sizes } from '../../../utils';
import { ChecklistItem } from '../types';

interface Props {
  item: ChecklistItem;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isToggling?: boolean;
}

const ChecklistItemRow: React.FC<Props> = ({ item, onToggle, onEdit, onDelete, isToggling }) => (
  <View style={styles.row}>
    <TouchableOpacity
      style={styles.checkWrap}
      onPress={onToggle}
      disabled={isToggling}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.isCompleted && styles.checkboxDone]}>
        {item.isCompleted && <Icon name="check" size={11} color={colors.white} />}
      </View>
    </TouchableOpacity>

    <View style={styles.content}>
      <AppText
        fontSize={fontSize.smallM}
        fontFamily={fontFamily.Regular}
        color={item.isCompleted ? colors.placeholderText : colors.textDark}
        style={item.isCompleted ? styles.strikethrough : undefined}
        numberOfLines={2}
      >
        {item.task}
      </AppText>
      {!!item.notes && (
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.placeholderText}
          numberOfLines={1}
        >
          {item.notes}
        </AppText>
      )}
      {item.images?.length > 0 && (
        <View style={styles.pill}>
          <Icon name="image" size={10} color={colors.blueNormal} />
          <AppText fontSize={fontSize.tiny} fontFamily={fontFamily.Regular} color={colors.blueNormal}>
            {item.images.length} photo{item.images.length > 1 ? 's' : ''}
          </AppText>
        </View>
      )}
    </View>

    <View style={styles.actions}>
      <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Icon name="edit-2" size={14} color={colors.textLighter} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Icon name="trash-2" size={14} color="#E53E3E" />
      </TouchableOpacity>
    </View>
  </View>
);

export default ChecklistItemRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: sizes.screenHeight * 0.01,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  checkWrap: {
    marginRight: sizes.screenWidth * 0.025,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  content: {
    flex: 1,
    gap: 3,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    marginLeft: sizes.screenWidth * 0.02,
  },
});
