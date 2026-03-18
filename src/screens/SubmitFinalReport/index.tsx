import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
  ScreenFooterActions,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import type { ViewStyle } from 'react-native';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const SubmitFinalReport = () => {
  const [notes, setNotes] = useState('');
  const [reportFileName, setReportFileName] = useState(
    'Upload your report file',
  );
  const [reportFileMeta, setReportFileMeta] = useState(
    'PDF, DOC, or DOCX (Max 10MB)',
  );
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

  const formatBytes = (size?: number | null) => {
    if (!size) {
      return 'Unknown size';
    }
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const handlePickReport = async () => {
    try {
      const [file] = await pick({
        type: [types.pdf, types.doc, types.docx],
        mode: 'open',
      });

      if (file) {
        setReportFileName(file.name || 'Report file selected');
        setReportFileMeta(formatBytes(file.size));
      }
    } catch (error) {
      if (
        isErrorWithCode(error) &&
        error.code === errorCodes.OPERATION_CANCELED
      ) {
        return;
      }
      Alert.alert('Document Picker', 'Unable to pick report file');
    }
  };

  const handlePickImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert(
          'Image Picker',
          result.errorMessage || 'Unable to pick images',
        );
        return;
      }

      const count = result.assets?.length || 0;
      setSelectedImagesCount(count);
    } catch {
      Alert.alert(
        'Image Picker',
        'Something went wrong while selecting images',
      );
    }
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
        title="Submit Final Report"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.headerExtraContainer}>
            <View style={styles.propertyCard}>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.blueNormal}
              >
                Property
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.textDark}
                style={styles.propertyValue}
              >
                3456 Elm Street, Sacramento
              </AppText>
            </View>
          </View>
        }
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Upload Report (PDF/DOC) *
          </AppText>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadLargeBox}
            onPress={handlePickReport}
          >
            <Icon name="upload" size={30} color={colors.placeholderText} />
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={styles.uploadLabel}
              numberOfLines={1}
            >
              {reportFileName}
            </AppText>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.placeholderText}
            >
              {reportFileMeta}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Attach Images (Optional)
          </AppText>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadImageBtn}
            onPress={handlePickImages}
          >
            <Icon name="image" size={16} color={colors.placeholderText} />
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={styles.imageBtnText}
            >
              {selectedImagesCount > 0
                ? `${selectedImagesCount} image${
                    selectedImagesCount > 1 ? 's' : ''
                  } selected`
                : 'Upload Images'}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textDark}
            style={styles.sectionTitle}
          >
            Notes for Admin (Optional)
          </AppText>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            style={styles.notesInput}
            placeholder="Add any notes or comments for the admin"
            placeholderTextColor={colors.placeholderText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </AppScrollView>

      <ScreenFooterActions
        primaryLabel="Submit Final Report"
        containerStyle={styles.footer}
        primaryButtonStyle={styles.submitBtn}
        helperText="Please ensure all information is accurate before submitting"
        helperTextStyle={styles.footerHint}
      />
    </Wrapper>
  );
};

export default SubmitFinalReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  headerExtraContainer: {
    marginTop: sizes.screenHeight * 0.012,
  },
  propertyCard: {
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.012,
  },
  propertyValue: {
    marginTop: sizes.screenHeight * 0.004,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.015,
    paddingBottom: sizes.screenHeight * 0.02,
    gap: sizes.screenHeight * 0.018,
  },
  sectionCard: {
    backgroundColor: '#F7F7F9',
    borderRadius: sizes.screenWidth * 0.035,
    paddingHorizontal: sizes.screenWidth * 0.035,
    paddingVertical: sizes.screenHeight * 0.018,
  },
  sectionTitle: {
    marginBottom: sizes.screenHeight * 0.012,
  },
  uploadLargeBox: {
    borderWidth: 1.5,
    borderColor: '#C7CDD8',
    borderRadius: sizes.screenWidth * 0.035,
    minHeight: sizes.screenHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  uploadLabel: {
    marginTop: sizes.screenHeight * 0.01,
    marginBottom: sizes.screenHeight * 0.004,
  },
  uploadImageBtn: {
    borderWidth: 1.5,
    borderColor: '#C7CDD8',
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.055,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageBtnText: {
    marginLeft: sizes.screenWidth * 0.02,
  },
  notesInput: {
    borderWidth: 1.5,
    borderColor: '#C7CDD8',
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.11,
    backgroundColor: colors.white,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.014,
    color: colors.textDark,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.smallM,
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.01,
    paddingBottom: sizes.screenHeight * 0.02,
    borderTopWidth: 1,
    borderTopColor: '#E6E8EF',
  },
  submitBtn: {
    backgroundColor: colors.blueNormal,
    minHeight: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerHint: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.012,
  },
});
