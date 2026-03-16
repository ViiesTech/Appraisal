import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities/sizes';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingHorizontal: sizes.screenWidth * 0.05,
        paddingVertical: sizes.screenHeight * 0.03
    },
    header: {
        alignItems: 'center',
        marginTop: sizes.screenHeight * 0.04,
        marginBottom: sizes.screenHeight * 0.03,
    },
    logo: {
        width: sizes.screenWidth * 0.25,
        height: sizes.screenWidth * 0.25,
    },
    welcomeText: {
        marginBottom: sizes.screenHeight * 0.01,
    },
    subText: {
        textAlign: 'center',
    },
    form: {
        marginBottom: sizes.screenHeight * 0.03,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotText: {
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
    },
    footer: {
        alignItems: 'center',
    },
    loginButton: {
    },
    divider: {
        marginTop: sizes.screenHeight * 0.09,
        marginBottom: sizes.screenHeight * 0.05
    },
    googleButton: {
    },
});

export default styles;
