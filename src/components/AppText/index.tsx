import React, { useState } from 'react';
import { Text as RNText, TextProps, TextStyle, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { fontSize as defaultFontSize , fontFamily as defaultFontFamily} from '../../services/utilities/fonts';

// Create a type for the custom props extending default TextProps
export interface AppTextProps extends TextProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    onPress?: () => void;
}

const AppText = ({
    children,
    style,
    fontSize,
    fontFamily,
    color,
    align = 'auto',
    onPress,
    ...rest
}: AppTextProps) => {

    const textStyle: TextStyle = {
        textAlign: align,
        fontSize: fontSize ? fontSize : defaultFontSize.regular,
        fontFamily: fontFamily ? fontFamily : defaultFontFamily.Regular,
        color: color ? color : colors.textDark,
    };

    const content = (
        <RNText style={[textStyle, style]} {...rest}>
            {children}
        </RNText>
    );

    if (onPress) {
        return (
            <TouchableOpacity 
                activeOpacity={0.6} 
                onPress={onPress}
                style={style}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

export default AppText;
