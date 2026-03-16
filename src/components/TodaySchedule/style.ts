import { StyleSheet } from 'react-native';
import { colors, fontSize, fontFamily, sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        marginTop: sizes.screenHeight * 0.02,
        padding: sizes.screenWidth * 0.04,
        // backgroundColor:'red'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: sizes.screenHeight * 0.02,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: sizes.screenWidth * 0.02,
    },
    viewAll: {
    },
    listContent: {
        gap:sizes.screenWidth * 0.03
    },
    flatList: {
        maxHeight: sizes.screenHeight * 0.2,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blueGrey,
        borderRadius: sizes.screenWidth * 0.04,
        padding: sizes.screenWidth * 0.03,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    timeBox: {
        backgroundColor: colors.blueNormal,
        borderRadius: sizes.screenWidth * 0.04,
        paddingVertical: sizes.screenHeight * 0.01,
        width:sizes.screenWidth * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: sizes.screenWidth * 0.22,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: sizes.screenWidth * 0.03,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.screenWidth * 0.01,
    },
    addressText: {
        marginLeft: sizes.screenWidth * 0.015,
        flex: 1,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeContainer: {
        paddingHorizontal: sizes.screenWidth * 0.02,
        paddingVertical: sizes.screenHeight * 0.002,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.textLighter,
        marginHorizontal: sizes.screenWidth * 0.02,
    },
    emptyContainer: {
        paddingVertical: sizes.screenWidth * 0.02,
        alignItems: 'center',
    }
});

export default styles;
