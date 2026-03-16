import { StyleSheet } from 'react-native';
import { sizes, colors } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        width: sizes.screenWidth,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        paddingHorizontal: sizes.screenWidth * 0.05,
        paddingTop: sizes.screenHeight * 0.02,
        paddingBottom: sizes.screenHeight * 0.015,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.screenHeight * 0.02,
    },
    backBtn: {
        marginRight: sizes.screenWidth * 0.04,
    },
    backBtnBackground: {
        backgroundColor: colors.white,
        width: sizes.screenWidth * 0.11,
        height: sizes.screenWidth * 0.11,
        borderRadius: sizes.screenWidth * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
    },
    description: {
        marginTop: 2,
    },
    tabsContainer: {
        marginBottom: sizes.screenHeight * 0.015,
    },
    searchContainer: {
        marginBottom: sizes.screenHeight * 0.01,
    },
    searchInput: {
        width: '100%',
    },
});

export default styles;
