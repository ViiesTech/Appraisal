import { StyleSheet } from 'react-native';
import { colors, fontSize, fontFamily, sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        marginTop: sizes.screenHeight * 0.02,
        padding: sizes.screenWidth * 0.04,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: sizes.screenHeight * 0.02,
    },
    headerTitle: {
        color: colors.textDark,
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: fontSize.smallM,
        fontFamily: fontFamily.Black,
        color: colors.blueNormal,
        marginRight: sizes.screenWidth * 0.01,
    },
    listContent: {
        gap: sizes.screenWidth * 0.03,
    },
    flatList: {
        maxHeight:sizes.screenHeight * 0.53
    },
    itemContainer: {
        backgroundColor: colors.blueGrey,
        borderRadius: sizes.screenWidth * 0.04,
        padding: sizes.screenWidth * 0.04,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: sizes.screenWidth * 0.02,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: sizes.screenWidth * 0.02,
    },
    statusText: {
     
    },
    priorityBadge: {
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.003,
        borderRadius: sizes.screenWidth * 0.07,
    },
    priorityText: {
    },
    addressText: {
        marginBottom: sizes.screenHeight * 0.015,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressLabel: {
    },
    progressPercent: {
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: colors.borderLight,
        borderRadius: 3,
        marginBottom: sizes.screenHeight * 0.015,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    dueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dueText: {
        marginLeft: sizes.screenWidth * 0.015,
    },
     emptyContainer: {
        paddingVertical: sizes.screenWidth * 0.02,
        alignItems: 'center',
    }
});

export default styles;
