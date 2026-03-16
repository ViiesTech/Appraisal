import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Wrapper, AppText, AppScrollView, AppHeader } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

const DOCUMENTS = [
  { id: '1', name: 'Property_Details.pdf', size: '1.2 MB' },
  { id: '2', name: 'Client_Requirements.pdf', size: '800 KB' },
  { id: '3', name: 'Previous_Appraisal.pdf', size: '2.1 MB' },
];

const STATUS_STEPS = ['Received', 'Scheduled', 'In Progress', 'Completed'];
const CURRENT_STATUS = 'In Progress';
const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};
const AssignmentDetails = ({ navigation }: any) => {
  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Assignment Details"
        // hideBackButton
        containerStyle={headerContainerStyle}
      />
      {/* Header */}

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── Current Status ── */}
        <View style={styles.card}>
          <View style={styles.statusHeaderRow}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
            >
              Current Status
            </AppText>
            <View style={styles.inProgressBadge}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Bold}
                color={colors.blueNormal}
              >
                In Progress
              </AppText>
            </View>
          </View>

          <View style={styles.statusGrid}>
            {STATUS_STEPS.map(step => (
              <TouchableOpacity
                key={step}
                activeOpacity={0.8}
                style={[
                  styles.statusBtn,
                  step === CURRENT_STATUS && styles.statusBtnActive,
                ]}
              >
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Bold}
                  color={
                    step === CURRENT_STATUS ? colors.white : colors.textLighter
                  }
                >
                  {step}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Property Information ── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Icon name="map-pin" size={15} color={colors.blueNormal} />
            </View>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Property Information
            </AppText>
          </View>

          <AppText
            fontSize={fontSize.small}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
          >
            Address
          </AppText>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.valueText}
          >
            1234 Oak Street, San Francisco, CA 94102
          </AppText>

          <View style={styles.twoCol}>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Property Type
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.valueText}
              >
                Single Family Home
              </AppText>
            </View>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Inspection Type
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.valueText}
              >
                Full Appraisal
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Client Information ── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Icon name="user" size={15} color={colors.blueNormal} />
            </View>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Client Information
            </AppText>
          </View>

          <AppText
            fontSize={fontSize.small}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
          >
            Client Name
          </AppText>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.valueText}
          >
            ABC Real Estate
          </AppText>

          <View style={styles.twoCol}>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Contact
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.valueText}
              >
                +1 (555) 123-4567
              </AppText>
            </View>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Email
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.valueText}
              >
                client@example.com
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Important Dates ── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Icon name="calendar" size={15} color={colors.blueNormal} />
            </View>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Important Dates
            </AppText>
          </View>

          <View style={styles.twoCol}>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Assigned Date
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
                style={styles.valueText}
              >
                Jan 20, 2026
              </AppText>
            </View>
            <View style={styles.colItem}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Deadline
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.error}
                style={styles.valueText}
              >
                Jan 25, 2026
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Downloadable Documents ── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBg}>
              <Icon name="file-text" size={15} color={colors.blueNormal} />
            </View>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.sectionTitle}
            >
              Downloadable Documents
            </AppText>
          </View>

          {DOCUMENTS.map((doc, index) => (
            <View
              key={doc.id}
              style={[
                styles.docRow,
                index < DOCUMENTS.length - 1 && styles.docRowBorder,
              ]}
            >
              <View style={styles.docIconBg}>
                <Icon name="file" size={18} color={colors.textLighter} />
              </View>
              <View style={styles.docInfo}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Bold}
                  color={colors.textDark}
                >
                  {doc.name}
                </AppText>
                <AppText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  {doc.size}
                </AppText>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.downloadBtn}>
                <Icon name="download" size={20} color={colors.blueNormal} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ── Action Buttons ── */}
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ScheduleInspection')}
        >
          <Icon name="clock" size={18} color={colors.white} />
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
            style={styles.btnText}
          >
            Schedule Inspection
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('InspectionChecklist')}
        >
          <Icon name="check-circle" size={18} color={colors.textDark} />
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.btnText}
          >
            Start Checklist
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SubmitFinalReport')}
        >
          <Icon name="file-text" size={18} color={colors.textDark} />
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.btnText}
          >
            Submit Report
          </AppText>
        </TouchableOpacity>
      </AppScrollView>
    </Wrapper>
  );
};

export default AssignmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.018,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backBtn: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.045,
    backgroundColor: colors.backButtonBG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnPlaceholder: {
    width: sizes.screenWidth * 0.09,
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
  inProgressBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.005,
    borderWidth: 1,
    borderColor: '#BFDBFE',
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
    borderRadius: sizes.screenWidth * 0.025,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.AppBG,
  },
  statusBtnActive: {
    backgroundColor: colors.blueNormal,
    borderColor: colors.blueNormal,
  },
  // ── Section Headers ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.015,
  },
  sectionIconBg: {
    width: sizes.screenWidth * 0.08,
    height: sizes.screenWidth * 0.08,
    borderRadius: sizes.screenWidth * 0.04,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizes.screenWidth * 0.025,
  },
  sectionTitle: {
    flex: 1,
  },
  // ── Values ──
  valueText: {
    marginTop: sizes.screenHeight * 0.004,
    marginBottom: sizes.screenHeight * 0.012,
  },
  twoCol: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.002,
  },
  colItem: {
    flex: 1,
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
  downloadBtn: {
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
});
