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
        marginTop: sizes.screenHeight * 0.03,
        marginBottom: sizes.screenHeight * 0.08,
    },
    form: {
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: sizes.screenWidth * 0.9,
    },
    passwordHint: {
        marginTop: -sizes.screenHeight * 0.005,
        marginBottom: sizes.screenHeight * 0.01,
        marginLeft: sizes.screenWidth * 0.02,
    },
    footerButton: {
        marginTop: sizes.screenHeight * 0.04,
        marginBottom: sizes.screenHeight * 0.02,
        alignSelf: 'center',
    },
    footerTextContainer: {
        marginTop: sizes.screenHeight * 0.04,
        paddingHorizontal: sizes.screenWidth * 0.1,
        alignItems: 'center',
    },
    footerText: {
        textAlign: 'center',
        lineHeight: 20,
    },
    boldText: {
        textDecorationLine: 'underline',
    },
    agreementContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: sizes.screenWidth * 0.85,
    },
});

export default styles;
