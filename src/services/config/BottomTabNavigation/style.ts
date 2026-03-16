import { StyleSheet } from 'react-native';
import { colors } from '../../utilities/colors';
import { sizes } from '../../utilities/sizes';
import { fontSize, fontFamily } from '../../utilities/fonts';

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: sizes.screenHeight * 0.11,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        paddingBottom: sizes.screenWidth * 0.03,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activePill: {
        backgroundColor: colors.tabBarFocused,
        width: sizes.screenWidth * 0.2,
        paddingVertical: sizes.screenWidth * 0.03,
        borderRadius: sizes.screenWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactiveContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.Bold,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginTop: 2,
    },
});

export default styles;
