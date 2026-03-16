import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.AppBG,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.black,
    }
});

export default styles;
