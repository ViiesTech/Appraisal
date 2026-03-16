import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import images from '../../services/utilities/images';
import AppText from '../AppText';
import styles from './style';
import AppImage from '../AppImage';

type Props = {
    onPress?: () => void;
    style?: ViewStyle;
};

const GoogleLoginButton = ({
    onPress,
    style,
}: Props) => {

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.container, style]}>
            <AppImage source={images.google} style={styles.icon} resizeMode="contain" />
            <AppText style={styles.text}>Login with Google</AppText>
        </TouchableOpacity>
    );
}

export default GoogleLoginButton;
