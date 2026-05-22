import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../utils';

const SCREEN_W = Dimensions.get('window').width;
const SCREEN_H = Dimensions.get('window').height;

export const chatStyles = StyleSheet.create({
  // ── Screen ──
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  flex: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.014,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E6EB',
    gap: sizes.screenWidth * 0.03,
  },
  backBtn: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.025,
    backgroundColor: colors.AppBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatar: {
    position: 'relative',
  },
  headerAvatarImg: {
    width: sizes.screenWidth * 0.1,
    height: sizes.screenWidth * 0.1,
    borderRadius: sizes.screenWidth * 0.05,
  },
  headerAvatarFallback: {
    width: sizes.screenWidth * 0.1,
    height: sizes.screenWidth * 0.1,
    borderRadius: sizes.screenWidth * 0.05,
    backgroundColor: colors.blueNormal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOnlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: sizes.screenWidth * 0.028,
    height: sizes.screenWidth * 0.028,
    borderRadius: sizes.screenWidth * 0.014,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: colors.white,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  headerAction: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Messages list ──
  messagesList: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.016,
    gap: sizes.screenHeight * 0.008,
  },
  emptyWrap: {
    paddingTop: sizes.screenHeight * 0.1,
    alignItems: 'center',
  },
  loadingMoreWrap: {
    paddingVertical: sizes.screenHeight * 0.015,
    alignItems: 'center',
  },

  // ── Bubble ──
  bubbleRow: {
    flexDirection: 'row',
    marginVertical: sizes.screenHeight * 0.004,
  },
  bubbleRowOwn: {
    justifyContent: 'flex-end',
  },
  bubbleRowOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: sizes.screenWidth * 0.72,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenWidth * 0.045,
    gap: sizes.screenHeight * 0.004,
  },
  bubbleOwn: {
    backgroundColor: colors.blueNormal,
    borderBottomRightRadius: sizes.screenWidth * 0.01,
  },
  bubbleOther: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: sizes.screenWidth * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  bubbleOptimistic: {
    opacity: 0.7,
  },
  bubbleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bubbleTextRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  bubbleTextContent: {
    flex: 1,
    flexShrink: 1,
  },
  bubbleMetaInline: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 4,
  },

  // ── Image grid ──
  bubbleImages: {
    marginBottom: 4,
    borderRadius: sizes.screenWidth * 0.025,
    overflow: 'hidden',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridOverlayText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700' as const,
  },

  // ── Image preview modal ──
  previewOverlay: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewPage: {
    width: SCREEN_W,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: SCREEN_W,
    height: SCREEN_H * 0.85,
  },
  previewClose: {
    position: 'absolute',
    top: 48,
    right: 20,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },

  // ── Typing indicator ──
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: sizes.screenWidth * 0.045,
    paddingVertical: sizes.screenHeight * 0.014,
    borderRadius: sizes.screenWidth * 0.045,
    borderBottomLeftRadius: sizes.screenWidth * 0.01,
    gap: sizes.screenWidth * 0.018,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: sizes.screenHeight * 0.008,
  },
  typingDot: {
    width: sizes.screenWidth * 0.022,
    height: sizes.screenWidth * 0.022,
    borderRadius: sizes.screenWidth * 0.011,
    backgroundColor: colors.placeholderText,
    opacity: 0.5,
  },
  typingDotMid: {
    opacity: 0.75,
  },

  // ── Input bar ──
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.012,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E6EB',
    gap: sizes.screenWidth * 0.025,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.AppBG,
    borderRadius: sizes.screenWidth * 0.06,
    borderWidth: 1,
    borderColor: '#E5E6EB',
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.008,
    minHeight: sizes.screenHeight * 0.052,
    gap: sizes.screenWidth * 0.02,
  },
  attachBtn: {
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
    maxHeight: sizes.screenHeight * 0.13,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendBtn: {
    width: sizes.screenWidth * 0.11,
    height: sizes.screenWidth * 0.11,
    borderRadius: sizes.screenWidth * 0.06,
    backgroundColor: colors.blueNormal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.placeholderText,
  },

  // ── Attachment preview strip ──
  attachPreviewStrip: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E6EB',
    maxHeight: sizes.screenWidth * 0.27,
  },
  attachPreviewContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.008,
    gap: sizes.screenWidth * 0.025,
    flexDirection: 'row',
  },
  attachThumbWrap: {
    width: sizes.screenWidth * 0.22,
    height: sizes.screenWidth * 0.22,
    borderRadius: sizes.screenWidth * 0.03,
    overflow: 'hidden',
  },
  attachThumb: {
    width: '100%',
    height: '100%',
  },
  attachRemoveBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Document card (inside bubble) ──
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
    borderWidth: 1,
  },
  docCardOwn: {
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  docCardOther: {
    borderColor: '#E5E6EB',
    backgroundColor: '#F5F6FA',
  },
  docCardInfo: {
    flex: 1,
  },

  // ── Pending doc thumbnail ──
  attachDocThumb: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  attachDocName: {
    textAlign: 'center',
    marginTop: 2,
  },
});
