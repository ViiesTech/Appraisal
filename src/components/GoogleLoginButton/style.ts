import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities/sizes';
import { fontFamily, fontSize } from '../../services/utilities/fonts';

const styles = StyleSheet.create({
    container: {
        height: sizes.screenHeight * 0.06,
        width: sizes.screenWidth * 0.9,
        borderRadius: sizes.screenWidth * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight ,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignSelf:'center'
    },
    icon: {
        width: sizes.screenWidth * 0.06,
        height: sizes.screenWidth * 0.06,
        marginRight: sizes.screenWidth * 0.03,
    },
    text: {
        fontSize: fontSize.medium,
        fontFamily:fontFamily.Regular,
        color: colors.textLight,
    }
});

export default styles;
