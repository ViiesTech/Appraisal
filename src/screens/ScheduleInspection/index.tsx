import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Wrapper, AppText, AppHeader } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';

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
const ScheduleInspection = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleConfirm = () => {
    const date = selectedDate || formatDateLabel(dateValue);
    const time = selectedTime || formatTimeLabel(timeValue);
    navigation.navigate('InspectionScheduled', { date, time });
  };

  const handleSelectDate = (
    _event: DateTimePickerEvent,
    pickedDate?: Date,
  ) => {
    setShowDatePicker(false);

    if (!pickedDate) {
      return;
    }

    setDateValue(pickedDate);
    setSelectedDate(formatDateLabel(pickedDate));
  };

  const handleSelectTime = (
    _event: DateTimePickerEvent,
    pickedTime?: Date,
  ) => {
    setShowTimePicker(false);

    if (!pickedTime) {
      return;
    }

    setTimeValue(pickedTime);
    setSelectedTime(formatTimeLabel(pickedTime));
  };

  const handleQuickTimeSelect = (timeLabel: string) => {
    const nextTime = buildTimeFromLabel(timeLabel);
    setTimeValue(nextTime);
    setSelectedTime(formatTimeLabel(nextTime));
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
          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <TextInput
              style={styles.inputText}
              placeholder="Choose a date"
              value={selectedDate}
              placeholderTextColor={colors.placeholderText}
              editable={false}
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
          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.8}
            onPress={() => setShowTimePicker(true)}
          >
            <TextInput
              style={styles.inputText}
              placeholder="Choose a time"
              value={selectedTime}
              placeholderTextColor={colors.placeholderText}
              editable={false}
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

      {showDatePicker ? (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleSelectDate}
        />
      ) : null}

      {showTimePicker ? (
        <DateTimePicker
          value={timeValue}
          mode="time"
          display="default"
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
