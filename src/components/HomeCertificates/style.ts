import { StyleSheet } from 'react-native';
import { colors, fontSize, fontFamily, sizes } from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainCard: {
        padding: sizes.screenWidth * 0.05,
        marginTop: sizes.screenHeight * 0.02,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.screenHeight * 0.025,
    },
    uploadContainer: {
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: sizes.cardRadius,
        padding: sizes.screenHeight * 0.04,
        alignItems: 'center',
        marginBottom: sizes.screenHeight * 0.02,
    },
    uploadIconCircle: {
        width: sizes.screenWidth * 0.15,
        height: sizes.screenWidth * 0.15,
        borderRadius: (sizes.screenWidth * 0.15) / 2,
        backgroundColor: colors.uploadIconBG,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: sizes.screenHeight * 0.015,
    },
    uploadTitle: {
    },
    uploadSubtitle: {
        marginVertical: sizes.screenHeight * 0.01,
    },
    chooseFileBtn: {
        backgroundColor: colors.blueNormal,
        paddingHorizontal: sizes.screenWidth * 0.08,
        paddingVertical: sizes.screenHeight * 0.012,
        borderRadius: sizes.screenWidth * 0.06,
    },
    chooseFileText: {
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: colors.blueGrey,
        borderRadius: sizes.cardRadius,
        padding: sizes.screenWidth * 0.04,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.blueLight
    },
    infoTextContainer: {
        flex: 1,
        marginLeft: sizes.screenWidth * 0.03,
    },
    infoTitle: {
        marginBottom: 2,
    },
    infoDesc: {
        lineHeight: 18,
    },
    listHeader: {
        marginBottom: sizes.screenHeight * 0.015,
    },
    listHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: sizes.screenHeight * 0.015,
    },
    certItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: sizes.screenWidth * 0.04,
        borderRadius: sizes.cardRadius,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    certIconContainer: {
        width: sizes.screenWidth * 0.12,
        height: sizes.screenWidth * 0.12,
        borderRadius: sizes.cardRadius,
        backgroundColor: colors.certIconBG,
        justifyContent: 'center',
        alignItems: 'center',
    },
    certDetails: {
        flex: 1,
        marginLeft: sizes.screenWidth * 0.03,
    },
    certName: {
    },
    certMeta: {
        marginTop: 2,
    },
    removeBtn: {
        padding: 5,
    },
    emptyContainer: {
        paddingVertical: sizes.screenWidth * 0.05,
        alignItems: 'center',
    },
    listContent: {
        gap: sizes.screenWidth * 0.03
    },
    stagedContainer: {
        marginBottom: sizes.screenHeight * 0.02,
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: sizes.cardRadius,
        padding: sizes.screenWidth * 0.04,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blueNormal,
        paddingVertical: sizes.screenHeight * 0.014,
        borderRadius: sizes.screenWidth * 0.06,
        marginTop: sizes.screenHeight * 0.015,
    },
    uploadBtnDisabled: {
        opacity: 0.6,
    },
});

export default styles;
