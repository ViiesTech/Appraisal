import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities/sizes';
import { fontSize, fontFamily } from '../../services/utilities/fonts';

const styles = StyleSheet.create({
    container: {
        height: sizes.screenHeight * 0.05,
        borderRadius: sizes.screenWidth * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    fullWidth: {
        width: sizes.screenWidth * 0.9,
    },
    halfWidth: {
        width: sizes.screenWidth * 0.43,
    },
    bgDark: {
        backgroundColor: colors.blueNormal,
        borderColor: colors.blueNormal,
    },
    bgLight: {
        backgroundColor: colors.white,
        borderColor: colors.blueNormal,
    },
    text: {
        fontSize: fontSize.medium,
        fontFamily: fontFamily.Regular,
    },
    textDark: {
        color: colors.textLight,
    },
    textLight: {
        color: colors.white,
    }
});

export default styles;
