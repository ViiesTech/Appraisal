import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily, sizes } from '../../utils';
import AppText from '../AppText';

interface SectionHeaderProps {
  icon: string;
  title: string;
}

const SectionHeader = ({ icon, title }: SectionHeaderProps) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionIconBg}>
      <Icon name={icon} size={15} color={colors.blueNormal} />
    </View>
    <AppText
      fontSize={fontSize.medium}
      fontFamily={fontFamily.Bold}
      color={colors.textDark}
      style={styles.sectionTitle}
    >
      {title}
    </AppText>
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.015,
  },
  sectionIconBg: {
    width: sizes.screenWidth * 0.08,
    height: sizes.screenWidth * 0.08,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizes.screenWidth * 0.025,
  },
  sectionTitle: {
    flex: 1,
  },
});
