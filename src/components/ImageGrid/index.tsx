import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { sizes } from '../../utils';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';

const GRID_GAP = 2;
export const BUBBLE_WIDTH = sizes.screenWidth * 0.65;

interface Props {
  attachments: string[];
  onPress: (index: number) => void;
}

const ImageGrid: React.FC<Props> = ({ attachments, onPress }) => {
  const count = attachments.length;
  const W = BUBBLE_WIDTH;
  const half = (W - GRID_GAP) / 2;

  const cell = (uri: string, index: number, w: number, h: number, showOverlay = false) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.85}
      onPress={() => onPress(index)}
      style={[styles.gridCell, { width: w, height: h }]}
    >
      <Image source={{ uri }} style={styles.gridImage} resizeMode="cover" />
      {showOverlay && (
        <View style={styles.gridOverlay}>
          <AppText style={styles.gridOverlayText}>+{count - 4}</AppText>
        </View>
      )}
    </TouchableOpacity>
  );

  if (count === 1) {
    return (
      <View style={[styles.bubbleImages, { width: W }]}>
        {cell(attachments[0], 0, W, W * 0.75)}
      </View>
    );
  }

  if (count === 2) {
    return (
      <View style={[styles.bubbleImages, { width: W }]}>
        <View style={[styles.gridRow, { gap: GRID_GAP }]}>
          {cell(attachments[0], 0, half, half)}
          {cell(attachments[1], 1, half, half)}
        </View>
      </View>
    );
  }

  if (count === 3) {
    return (
      <View style={[styles.bubbleImages, { width: W }]}>
        {cell(attachments[0], 0, W, W * 0.55)}
        <View style={[styles.gridRow, { gap: GRID_GAP, marginTop: GRID_GAP }]}>
          {cell(attachments[1], 1, half, half * 0.75)}
          {cell(attachments[2], 2, half, half * 0.75)}
        </View>
      </View>
    );
  }

  // 4 or more — 2×2 grid with "+N" overlay on last cell
  const visible = attachments.slice(0, 4);
  const hasMore = count > 4;
  return (
    <View style={[styles.bubbleImages, { width: W }]}>
      <View style={[styles.gridRow, { gap: GRID_GAP }]}>
        {cell(visible[0], 0, half, half)}
        {cell(visible[1], 1, half, half)}
      </View>
      <View style={[styles.gridRow, { gap: GRID_GAP, marginTop: GRID_GAP }]}>
        {cell(visible[2], 2, half, half)}
        {cell(visible[3], 3, half, half, hasMore)}
      </View>
    </View>
  );
};

export default ImageGrid;
