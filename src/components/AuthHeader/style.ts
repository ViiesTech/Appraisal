import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { sizes } from '../../utils/sizes';

const styles = StyleSheet.create({
    container: {
        width: sizes.screenWidth * 0.9,
        alignItems: 'flex-start',
    },
    backButton: {
        backgroundColor: colors.backButtonBG,
        padding: sizes.screenWidth * 0.02,
        borderRadius: sizes.screenWidth * 0.05,
    },
});

export default styles;
