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
        marginTop: sizes.screenHeight * 0.05,
    },
    description: {
        textAlign: 'center',
        lineHeight: 22,
        width: sizes.screenWidth * 0.9,
    },
    form: {
        marginTop: sizes.screenHeight * 0.07,
    },
    footer: {
        alignItems: 'center',
        marginBottom: sizes.screenWidth * 0.01,
    },
    resetButton: {
    },
});

export default styles;
