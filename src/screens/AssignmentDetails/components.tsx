import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors, sizes } from '../../utils';

// ── Skeletons ─────────────────────────────────────────────────────────────────

const SPEED = 1200;
const BG = colors.borderLight;
const HL = colors.blueGrey;

export const AssignmentDetailsSkeleton = () => (
  <>
    {/* Status card */}
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
      <View style={skStyles.card}>
        <View style={skStyles.statusHeaderRow}>
          <View style={skStyles.badgeShort} />
          <View style={skStyles.badgeLong} />
        </View>
        <View style={skStyles.statusGrid}>
          {[0, 1, 2, 3, 4].map(i => <View key={i} style={skStyles.statusBtn} />)}
        </View>
      </View>
    </SkeletonPlaceholder>
    {/* Property card */}
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
      <View style={skStyles.card}>
        <View style={skStyles.sectionHeader} />
        <View style={skStyles.line} />
        <View style={skStyles.lineShort} />
        <View style={skStyles.twoCol}>
          <View style={skStyles.colBlock} />
          <View style={skStyles.colBlock} />
        </View>
      </View>
    </SkeletonPlaceholder>
    {/* Client card */}
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
      <View style={skStyles.card}>
        <View style={skStyles.sectionHeader} />
        <View style={skStyles.line} />
        <View style={skStyles.lineShort} />
        <View style={skStyles.twoCol}>
          <View style={skStyles.colBlock} />
          <View style={skStyles.colBlock} />
        </View>
      </View>
    </SkeletonPlaceholder>
    {/* Dates card */}
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
      <View style={skStyles.card}>
        <View style={skStyles.sectionHeader} />
        <View style={skStyles.twoCol}>
          <View style={skStyles.colBlock} />
          <View style={skStyles.colBlock} />
        </View>
      </View>
    </SkeletonPlaceholder>
  </>
);

const skStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    padding: sizes.screenWidth * 0.045,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.015,
  },
  badgeShort: {
    width: sizes.screenWidth * 0.25,
    height: 14,
    borderRadius: 4,
  },
  badgeLong: {
    width: sizes.screenWidth * 0.28,
    height: 24,
    borderRadius: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.025,
  },
  statusBtn: {
    flex: 1,
    minWidth: '44%',
    height: sizes.screenHeight * 0.046,
    borderRadius: sizes.screenWidth * 0.025,
  },
  sectionHeader: {
    width: sizes.screenWidth * 0.45,
    height: 16,
    borderRadius: 4,
    marginBottom: sizes.screenHeight * 0.015,
  },
  line: {
    width: '100%',
    height: 13,
    borderRadius: 4,
    marginBottom: 8,
  },
  lineShort: {
    width: '60%',
    height: 13,
    borderRadius: 4,
    marginBottom: sizes.screenHeight * 0.012,
  },
  twoCol: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    marginTop: 4,
  },
  colBlock: {
    flex: 1,
    height: 44,
    borderRadius: 6,
  },
});
