import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../utils';

export const DROPDOWN_WIDTH = sizes.screenWidth * 0.42;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.02,
    paddingBottom: sizes.screenHeight * 0.04,
    gap: sizes.screenHeight * 0.015,
  },
  // ── Card ──
  card: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    padding: sizes.screenWidth * 0.045,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  // ── Status Section ──
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.015,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.005,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.025,
  },
  statusBtn: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.013,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.025,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.AppBG,
  },
  statusBtnActive: {
    backgroundColor: colors.blueNormal,
    borderColor: colors.blueNormal,
  },
  // ── Documents ──
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.013,
    gap: sizes.screenWidth * 0.03,
  },
  docRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  docIconBg: {
    width: sizes.screenWidth * 0.1,
    height: sizes.screenWidth * 0.1,
    borderRadius: sizes.screenWidth * 0.025,
    backgroundColor: colors.AppBG,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  docInfo: {
    flex: 1,
    gap: 2,
  },
  moreBtn: {
    padding: sizes.screenWidth * 0.02,
  },
  // ── Buttons ──
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.018,
    gap: sizes.screenWidth * 0.025,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.018,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: sizes.screenWidth * 0.025,
  },
  btnText: {
    marginLeft: 2,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnHint: {
    marginTop: -8,
    marginBottom: 4,
  },
  // ── File Action Dropdown ──
  dropdown: {
    position: 'absolute',
    width: DROPDOWN_WIDTH,
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownInner: {
    borderRadius: sizes.screenWidth * 0.03,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.015,
    paddingHorizontal: sizes.screenWidth * 0.04,
    gap: sizes.screenWidth * 0.03,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: sizes.screenWidth * 0.04,
  },
  errorText: {
    marginTop: 12,
  },
});
