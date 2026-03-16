import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import AppText from '../AppText';
import styles from './style';

type Props = {
    title: string;
    onPress?: () => void;
    variant?: 'dark' | 'light';
    size?: 'half' | 'full';
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const Button = ({ 
    title, 
    onPress, 
    variant = 'dark', 
    size = 'full', 
    style, 
    textStyle 
}: Props) => {
    
    const containerStyle = [
        styles.container,
        size === 'half' ? styles.halfWidth : styles.fullWidth,
        variant === 'dark' ? styles.bgDark : styles.bgLight,
        style
    ];

    const titleStyle: TextStyle[] = [
        styles.text,
        variant === 'dark' ? styles.textLight : styles.textDark,
        ...(textStyle ? [textStyle] : [])
    ];

    return (
        <TouchableOpacity 
            activeOpacity={0.6} 
            onPress={onPress} 
            style={containerStyle}
        >
            <AppText style={titleStyle}>{title}</AppText>
        </TouchableOpacity>
    );
}

export default Button;
