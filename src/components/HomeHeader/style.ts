import { StyleSheet } from 'react-native';
import { sizes } from '../../utils';

const styles = StyleSheet.create({
    container: {
        width: sizes.screenWidth,
        // height: sizes.screenHeight * 0.28,
        paddingBottom: sizes.screenHeight * 0.03,
        paddingHorizontal: sizes.screenWidth * 0.05,
        justifyContent: 'flex-start',
    },
    backgroundImage: {
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: sizes.screenWidth * 0.03,
    },
    chatBtn: {
        width: sizes.screenWidth * 0.10,
        height: sizes.screenWidth * 0.10,
        borderRadius: sizes.screenWidth * 0.05,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBtnDisabled: {
        opacity: 0.5,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 13,
    },
    logo: {
        width: sizes.screenWidth * 0.16,
        height: sizes.screenWidth * 0.16,
    },
    userImage: {
        width: sizes.screenWidth * 0.10,
        height: sizes.screenWidth * 0.10,
        borderRadius: sizes.screenWidth * 0.16,
    },
    content: {
        gap:2,
        marginTop: sizes.screenHeight * 0.02,
    },
  
    userRole: {
        textTransform: 'uppercase',
    },
});

export default styles;
