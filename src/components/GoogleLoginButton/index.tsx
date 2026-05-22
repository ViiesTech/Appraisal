import React from 'react';
import { TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native';
import images from '../../utils/images';
import AppText from '../AppText';
import styles from './style';
import AppImage from '../AppImage';

type Props = {
    onPress?: () => void;
    style?: ViewStyle;
    isLoading?: boolean;
};

const GoogleLoginButton = ({
    onPress,
    style,
    isLoading = false,
}: Props) => {

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={isLoading} style={[styles.container, style]}>
            {isLoading ? (
                <ActivityIndicator color="#000000" />
            ) : (
                <>
                    <AppImage source={images.google} style={styles.icon} resizeMode="contain" />
                    <AppText style={styles.text}>Login with Google</AppText>
                </>
            )}
        </TouchableOpacity>
    );
}

export default GoogleLoginButton;
