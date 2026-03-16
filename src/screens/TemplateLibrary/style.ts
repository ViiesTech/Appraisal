import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../services/utilities';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.AppBG,
    },
    scrollContent: {
        paddingHorizontal: sizes.screenWidth * 0.05,
        paddingTop: sizes.screenHeight * 0.018,
        paddingBottom: sizes.screenHeight * 0.03,
    },
    templatesContainer: {
        gap: sizes.screenHeight * 0.012,
    },
    templateCard: {
        backgroundColor: colors.white,
        borderRadius: sizes.cardRadius,
        borderWidth: 1,
        borderColor: '#E6E8EF',
        padding: sizes.screenWidth * 0.035,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    fileIconWrap: {
        width: sizes.screenWidth * 0.1,
        height: sizes.screenWidth * 0.1,
        borderRadius: sizes.screenWidth * 0.025,
        backgroundColor: '#F4F5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: sizes.screenWidth * 0.025,
    },
    templateDetailWrap: {
        flex: 1,
    },
    templateTitle: {
        lineHeight: 18,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        gap: 8,
    },
    badge: {
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 1,
    },
    fileSize: {
        marginTop: 1,
    },
    actionIconWrap: {
        padding: 4,
        marginTop: 2,
    },
    offlineCard: {
        marginTop: sizes.screenHeight * 0.014,
        backgroundColor: '#F4F5F7',
        borderWidth: 1,
        borderColor: '#E8E8EF',
        borderRadius: sizes.cardRadius,
        paddingHorizontal: sizes.screenWidth * 0.04,
        paddingVertical: sizes.screenHeight * 0.014,
    },
    offlineTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    offlineTitle: {
        marginLeft: 7,
    },
    offlineDescription: {
        lineHeight: 16,
    },
    certificateCard: {
        marginTop: sizes.screenHeight * 0.018,
        backgroundColor: colors.white,
        borderRadius: sizes.screenWidth * 0.055,
        borderWidth: 1,
        borderColor: '#ECEEF4',
        padding: sizes.screenWidth * 0.04,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    personalTitle: {
        marginBottom: sizes.screenHeight * 0.014,
    },
    personalItem: {
        borderWidth: 1,
        borderColor: '#E7E9EF',
        borderRadius: 12,
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.012,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.screenHeight * 0.01,
        backgroundColor: '#FCFCFD',
    },
    personalItemSpacing: {
        marginBottom: sizes.screenHeight * 0.014,
    },
    personalIconWrap: {
        width: sizes.screenWidth * 0.075,
        height: sizes.screenWidth * 0.075,
        borderRadius: 8,
        backgroundColor: '#F3F4FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: sizes.screenWidth * 0.03,
    },
    personalDetailWrap: {
        flex: 1,
    },
    removeIconWrap: {
        padding: 3,
    },
    securityCard: {
        borderRadius: 12,
        backgroundColor: '#F4F6FA',
        borderWidth: 1,
        borderColor: '#E4E8F2',
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.013,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    securityTextWrap: {
        flex: 1,
        marginLeft: sizes.screenWidth * 0.025,
    },
});

export default styles;
