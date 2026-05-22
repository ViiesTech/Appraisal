import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  Modal,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Wrapper,
  AppText,
  AppScrollView,
  AppHeader,
  SectionHeader,
  InfoRow,
  TwoColRow,
} from '../../components';
import {
  colors,
  fontFamily,
  fontSize,
  sizes,
  getFilename,
  saveImageToGallery,
  STATUS_STEPS,
  getStatusBadge,
} from '../../utils';
import { downloadDocument } from '../../utils/fileUtils';
import Icon from 'react-native-vector-icons/Feather';
import ImageViewing from 'react-native-image-viewing';
import moment from 'moment';
import {
  useGetOrderByIdQuery,
  useCompleteInspectionMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { FileItem } from '../../types';

// ── Components & Styles ──
import { AssignmentDetailsSkeleton } from './components';
import styles, { DROPDOWN_WIDTH } from './style';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

const AssignmentDetails = ({ navigation, route }: any) => {
  const { orderId } = route.params ?? {};

  const { data, isLoading, isError } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });
  const order = data?.order;

  const [completeInspection, { isLoading: isCompleting }] =
    useCompleteInspectionMutation();

  const handleCompleteInspection = async () => {
    try {
      await completeInspection(orderId).unwrap();
      showToast('success', 'Inspection marked as completed');
      navigation.goBack();
    } catch (err: any) {
      showToast('error', err?.data?.message ?? 'Failed to complete inspection');
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [imageViewIndex, setImageViewIndex] = useState(0);
  const moreBtnRefs = useRef<Record<string, View | null>>({});

  const imageUrls = (order?.images ?? []).map((uri: string) => ({ uri }));

  const files: FileItem[] = [
    ...(order?.images ?? []).map((url: string) => ({
      url,
      type: 'image' as const,
      name: getFilename(url),
    })),
    ...(order?.documents ?? []).map((url: string) => ({
      url,
      type: 'document' as const,
      name: getFilename(url),
    })),
  ];

  const openMenu = (file: FileItem) => {
    const ref = moreBtnRefs.current[file.url];
    ref?.measureInWindow((x, y, w, h) => {
      const horizontalInset = sizes.screenWidth * 0.04;
      const left = Math.max(
        horizontalInset,
        Math.min(
          x + w - DROPDOWN_WIDTH,
          sizes.screenWidth - DROPDOWN_WIDTH - horizontalInset,
        ),
      );

      // On Android, measureInWindow can include the status bar height even in immersive mode,
      // leading to a large gap. We use a larger negative offset to bring it up.
      const yOffset = Platform.OS === 'android' ? 52 : 18;

      setMenuPos({ x: left, y: y + h - yOffset });
      setSelectedFile(file);
      setMenuVisible(true);
    });
  };

  const handleView = () => {
    if (!selectedFile) return;
    setMenuVisible(false);
    setTimeout(() => {
      if (selectedFile.type === 'image') {
        const idx = (order?.images ?? []).indexOf(selectedFile.url);
        setImageViewIndex(Math.max(0, idx));
        setImageViewVisible(true);
      } else {
        navigation.navigate('DocumentViewer', {
          url: selectedFile.url,
          title: selectedFile.name,
        });
      }
    }, 300);
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    setMenuVisible(false);
    if (selectedFile.type === 'image') {
      saveImageToGallery(selectedFile);
    } else {
      downloadDocument(selectedFile.url, selectedFile.name);
    }
  };

  if (isLoading) {
    return (
      <Wrapper
        style={styles.container}
      >
        <AppHeader
          title="Assignment Details"
          containerStyle={headerContainerStyle}
        />
        <AppScrollView contentContainerStyle={styles.scrollContent}>
          <AssignmentDetailsSkeleton />
        </AppScrollView>
      </Wrapper>
    );
  }

  if (isError || !order) {
    return (
      <Wrapper
        style={styles.container}

      >
        <AppHeader
          title="Assignment Details"
          containerStyle={headerContainerStyle}
        />
        <View style={styles.loaderContainer}>
          <Icon name="alert-circle" size={40} color={colors.textLighter} />
          <AppText
            fontSize={fontSize.h6}
            fontFamily={fontFamily.Bold}
            color={colors.textLighter}
            style={styles.errorText}
          >
            Failed to load order
          </AppText>
        </View>
      </Wrapper>
    );
  }

  const statusBadge = getStatusBadge(order.status);

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Assignment Details"
        containerStyle={headerContainerStyle}
      />

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
            <View
              style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}
            >
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Bold}
                color={statusBadge.color}
              >
                {statusBadge.label}
              </AppText>
            </View>
          </View>

          <View style={styles.statusGrid}>
            {STATUS_STEPS.map((step: any) => {
              const isActive = step.key === order.status;
              console.log('Step', step.key);
              return (
                <View
                  key={step.key}
                  style={[styles.statusBtn, isActive && styles.statusBtnActive]}
                >
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Bold}
                    color={isActive ? colors.white : colors.textLighter}
                    align="center"
                    numberOfLines={2}
                  >
                    {step.label}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Property Information ── */}
        <View style={styles.card}>
          <SectionHeader icon="map-pin" title="Property Information" />
          <InfoRow label="Address" value={order.property?.address} />
          <TwoColRow
            left={{ label: 'Property Type', value: order.property?.type }}
            right={{ label: 'Form No#', value: order.property?.form }}
          />
        </View>

        {/* ── Client Information ── */}
        <View style={styles.card}>
          <SectionHeader icon="user" title="Client Information" />
          <InfoRow label="Client Name" value={order.client?.name} />
          <TwoColRow
            left={{ label: 'Contact', value: order.client?.phone }}
            right={{ label: 'Email', value: order.client?.email }}
          />
        </View>

        {/* ── Important Dates ── */}
        <View style={styles.card}>
          <SectionHeader icon="calendar" title="Important Dates" />
          <TwoColRow
            left={{
              label: 'Assigned Date',
              value: order.timeline?.assignedAt
                ? moment(order.timeline.assignedAt).format('MMM D, YYYY')
                : null,
            }}
            right={{
              label: 'Deadline',
              value: order.deadline
                ? moment.utc(order.deadline).format('MMM D, YYYY')
                : null,
              valueColor: order.deadline ? colors.error : undefined,
            }}
          />
          {!!order.timeline?.scheduledAt && (
            <InfoRow
              label="Scheduled"
              value={moment(order.timeline.scheduledAt).format(
                'MMM D, YYYY h:mm A',
              )}
            />
          )}
        </View>

        {/* ── Files & Documents ── */}
        {files.length > 0 && (
          <View style={styles.card}>
            <SectionHeader icon="file-text" title="Files & Documents" />
            {files.map((file, index) => (
              <View
                key={file.url}
                style={[
                  styles.docRow,
                  index < files.length - 1 && styles.docRowBorder,
                ]}
              >
                <View style={styles.docIconBg}>
                  <Icon
                    name={file.type === 'image' ? 'image' : 'file'}
                    size={18}
                    color={colors.textLighter}
                  />
                </View>
                <View style={styles.docInfo}>
                  <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Bold}
                    color={colors.textDark}
                    numberOfLines={1}
                  >
                    {file.name}
                  </AppText>
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                  >
                    {file.type === 'image' ? 'Image' : 'Document'}
                  </AppText>
                </View>
                <View
                  ref={r => {
                    moreBtnRefs.current[file.url] = r;
                  }}
                  collapsable={false}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.moreBtn}
                    onPress={() => openMenu(file)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Icon
                      name="more-vertical"
                      size={20}
                      color={colors.textLighter}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── Action Buttons ── */}
        {(() => {
          const status = order.status?.toLowerCase();

          if (status === 'underreview') {
            return (
              <TouchableOpacity
                style={styles.btnOutline}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('InspectionChecklist', {
                    orderId,
                    address: order.property?.address,
                  })
                }
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
            );
          }

          if (status === 'assigned') {
            return (
              <>
                <TouchableOpacity
                  style={styles.btnPrimary}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('ScheduleInspection', { orderId })
                  }
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
                  onPress={() =>
                    navigation.navigate('InspectionChecklist', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
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
              </>
            );
          }

          if (status === 'scheduled') {
            const scheduledAt = order.timeline?.scheduledAt;
            const inspectionStarted = scheduledAt
              ? moment().isAfter(moment(scheduledAt))
              : false;
            return (
              <>
                <TouchableOpacity
                  style={[
                    styles.btnPrimary,
                    !inspectionStarted && styles.btnDisabled,
                  ]}
                  activeOpacity={0.85}
                  disabled={isCompleting || !inspectionStarted}
                  onPress={handleCompleteInspection}
                >
                  <Icon name="check-square" size={18} color={colors.white} />
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                    style={styles.btnText}
                  >
                    {isCompleting
                      ? 'Completing...'
                      : 'Mark Inspection As Completed'}
                  </AppText>
                </TouchableOpacity>
                {!inspectionStarted && scheduledAt && (
                  <AppText
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.Regular}
                    color={colors.textLighter}
                    align="center"
                    style={styles.btnHint}
                  >
                    Available after{' '}
                    {moment(scheduledAt).format('MMM D, YYYY h:mm A')}
                  </AppText>
                )}
                <TouchableOpacity
                  style={styles.btnOutline}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('InspectionChecklist', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
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
              </>
            );
          }

          if (
            status === 'final_report_in_progress' ||
            status === 'finalreportinprogress'
          ) {
            return (
              <>
                <TouchableOpacity
                  style={styles.btnOutline}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('InspectionChecklist', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
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
                  style={styles.btnPrimary}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('SubmitFinalReport', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
                >
                  <Icon name="file-text" size={18} color={colors.white} />
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                    style={styles.btnText}
                  >
                    Submit Report
                  </AppText>
                </TouchableOpacity>
              </>
            );
          }

          if (status === 'overdue') {
            const scheduledAt = order.timeline?.scheduledAt;
            const inspectionCompletedAt = order.timeline?.inspectionCompletedAt;

            // Never scheduled → Schedule Inspection + Start Checklist
            if (!scheduledAt) {
              return (
                <>
                  <TouchableOpacity
                    style={styles.btnPrimary}
                    activeOpacity={0.85}
                    onPress={() =>
                      navigation.navigate('ScheduleInspection', { orderId })
                    }
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
                    onPress={() =>
                      navigation.navigate('InspectionChecklist', {
                        orderId,
                        address: order.property?.address,
                      })
                    }
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
                </>
              );
            }

            // Scheduled but inspection not completed → Mark Inspection As Completed + Start Checklist
            if (!inspectionCompletedAt) {
              const inspectionStarted = scheduledAt
                ? moment().isAfter(moment(scheduledAt))
                : false;
              return (
                <>
                  <TouchableOpacity
                    style={[
                      styles.btnPrimary,
                      !inspectionStarted && styles.btnDisabled,
                    ]}
                    activeOpacity={0.85}
                    disabled={isCompleting || !inspectionStarted}
                    onPress={handleCompleteInspection}
                  >
                    <Icon name="check-square" size={18} color={colors.white} />
                    <AppText
                      fontSize={fontSize.medium}
                      fontFamily={fontFamily.Bold}
                      color={colors.white}
                      style={styles.btnText}
                    >
                      {isCompleting
                        ? 'Completing...'
                        : 'Mark Inspection As Completed'}
                    </AppText>
                  </TouchableOpacity>
                  {!inspectionStarted && scheduledAt && (
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={colors.textLighter}
                      align="center"
                      style={styles.btnHint}
                    >
                      Available after{' '}
                      {moment(scheduledAt).format('MMM D, YYYY h:mm A')}
                    </AppText>
                  )}
                  <TouchableOpacity
                    style={styles.btnOutline}
                    activeOpacity={0.85}
                    onPress={() =>
                      navigation.navigate('InspectionChecklist', {
                        orderId,
                        address: order.property?.address,
                      })
                    }
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
                </>
              );
            }

            // Inspection done → Submit Report + Start Checklist
            return (
              <>
                <TouchableOpacity
                  style={styles.btnOutline}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('InspectionChecklist', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
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
                  style={styles.btnPrimary}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('SubmitFinalReport', {
                      orderId,
                      address: order.property?.address,
                    })
                  }
                >
                  <Icon name="file-text" size={18} color={colors.white} />
                  <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                    style={styles.btnText}
                  >
                    Submit Report
                  </AppText>
                </TouchableOpacity>
              </>
            );
          }

          return null;
        })()}
      </AppScrollView>

      {/* ── File Action Dropdown ── */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setMenuVisible(false)}
        />
        <View style={[styles.dropdown, { left: menuPos.x, top: menuPos.y }]}>
          <View style={styles.dropdownInner}>
            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={handleView}
            >
              <Icon name="eye" size={15} color={colors.blueNormal} />
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                View
              </AppText>
            </TouchableOpacity>
            <View style={styles.dropdownDivider} />
            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={handleDownload}
            >
              <Icon name="download" size={15} color="#16A34A" />
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                Download
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Image Viewer ── */}
      <ImageViewing
        images={imageUrls}
        imageIndex={imageViewIndex}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </Wrapper>
  );
};

export default AssignmentDetails;
