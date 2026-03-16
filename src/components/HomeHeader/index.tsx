import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { AppImage, AppText } from '..';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import { colors } from '../../services/utilities/colors';
import styles from './style';
import images from '../../services/utilities/images';
import { useDispatch } from 'react-redux';

const HomeHeader = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: 'RESET_STORE' });
    };

    return (
        <ImageBackground
            resizeMode='stretch'
            source={images.appHeaderBG}
            style={styles.container}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.topRow}>
                <AppImage source={images.logoWhite} style={styles.logo} resizeMode="contain" />
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
                    <AppImage source={images.logoWhite} style={styles.userImage} resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Regular}
                    color={colors.textWhite}
                >
                    Welcome Back 👋
                </AppText>
                <AppText
                    fontSize={fontSize.h2}
                    fontFamily={fontFamily.Black}
                    color={colors.white}
                    style={styles.userName}
                >
                    John Anderson
                </AppText>
                <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Regular}
                    color={colors.textBlue}
                    style={styles.userRole}
                >
                    Certified Appraiser • Level 3
                </AppText>
            </View>
        </ImageBackground>
    );
};

export default HomeHeader;
