import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fontSize, fontFamily, sizes } from '../../utils';
import AppText from '../AppText';

interface InfoRowProps {
  label: string;
  value?: string | null;
  valueColor?: string;
}

export const InfoRow = ({ label, value, valueColor }: InfoRowProps) => (
  <>
    <AppText
      fontSize={fontSize.small}
      fontFamily={fontFamily.Regular}
      color={colors.textLighter}
    >
      {label}
    </AppText>
    <AppText
      fontSize={fontSize.smallM}
      fontFamily={fontFamily.Bold}
      color={valueColor ?? colors.textDark}
      style={styles.valueText}
    >
      {value || '—'}
    </AppText>
  </>
);

interface TwoColRowProps {
  left: InfoRowProps;
  right: InfoRowProps;
}

export const TwoColRow = ({ left, right }: TwoColRowProps) => (
  <View style={styles.twoCol}>
    <View style={styles.colItem}>
      <InfoRow {...left} />
    </View>
    <View style={styles.colItem}>
      <InfoRow {...right} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  valueText: {
    marginTop: sizes.screenHeight * 0.004,
    marginBottom: sizes.screenHeight * 0.012,
  },
  twoCol: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.002,
  },
  colItem: {
    flex: 1,
  },
});
