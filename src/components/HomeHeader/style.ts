import { StyleSheet } from 'react-native';
import { sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        width: sizes.screenWidth,
        height: sizes.screenHeight * 0.25,
        paddingHorizontal: sizes.screenWidth * 0.02,
        justifyContent: 'center',
    },
    backgroundImage: {
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: sizes.screenWidth * 0.16,
        height: sizes.screenWidth * 0.16,
    },
    userImage: {
        width: sizes.screenWidth * 0.16,
        height: sizes.screenWidth * 0.16,
        borderRadius:sizes.screenWidth * 0.16,
    },
    content: {
        marginTop: sizes.screenHeight * 0.02,
        paddingHorizontal: sizes.screenWidth * 0.03,
    },
    userName: {
       marginTop: sizes.screenWidth * 0.01,
    },
    userRole: {
        marginTop: sizes.screenWidth * 0.01,
    },
});

export default styles;
