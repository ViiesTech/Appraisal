import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { Wrapper, AppText, AppHeader } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

const QUICK_TIMES = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};
const ScheduleInspection = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    const date = selectedDate || '2026-01-23';
    const time = selectedTime || '11:00';
    navigation.navigate('InspectionScheduled', { date, time });
  };

  return (
    <Wrapper
      style={styles.container}
      statusBarTranslucent={true}
      statusBarHidden={true}
      barStyle="light-content"
      edges={['bottom', 'left', 'right']}
    >
      <AppHeader
        title="Schedule Inspection"
        // hideBackButton
        containerStyle={headerContainerStyle}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Select Date ── */}
        <View style={styles.fieldGroup}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.fieldLabel}
          >
            Select Date
          </AppText>
          <TouchableOpacity style={styles.inputBox} activeOpacity={0.8}>
            <TextInput
              style={styles.inputText}
              placeholder=""
              value={selectedDate}
              onChangeText={setSelectedDate}
              placeholderTextColor={colors.placeholderText}
              editable={false}
              pointerEvents="none"
            />
            <Icon name="calendar" size={18} color={colors.placeholderText} />
          </TouchableOpacity>
        </View>

        {/* ── Select Time ── */}
        <View style={styles.fieldGroup}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.fieldLabel}
          >
            Select Time
          </AppText>
          <TouchableOpacity style={styles.inputBox} activeOpacity={0.8}>
            <TextInput
              style={styles.inputText}
              placeholder=""
              value={selectedTime}
              onChangeText={setSelectedTime}
              placeholderTextColor={colors.placeholderText}
              editable={false}
              pointerEvents="none"
            />
            <Icon name="clock" size={18} color={colors.placeholderText} />
          </TouchableOpacity>
        </View>

        {/* ── Quick Time Selection ── */}
        <View style={styles.fieldGroup}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.fieldLabel}
          >
            Quick Time Selection
          </AppText>
          <View style={styles.timeGrid}>
            {QUICK_TIMES.map(time => (
              <TouchableOpacity
                key={time}
                activeOpacity={0.8}
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.timeChip,
                  selectedTime === time && styles.timeChipActive,
                ]}
              >
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={
                    selectedTime === time ? fontFamily.Bold : fontFamily.Regular
                  }
                  color={
                    selectedTime === time ? colors.blueNormal : colors.textDark
                  }
                >
                  {time}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Additional Notes ── */}
        <View style={styles.fieldGroup}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.fieldLabel}
          >
            Additional Notes (Optional)
          </AppText>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any special instructions or notes..."
            placeholderTextColor={colors.placeholderText}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* ── Confirm Button ── */}
        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.85}
          onPress={handleConfirm}
        >
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
          >
            Confirm Schedule
          </AppText>
        </TouchableOpacity>

        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={styles.noticeText}
        >
          Super Admin will be notified in real-time
        </AppText>
      </ScrollView>
    </Wrapper>
  );
};

export default ScheduleInspection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.025,
    paddingBottom: sizes.screenHeight * 0.04,
    gap: sizes.screenHeight * 0.005,
  },
  fieldGroup: {
    marginBottom: sizes.screenHeight * 0.018,
  },
  fieldLabel: {
    marginBottom: sizes.screenHeight * 0.008,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.016,
    backgroundColor: colors.white,
  },
  inputText: {
    flex: 1,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
    padding: 0,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sizes.screenWidth * 0.025,
  },
  timeChip: {
    paddingHorizontal: sizes.screenWidth * 0.055,
    paddingVertical: sizes.screenHeight * 0.012,
    borderRadius: sizes.screenWidth * 0.025,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  timeChipActive: {
    borderColor: colors.blueNormal,
    backgroundColor: '#EFF6FF',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.015,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
    color: colors.textDark,
    minHeight: sizes.screenHeight * 0.15,
  },
  confirmBtn: {
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.019,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.01,
  },
  noticeText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },
});
