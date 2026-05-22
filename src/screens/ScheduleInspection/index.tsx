import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ViewStyle,
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Wrapper, AppText, AppHeader } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';

import moment from 'moment';
import { useScheduleInspectionMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { ActivityIndicator } from 'react-native';

const QUICK_TIMES = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

const formatDateLabel = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

const formatTimeLabel = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

const buildTimeFromLabel = (timeLabel: string) => {
  const [time, meridiem] = timeLabel.split(' ');
  const [rawHours, rawMinutes] = time.split(':').map(Number);
  const nextDate = new Date();
  let hours = rawHours % 12;

  if (meridiem === 'PM') {
    hours += 12;
  }

  nextDate.setHours(hours, rawMinutes, 0, 0);

  return nextDate;
};

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};
const ScheduleInspection = ({ navigation, route }: any) => {
  const { orderId } = route.params ?? {};
  const [scheduleInspection, { isLoading }] = useScheduleInspectionMutation();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDateValue, setTempDateValue] = useState(new Date());
  const [tempTimeValue, setTempTimeValue] = useState(new Date());
  const scrollViewRef = useRef<ScrollView>(null);

  const handleConfirm = async () => {
    if (!selectedDate) {
      showToast('error', 'Validation Error', 'Please select a date');
      return;
    }
    if (!selectedTime) {
      showToast('error', 'Validation Error', 'Please select a time');
      return;
    }
    if (!notes.trim()) {
      showToast('error', 'Validation Error', 'Please add schedule notes');
      return;
    }

    try {
      // Combine date and time using moment
      const scheduledAt = moment(dateValue)
        .set({
          hour: timeValue.getHours(),
          minute: timeValue.getMinutes(),
          second: 0,
          millisecond: 0,
        })
        .toISOString();

      const payload = {
        orderId,
        scheduledAt,
        scheduleNotes: notes,
      };
      console.log('Scheduling Inspection with payload:', payload);

      const result = await scheduleInspection(payload).unwrap();

      console.log('Schedule Inspection Result:', result);

      if (result.success) {
        showToast(
          'success',
          'Success',
          result.message || 'Inspection scheduled successfully',
        );
        navigation.navigate('InspectionScheduled', {
          date: selectedDate,
          time: selectedTime,
        });
      }
    } catch (error: any) {
      showToast(
        'error',
        'Error',
        error?.data?.message || 'Failed to schedule inspection',
      );
    }
  };

  const handleSelectDate = (_event: DateTimePickerEvent, pickedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (!pickedDate) return;
    if (Platform.OS === 'android') {
      setDateValue(pickedDate);
      setSelectedDate(formatDateLabel(pickedDate));
    } else {
      setTempDateValue(pickedDate);
    }
  };

  const confirmIOSDate = () => {
    setDateValue(tempDateValue);
    setSelectedDate(formatDateLabel(tempDateValue));
    setShowDatePicker(false);
  };

  const handleSelectTime = (_event: DateTimePickerEvent, pickedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (!pickedTime) return;
    if (Platform.OS === 'android') {
      setTimeValue(pickedTime);
      setSelectedTime(formatTimeLabel(pickedTime));
    } else {
      setTempTimeValue(pickedTime);
    }
  };

  const confirmIOSTime = () => {
    setTimeValue(tempTimeValue);
    setSelectedTime(formatTimeLabel(tempTimeValue));
    setShowTimePicker(false);
  };

  const handleQuickTimeSelect = (timeLabel: string) => {
    const nextTime = buildTimeFromLabel(timeLabel);
    setTimeValue(nextTime);
    setSelectedTime(formatTimeLabel(nextTime));
  };

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Schedule Inspection"
        // hideBackButton
        containerStyle={headerContainerStyle}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
      <ScrollView
        ref={scrollViewRef}
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
            Select Date *
          </AppText>
          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.8}
            onPress={() => {
              setTempDateValue(dateValue);
              setShowDatePicker(true);
            }}
          >
            <TextInput
              style={styles.inputText}
              placeholder="Choose a date"
              value={selectedDate}
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
            Select Time *
          </AppText>
          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.8}
            onPress={() => {
              setTempTimeValue(timeValue);
              setShowTimePicker(true);
            }}
          >
            <TextInput
              style={styles.inputText}
              placeholder="Choose a time"
              value={selectedTime}
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
                onPress={() => handleQuickTimeSelect(time)}
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
            Additional Notes *
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
            onFocus={() =>
              setTimeout(
                () => scrollViewRef.current?.scrollToEnd({ animated: true }),
                150,
              )
            }
          />
        </View>

        {/* ── Confirm Button ── */}
        <TouchableOpacity
          style={[styles.confirmBtn, isLoading && { opacity: 0.7 }]}
          activeOpacity={0.85}
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.white}
            >
              Confirm Schedule
            </AppText>
          )}
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
      </KeyboardAvoidingView>

      {/* ── Date Picker ── */}
      {Platform.OS === 'ios' ? (
        <Modal
          visible={showDatePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <Pressable
            style={styles.pickerOverlay}
            onPress={() => setShowDatePicker(false)}
          />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerToolbar}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSDate}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Bold}
                  color={colors.blueNormal}
                >
                  Done
                </AppText>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDateValue}
              mode="date"
              display="spinner"
              themeVariant='light'
              minimumDate={new Date()}
              onChange={handleSelectDate}
              style={styles.iosPicker}
            />
          </View>
        </Modal>
      ) : showDatePicker ? (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleSelectDate}
        />
      ) : null}

      {/* ── Time Picker ── */}
      {Platform.OS === 'ios' ? (
        <Modal
          visible={showTimePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <Pressable
            style={styles.pickerOverlay}
            onPress={() => setShowTimePicker(false)}
          />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerToolbar}>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Regular}
                  color={colors.textLighter}
                >
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSTime}>
                <AppText
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Bold}
                  color={colors.blueNormal}
                >
                  Done
                </AppText>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempTimeValue}
              mode="time"
              themeVariant="light"
              display="spinner"
              onChange={handleSelectTime}
              style={styles.iosPicker}
            />
          </View>
        </Modal>
      ) : showTimePicker ? (
        <DateTimePicker
          value={timeValue}
          mode="time"
          display="default"
          themeVariant="light"
          onChange={handleSelectTime}
        />
      ) : null}
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  pickerSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.screenWidth * 0.05,
    borderTopRightRadius: sizes.screenWidth * 0.05,
    paddingBottom: sizes.screenHeight * 0.03,
  },
  pickerToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingVertical: sizes.screenHeight * 0.016,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  iosPicker: {
    width: '100%',
  },
});
