import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    templateCard: {
        marginTop: sizes.screenHeight * 0.01,
        padding: sizes.screenWidth * 0.04,
    },
    templateCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    templateIconContainer: {
        width: sizes.screenWidth * 0.12,
        height: sizes.screenWidth * 0.12,
        borderRadius: sizes.screenWidth * 0.03,
        backgroundColor: colors.blueGrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: sizes.screenWidth * 0.04,
    },
    templateText: {
        flex: 1,
    }
});

export default styles;
