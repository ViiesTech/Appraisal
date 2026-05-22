import React from 'react';
import { View } from 'react-native';
import { chatStyles as styles } from '../../screens/ChatConversation/styles';

const TypingIndicator: React.FC = () => (
  <View style={styles.typingBubble}>
    <View style={styles.typingDot} />
    <View style={[styles.typingDot, styles.typingDotMid]} />
    <View style={styles.typingDot} />
  </View>
);

export default TypingIndicator;
