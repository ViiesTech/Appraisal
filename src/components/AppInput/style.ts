import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities/sizes';

const styles = StyleSheet.create({
    container: {
        marginBottom: sizes.screenHeight * 0.01,
    },
    halfWidth: {
        width: sizes.screenWidth * 0.43,
    },
    fullWidth: {
        width: sizes.screenWidth * 0.9,
    },
    label: {
        marginBottom: sizes.screenWidth * 0.02,
    },
    inputContainer: {
        height: sizes.screenHeight * 0.06,
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: sizes.screenWidth * 0.03,
        paddingHorizontal: sizes.screenWidth * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    input: {
        flex: 1,
        color: colors.textDark,
        fontSize: 14,
        padding: 0,
        height: sizes.screenHeight * 0.05,
        paddingHorizontal: sizes.screenWidth * 0.02,
    },
    leftIconContainer: {
        marginRight: sizes.screenWidth * 0.02,
    },
    rightIconContainer: {
        marginLeft: sizes.screenWidth * 0.02,
    },
    errorInput: {
        borderColor: colors.error,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: sizes.screenHeight * 0.01,
        marginLeft: sizes.screenWidth * 0.02,
    },
    errorText: {
        marginLeft: sizes.screenWidth * 0.02,
    },
});

export default styles;
