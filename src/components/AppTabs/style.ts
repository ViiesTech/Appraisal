import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        marginTop: sizes.screenHeight * 0.02,
        padding: sizes.screenWidth * 0.01,
        backgroundColor: colors.white,
    },
    shadowVariantContainer: {
        backgroundColor: colors.white,
        borderRadius: sizes.screenWidth * 0.04,
    },
    tabsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sizes.screenHeight * 0.015,
        borderRadius: sizes.screenWidth * 0.03,
    },
    tabContainer: {
        flex: 1,
    },
    activeTab: {
        backgroundColor: colors.blueNormal,
    },
    shadowActiveTab: {
        backgroundColor: colors.white,
    },
    activeShadowCard: {
        flex: 1,
        borderRadius: sizes.screenWidth * 0.03,
        elevation: 4,
        shadowOpacity: 0.1,
    },
    inactiveTab: {
        backgroundColor: 'transparent',
    },
    tabTitle: {
        marginHorizontal: sizes.screenWidth * 0.02,
    },
    activeText: {
        color: colors.white,
    },
    shadowActiveText: {
        color: colors.blueNormal,
    },
    inactiveText: {
        color: colors.textLighter,
    }
});

export default styles;
