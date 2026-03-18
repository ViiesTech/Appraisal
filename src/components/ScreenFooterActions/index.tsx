import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import AppText from '../AppText';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';

type ButtonVariant = 'filled' | 'outline';

interface ScreenFooterActionsProps {
  primaryLabel: string;
  onPrimaryPress?: () => void;
  primaryVariant?: ButtonVariant;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  primaryButtonStyle?: StyleProp<ViewStyle>;
  secondaryButtonStyle?: StyleProp<ViewStyle>;
  primaryTextStyle?: StyleProp<TextStyle>;
  secondaryTextStyle?: StyleProp<TextStyle>;
  helperTextStyle?: StyleProp<TextStyle>;
}

const ScreenFooterActions = ({
  primaryLabel,
  onPrimaryPress,
  primaryVariant = 'filled',
  secondaryLabel,
  onSecondaryPress,
  helperText,
  containerStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  primaryTextStyle,
  secondaryTextStyle,
  helperTextStyle,
}: ScreenFooterActionsProps) => {
  const isPrimaryOutline = primaryVariant === 'outline';

  return (
    <View style={[styles.footer, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.primaryBtn,
          isPrimaryOutline ? styles.primaryBtnOutline : styles.primaryBtnFilled,
          primaryButtonStyle,
        ]}
        activeOpacity={0.85}
        onPress={onPrimaryPress}
      >
        <AppText
          fontSize={fontSize.medium}
          fontFamily={fontFamily.Bold}
          color={isPrimaryOutline ? colors.textDark : colors.white}
          style={primaryTextStyle}
        >
          {primaryLabel}
        </AppText>
      </TouchableOpacity>

      {secondaryLabel ? (
        <TouchableOpacity
          style={[styles.secondaryBtn, secondaryButtonStyle]}
          activeOpacity={0.85}
          onPress={onSecondaryPress}
        >
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={secondaryTextStyle}
          >
            {secondaryLabel}
          </AppText>
        </TouchableOpacity>
      ) : null}

      {helperText ? (
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={[styles.helperText, helperTextStyle]}
        >
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

export default ScreenFooterActions;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.01,
    paddingBottom: sizes.screenHeight * 0.02,
    borderTopWidth: 1,
    borderTopColor: '#E6E8EF',
    gap: sizes.screenHeight * 0.012,
  },
  primaryBtn: {
    minHeight: sizes.screenHeight * 0.055,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnFilled: {
    backgroundColor: colors.blueNormal,
  },
  primaryBtnOutline: {
    backgroundColor: '#F6F7FA',
    borderWidth: 1,
    borderColor: '#D7DBE4',
  },
  secondaryBtn: {
    backgroundColor: colors.priorityGrayBG,
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    textAlign: 'center',
  },
});