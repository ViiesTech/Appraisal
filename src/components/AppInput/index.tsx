import React from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import AppText from '../AppText';
import AppImage from '../AppImage';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

interface Props extends TextInputProps {
    title?: string;
    leftIcon?: any;
    onLeftIconPress?: () => void;
    leftIconStyle?: any;
    rightIcon?: any;
    onRightIconPress?: () => void;
    rightIconStyle?: any;
    value?: string;
    onChangeText?: (text: string) => void;
    errorMessage?: string;
    size?: 'half' | 'full';
}

const AppInput = ({ 
    title, 
    style, 
    leftIcon,
    onLeftIconPress,
    leftIconStyle,
    rightIcon, 
    onRightIconPress, 
    rightIconStyle, 
    errorMessage, 
    size = 'full',
    ...rest 
}: Props) => {
    const hasError = Boolean(errorMessage);
    return (
        <View style={[
            styles.container, 
            size === 'half' ? styles.halfWidth : styles.fullWidth,
            style
        ]}>
            {title && (
                <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={colors.textLight}
                    style={styles.label}
                >
                    {title}
                </AppText>
            )}
            <View style={[styles.inputContainer, hasError && styles.errorInput, style]}>
                {leftIcon && (
                    <TouchableOpacity
                        onPress={onLeftIconPress}
                        disabled={!onLeftIconPress}
                        style={styles.leftIconContainer}
                    >
                        {React.isValidElement(leftIcon) ? (
                            leftIcon
                        ) : (
                            <AppImage
                                source={leftIcon}
                                style={[{ width: 20, height: 20 }, leftIconStyle]}
                                resizeMode="contain"
                            />
                        )}
                    </TouchableOpacity>
                )}
                <TextInput
                    placeholderTextColor={colors.placeholderText}
                    style={styles.input}
                    {...rest}
                />
                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                        style={styles.rightIconContainer}
                    >
                        {React.isValidElement(rightIcon) ? (
                            rightIcon
                        ) : (
                            <AppImage
                                source={rightIcon}
                                style={[{ width: 20, height: 20 }, rightIconStyle]}
                                resizeMode="contain"
                            />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            {hasError && (
                <View style={styles.errorContainer}>
                    <Icon name="info" size={14} color={colors.error} />
                    <AppText
                        fontSize={fontSize.small}
                        fontFamily={fontFamily.Bold}
                        color={colors.error}
                        style={styles.errorText}
                    >
                        {errorMessage}
                    </AppText>
                </View>
            )}
        </View>
    );
};

export default AppInput;
