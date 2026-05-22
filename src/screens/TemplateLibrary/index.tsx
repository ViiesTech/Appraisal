import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { downloadDocument, getFilename } from '../../utils/fileUtils';
import {
  Wrapper,
  AppText,
  AppHeader,
  AppScrollView,
  CertificateViewer,
  CertificateListSkeleton,
} from '../../components';
import { TemplateListSkeleton } from '../../components/Skeletons';
import type { Certificate } from '../../components/CertificateViewer';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import styles from './style';
import {
  useGetTemplatesQuery,
  useGetProfileQuery,
  useDeleteCertificatesMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

// ── Types ─────────────────────────────────────────────────────────────────────
type Template = {
  _id: string;
  name: string;
  category: string;
  version: string;
  fileUrl: string;
  fileSizeFormatted: string;
  description: string;
  updatedAt: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  Residential: { text: '#2A6DF4', bg: '#E5F0FF' },
  Commercial: { text: '#6C4DFF', bg: '#EEEAFE' },
  Land: { text: '#13A452', bg: '#E4F9E8' },
  Industrial: { text: '#6C4DFF', bg: '#EEEAFE' },
  Condo: { text: '#7C3AED', bg: '#F5F3FF' },
  Income: { text: '#059669', bg: '#ECFDF5' },
  Manufactured: { text: '#0891B2', bg: '#ECFEFF' },
  Update: { text: '#EA580C', bg: '#FFF7ED' },
  Exterior: { text: '#D97706', bg: '#FFFBEB' },
};
const categoryStyle = (cat: string) =>
  CATEGORY_COLORS[cat] ?? { text: colors.textLighter, bg: colors.AppBG };

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const getIconForFormat = (format: string) => {
  if (
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'image'].includes(
      format?.toLowerCase(),
    )
  )
    return 'image';
  if (format?.toLowerCase() === 'pdf') return 'file-text';
  return 'file';
};

// ── Dropdown menu ─────────────────────────────────────────────────────────────
const MENU_WIDTH = sizes.screenWidth * 0.38;

interface DropdownProps {
  visible: boolean;
  x: number;
  y: number;
  onView: () => void;
  onDownload: () => void;
  onClose: () => void;
}

const DropdownMenu = ({
  visible,
  x,
  y,
  onView,
  onDownload,
  onClose,
}: DropdownProps) => (
  <Modal
    transparent
    visible={visible}
    animationType="none"
    onRequestClose={onClose}
  >
    <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
    <View style={[menuStyles.card, { left: x, top: y, width: MENU_WIDTH }]}>
      <View style={menuStyles.cardInner}>
        <TouchableOpacity
          style={menuStyles.item}
          activeOpacity={0.7}
          onPress={onView}
        >
          <Icon name="eye" size={15} color={colors.statusBlue} />
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
          >
            {'  '}View
          </AppText>
        </TouchableOpacity>
        <View style={menuStyles.divider} />
        <TouchableOpacity
          style={menuStyles.item}
          activeOpacity={0.7}
          onPress={onDownload}
        >
          <Icon name="download" size={15} color="#16A34A" />
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
          >
            {'  '}Download
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const menuStyles = StyleSheet.create({
  card: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: sizes.cardRadius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  cardInner: {
    borderRadius: sizes.cardRadius,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.015,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight ?? '#E5E7EB',
    marginHorizontal: sizes.screenWidth * 0.04,
  },
});

// ── Cert ActionMenu (view + delete) ──────────────────────────────────────────
interface CertMenuProps {
  visible: boolean;
  anchorY: number;
  onView: () => void;
  onDelete: () => void;
  onClose: () => void;
}
const CertActionMenu = ({
  visible,
  anchorY,
  onView,
  onDelete,
  onClose,
}: CertMenuProps) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={certMenuStyles.overlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={[certMenuStyles.card, { top: anchorY }]}>
        <View style={certMenuStyles.cardInner}>
          <TouchableOpacity style={certMenuStyles.item} onPress={onView}>
            <Icon name="eye" size={16} color={colors.statusBlue} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.textDark}
              style={certMenuStyles.label}
            >
              View
            </AppText>
          </TouchableOpacity>
          <View style={certMenuStyles.divider} />
          <TouchableOpacity style={certMenuStyles.item} onPress={onDelete}>
            <Icon name="trash-2" size={16} color={colors.statusRed} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.statusRed}
              style={certMenuStyles.label}
            >
              Delete
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const certMenuStyles = StyleSheet.create({
  overlay: { flex: 1 },
  card: {
    position: 'absolute',
    right: sizes.screenWidth * 0.05,
    backgroundColor: colors.white,
    borderRadius: sizes.cardRadius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 140,
  },
  cardInner: {
    borderRadius: sizes.cardRadius,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.016,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },
  label: { marginLeft: sizes.screenWidth * 0.025 },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight ?? '#E5E7EB',
    marginHorizontal: sizes.screenWidth * 0.04,
  },
});

// ── Header style ──────────────────────────────────────────────────────────────
const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

// ── Screen ────────────────────────────────────────────────────────────────────
const TemplateLibrary = ({ navigation }: any) => {
  // ── API ──
  const { data: templateData, isLoading: isTemplatesLoading } =
    useGetTemplatesQuery();
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery(undefined);
  const [deleteCertificates] = useDeleteCertificatesMutation();

  const templates: Template[] = templateData?.templates ?? [];
  const certificates: Certificate[] =
    profileData?.appraiser?.certificates ?? [];

  // ── Template dropdown state ──
  const [templateMenuVisible, setTemplateMenuVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const templateBtnRefs = useRef<Record<string, View | null>>({});

  // ── Certificate menu state ──
  const [certMenuVisible, setCertMenuVisible] = useState(false);
  const [certMenuAnchorY, setCertMenuAnchorY] = useState(0);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [deletingCertId, setDeletingCertId] = useState<string | null>(null);
  const certDotsRefs = useRef<
    Record<string, React.ElementRef<typeof TouchableOpacity> | null>
  >({});

  // ── Template actions ──
  const openTemplateMenu = (template: Template) => {
    const ref = templateBtnRefs.current[template._id];
    ref?.measureInWindow((x, y, w, h) => {
      const horizontalInset = sizes.screenWidth * 0.04;
      const left = Math.max(
        horizontalInset,
        Math.min(
          x + w - MENU_WIDTH,
          sizes.screenWidth - MENU_WIDTH - horizontalInset,
        ),
      );
      setMenuPos({ x: left, y: y + h - 4 });
      setSelectedTemplate(template);
      setTemplateMenuVisible(true);
    });
  };

  const handleTemplateView = () => {
    if (!selectedTemplate) return;
    setTemplateMenuVisible(false);
    setTimeout(() => {
      navigation.navigate('DocumentViewer', {
        url: selectedTemplate.fileUrl,
        title: selectedTemplate.name,
      });
    }, 200);
  };

  const handleTemplateDownload = () => {
    if (!selectedTemplate) return;
    setTemplateMenuVisible(false);
    const filename = getFilename(selectedTemplate.fileUrl) || `${selectedTemplate.name}.pdf`;
    downloadDocument(selectedTemplate.fileUrl, filename);
  };

  // ── Certificate actions ──
  const openCertMenu = (
    cert: Certificate,
    ref: React.ElementRef<typeof TouchableOpacity> | null,
  ) => {
    if (!ref) return;
    ref.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        _h: number,
        _px: number,
        py: number,
      ) => {
        setCertMenuAnchorY(py);
        setActiveCert(cert);
        setCertMenuVisible(true);
      },
    );
  };

  const handleCertView = () => {
    setCertMenuVisible(false);
    if (activeCert) setViewingCert(activeCert);
  };

  const handleCertDelete = () => {
    setCertMenuVisible(false);
    if (!activeCert) return;
    Alert.alert('Delete Certificate', `Delete "${activeCert.originalName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => confirmCertDelete(activeCert._id),
      },
    ]);
  };

  const confirmCertDelete = async (id: string) => {
    setDeletingCertId(id);
    try {
      await deleteCertificates({ certificateIds: [id] }).unwrap();
      showToast('success', 'Certificate deleted');
    } catch (err: any) {
      showToast(
        'error',
        'Delete failed',
        err?.data?.message ?? 'Please try again',
      );
    } finally {
      setDeletingCertId(null);
    }
  };

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Template Library"
        containerStyle={headerContainerStyle}
        onBackPress={() => navigation.goBack()}
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── Templates Section ── */}
        {isTemplatesLoading ? (
          <TemplateListSkeleton />
        ) : templates.length === 0 ? (
          <View style={styles.templatesContainer}>
            <View style={[styles.templateCard, styles.templateCardEmpty]}>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                No templates available
              </AppText>
            </View>
          </View>
        ) : (
          <View style={styles.templatesContainer}>
            {templates.map(template => {
              const catStyle = categoryStyle(template.category);
              return (
                <View key={template._id} style={styles.templateCard}>
                  {/* File icon */}
                  <View style={styles.fileIconWrap}>
                    <Icon
                      name="file-text"
                      size={16}
                      color={colors.blueNormal}
                    />
                  </View>

                  {/* Details */}
                  <View style={styles.templateDetailWrap}>
                    <AppText
                      fontSize={fontSize.medium}
                      fontFamily={fontFamily.Bold}
                      color={colors.textDark}
                      style={styles.templateTitle}
                      numberOfLines={2}
                    >
                      {template.name}
                    </AppText>

                    <View style={styles.metaRow}>
                      <View
                        style={[styles.badge, { backgroundColor: catStyle.bg }]}
                      >
                        <AppText
                          fontSize={fontSize.small}
                          fontFamily={fontFamily.Bold}
                          color={catStyle.text}
                        >
                          {template.category}
                        </AppText>
                      </View>
                      <AppText
                        fontSize={fontSize.small}
                        fontFamily={fontFamily.Regular}
                        color={colors.textLighter}
                        style={styles.fileSize}
                      >
                        {template.fileSizeFormatted}
                      </AppText>
                    </View>

                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={colors.textLighter}
                    >
                      v{template.version} · Updated{' '}
                      {new Date(template.updatedAt).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          year: 'numeric',
                        },
                      )}
                    </AppText>
                  </View>

                  {/* 3-dot action */}
                  <View
                    ref={r => {
                      templateBtnRefs.current[template._id] = r;
                    }}
                    collapsable={false}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.actionIconWrap}
                      onPress={() => openTemplateMenu(template)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Icon
                        name="more-vertical"
                        size={18}
                        color={colors.textLighter}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* ── Offline Access ── */}
        {/* <View style={styles.offlineCard}>
          <View style={styles.offlineTitleRow}>
            <Icon name="download" size={13} color={colors.blueNormal} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.blueNormal}
              style={styles.offlineTitle}
            >
              Offline Access
            </AppText>
          </View>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
            style={styles.offlineDescription}
          >
            Downloaded templates are available offline for your convenience.
          </AppText>
        </View> */}

        {/* ── Personal Certificates Section ── */}
        <View style={styles.certificateCard}>
          <AppText
            fontSize={fontSize.h6}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.personalTitle}
          >
            Personal Certificates
          </AppText>

          {isProfileLoading ? (
            <CertificateListSkeleton />
          ) : certificates.length === 0 ? (
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={{ marginBottom: sizes.screenHeight * 0.01 }}
            >
              No certificates uploaded yet.
            </AppText>
          ) : (
            certificates.map((cert, index) => {
              const isThisDeleting = deletingCertId === cert._id;
              return (
                <View
                  key={cert._id}
                  style={[
                    styles.personalItem,
                    index < certificates.length - 1 &&
                      styles.personalItemSpacing,
                  ]}
                >
                  <View style={styles.personalIconWrap}>
                    <Icon
                      name={getIconForFormat(cert.format)}
                      size={14}
                      color={colors.blueNormal}
                    />
                  </View>

                  <View style={styles.personalDetailWrap}>
                    <AppText
                      fontSize={fontSize.medium}
                      fontFamily={fontFamily.Bold}
                      color={colors.textDark}
                      numberOfLines={1}
                    >
                      {cert.originalName}
                    </AppText>
                    <AppText
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.Regular}
                      color={colors.textLighter}
                    >
                      {formatDate(cert.uploadedAt)} · {cert.size}
                    </AppText>
                  </View>

                  {isThisDeleting ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.statusBlue}
                      style={styles.removeIconWrap}
                    />
                  ) : (
                    <TouchableOpacity
                      ref={ref => {
                        certDotsRefs.current[cert._id] = ref;
                      }}
                      style={styles.removeIconWrap}
                      activeOpacity={0.7}
                      onPress={() =>
                        openCertMenu(
                          cert,
                          certDotsRefs.current[cert._id] ?? null,
                        )
                      }
                    >
                      <Icon
                        name="more-vertical"
                        size={18}
                        color={colors.textLighter}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}

          {/* Security note */}
          <View style={styles.securityCard}>
            <Icon name="lock" size={15} color={colors.blueNormal} />
            <View style={styles.securityTextWrap}>
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Bold}
                color={colors.textDark}
              >
                Private & Secure
              </AppText>
              <AppText
                fontSize={fontSize.small}
                fontFamily={fontFamily.Regular}
                color={colors.textLighter}
              >
                Your certificates are visible only to you and administrators.
              </AppText>
            </View>
          </View>
        </View>
      </AppScrollView>

      {/* ── Template dropdown ── */}
      <DropdownMenu
        visible={templateMenuVisible}
        x={menuPos.x}
        y={menuPos.y}
        onView={handleTemplateView}
        onDownload={handleTemplateDownload}
        onClose={() => setTemplateMenuVisible(false)}
      />

      {/* ── Certificate action menu ── */}
      <CertActionMenu
        visible={certMenuVisible}
        anchorY={certMenuAnchorY}
        onView={handleCertView}
        onDelete={handleCertDelete}
        onClose={() => setCertMenuVisible(false)}
      />

      {/* ── Certificate viewer ── */}
      <CertificateViewer
        certificate={viewingCert}
        visible={!!viewingCert}
        onClose={() => setViewingCert(null)}
      />
    </Wrapper>
  );
};

export default TemplateLibrary;
