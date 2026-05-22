import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { sizes } from '../../utils/sizes';
import { fontSize, fontFamily } from '../../utils/fonts';

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: sizes.screenWidth * 0.03,
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
