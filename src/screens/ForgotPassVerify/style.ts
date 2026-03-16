import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities/sizes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingHorizontal: sizes.screenWidth * 0.05,
        paddingVertical: sizes.screenHeight * 0.03
    },
    header: {
        alignItems: 'center',
    },
    title: {
        marginBottom: sizes.screenHeight * 0.01,
        marginTop: sizes.screenHeight * 0.04,
    },
    description: {
        textAlign: 'center',
        lineHeight: 22,
        width: sizes.screenWidth * 0.92
    },
    form: {
        marginTop: sizes.screenHeight * 0.05,
    },
    footer: {
        alignItems: 'center',
        marginBottom:sizes.screenWidth * 0.01
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        marginVertical: sizes.screenHeight * 0.01,
    },
    resendTextContainer: {
        alignItems: 'center',
        marginTop:sizes.screenHeight * 0.1
    },
    verifyButton: {
    },
    resendCodeActive: {
        textDecorationLine: 'underline',
    }
});

export default styles;
