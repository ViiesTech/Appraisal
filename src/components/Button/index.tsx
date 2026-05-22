import React from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import AppText from '../AppText';
import styles from './style';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'dark' | 'light';
  size?: 'half' | 'full';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  title,
  onPress,
  variant = 'dark',
  size = 'full',
  style,
  textStyle,
  disabled = false,
  isLoading = false,
}: Props) => {
  const containerStyle = [
    styles.container,
    size === 'half' ? styles.halfWidth : styles.fullWidth,
    variant === 'dark' ? styles.bgDark : styles.bgLight,
    style,
  ];

  const titleStyle: TextStyle[] = [
    styles.text,
    variant === 'dark' ? styles.textLight : styles.textDark,
    ...(textStyle ? [textStyle] : []),
  ];

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      activeOpacity={0.6}
      onPress={onPress}
      style={containerStyle}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'dark' ? '#FFFFFF' : '#000000'} />
      ) : (
        <AppText style={titleStyle}>{title}</AppText>
      )}
    </TouchableOpacity>
  );
};

export default Button;
