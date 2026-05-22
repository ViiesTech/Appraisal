import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Modal, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import {
  AppText,
  ShadowCard,
  CertificateListSkeleton,
  CertificateViewer,
} from '..';
import type { Certificate } from '../CertificateViewer';
import Icon from 'react-native-vector-icons/Feather';
import { pick, types } from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import styles from './style';
import {
  useGetProfileQuery,
  useUploadCertificatesMutation,
  useDeleteCertificatesMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { useNavigation } from '@react-navigation/native';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getIconForFormat = (format: string) => {
  if (
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'image'].includes(
      format?.toLowerCase(),
    )
  )
    return 'image';
  if (['pdf'].includes(format?.toLowerCase())) return 'file-text';
  return 'file';
};

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

// ─── Action Menu ──────────────────────────────────────────────────────────────
interface ActionMenuProps {
  visible: boolean;
  anchorY: number;
  onView: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ActionMenu = ({ visible, anchorY, onView, onDelete, onClose }: ActionMenuProps) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={menuStyles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={[menuStyles.card, { top: anchorY }]}>
        <View style={menuStyles.cardInner}>
          <TouchableOpacity style={menuStyles.item} onPress={onView}>
            <Icon name="eye" size={16} color={colors.statusBlue} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.textDark}
              style={menuStyles.itemText}
            >
              View
            </AppText>
          </TouchableOpacity>
          <View style={menuStyles.divider} />
          <TouchableOpacity style={menuStyles.item} onPress={onDelete}>
            <Icon name="trash-2" size={16} color={colors.statusRed} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.statusRed}
              style={menuStyles.itemText}
            >
              Delete
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

const menuStyles = StyleSheet.create({
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
  itemText: { marginLeft: sizes.screenWidth * 0.025 },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: sizes.screenWidth * 0.04,
  },
});

// ─── Main Component ────────────────────────────────────────────────────────────
const HomeCertificates = () => {
  const navigation = useNavigation<any>();

  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchorY, setMenuAnchorY] = useState(0);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dotsRefs = useRef<Record<string, React.ElementRef<typeof TouchableOpacity> | null>>({});

  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true });
  const [uploadCertificates, { isLoading: isUploading }] =
    useUploadCertificatesMutation();
  const [deleteCertificates] = useDeleteCertificatesMutation();

  const allCertificates: Certificate[] = profileData?.appraiser?.certificates ?? [];
  // Show max 3 on home
  const certificates = allCertificates.slice(0, 3);
  const hasMore = allCertificates.length > 3;

  const addToSelected = (files: { uri: string; name: string; type: string; size?: number }[]) => {
    const remaining = 5 - selectedFiles.length;
    if (remaining <= 0) {
      showToast('error', 'Maximum 5 files allowed', 'Remove a file to add more');
      return;
    }
    const toAdd = files.slice(0, remaining);
    if (files.length > remaining) {
      showToast('error', `Only ${remaining} more file(s) can be added`, 'Maximum 5 files at a time');
    }
    setSelectedFiles(prev => [...prev, ...toAdd]);
  };

  const handlePickDocuments = async () => {
    try {
      const results = await pick({
        type: [types.pdf, types.docx, types.doc],
        multiple: true,
      });
      if (!results || results.length === 0) return;
      addToSelected(results.map(f => ({
        uri: f.uri,
        name: f.name || 'document',
        type: f.type || 'application/octet-stream',
        size: f.size ?? undefined,
      })));
    } catch (err: any) {
      if (err?.code !== 'DOCUMENT_PICKER_CANCELED') {
        showToast('error', 'Could not pick file', err?.message ?? '');
      }
    }
  };

  const handlePickImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5, quality: 0.8 }, response => {
      if (response.didCancel || response.errorCode) return;
      const picked = (response.assets ?? []).map(a => ({
        uri: a.uri!,
        name: a.fileName ?? `photo_${Date.now()}.jpg`,
        type: a.type ?? 'image/jpeg',
        size: a.fileSize,
      }));
      addToSelected(picked);
    });
  };

  const handlePickFiles = () => {
    Alert.alert(
      'Choose File Source',
      undefined,
      [
        { text: 'Photo Library', onPress: handlePickImages },
        { text: 'Documents (PDF, DOCX)', onPress: handlePickDocuments },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const removeSelected = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      showToast('error', 'No files selected', 'Please choose at least one file');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('appraiserCertificate', {
        uri: file.uri,
        name: file.name || 'certificate',
        type: file.type || 'application/octet-stream',
      } as any);
    });

    try {
      await uploadCertificates(formData).unwrap();
      setSelectedFiles([]);
      showToast('success', 'Certificates uploaded successfully');
    } catch (err: any) {
      showToast('error', 'Upload failed', err?.data?.message ?? 'Please try again');
    }
  };

  const openMenu = (cert: Certificate, ref: React.ElementRef<typeof TouchableOpacity> | null) => {
    if (!ref) return;
    ref.measure((_fx: number, _fy: number, _w: number, _h: number, _px: number, py: number) => {
      setMenuAnchorY(py);
      setActiveCert(cert);
      setMenuVisible(true);
    });
  };

  const handleView = () => {
    setMenuVisible(false);
    if (activeCert) setViewingCert(activeCert);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    if (!activeCert) return;
    Alert.alert(
      'Delete Certificate',
      `Are you sure you want to delete "${activeCert.originalName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => confirmDelete(activeCert._id) },
      ],
    );
  };

  const confirmDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteCertificates({ certificateIds: [id] }).unwrap();
      showToast('success', 'Certificate deleted');
    } catch (err: any) {
      showToast('error', 'Delete failed', err?.data?.message ?? 'Please try again');
    } finally {
      setDeletingId(null);
    }
  };

  const renderCertItem = ({ item }: { item: Certificate }) => {
    const isThisDeleting = deletingId === item._id;
    return (
      <View style={styles.certItem}>
        <View style={styles.certIconContainer}>
          <Icon
            name={getIconForFormat(item.format)}
            size={22}
            color={colors.statusBlue}
          />
        </View>
        <View style={styles.certDetails}>
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.certName}
            numberOfLines={1}
          >
            {item.originalName}
          </AppText>
          <AppText
            fontSize={fontSize.small}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
            style={styles.certMeta}
          >
            {formatDate(item.uploadedAt)} • {item.size}
          </AppText>
        </View>
        {isThisDeleting ? (
          <ActivityIndicator size="small" color={colors.statusBlue} style={styles.removeBtn} />
        ) : (
          <TouchableOpacity
            ref={ref => { dotsRefs.current[item._id] = ref; }}
            style={styles.removeBtn}
            onPress={() => openMenu(item, dotsRefs.current[item._id] ?? null)}
          >
            <Icon name="more-vertical" size={20} color={colors.textLighter} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSelectedItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <View style={styles.certItem}>
      <View style={styles.certIconContainer}>
        <Icon
          name={getIconForFormat(item.type?.split('/')[1] ?? '')}
          size={22}
          color={colors.statusAmber}
        />
      </View>
      <View style={styles.certDetails}>
        <AppText
          fontSize={fontSize.medium}
          fontFamily={fontFamily.Bold}
          color={colors.textDark}
          style={styles.certName}
          numberOfLines={1}
        >
          {item.name}
        </AppText>
        <AppText
          fontSize={fontSize.small}
          fontFamily={fontFamily.Regular}
          color={colors.textLighter}
          style={styles.certMeta}
        >
          {item.size ? (item.size / 1024).toFixed(1) + ' KB' : 'Unknown size'} •
          Ready to upload
        </AppText>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeSelected(index)}
      >
        <Icon name="x" size={20} color={colors.textLighter} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ── Upload Card — always rendered, no API dependency ── */}
      <ShadowCard style={styles.mainCard}>
        <View style={styles.headerRow}>
          <Icon
            name="lock"
            size={fontSize.h6}
            color={colors.certLockIcon}
            style={{ marginRight: sizes.screenWidth * 0.02 }}
          />
          <AppText
            fontSize={fontSize.h6}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.uploadTitle}
          >
            Personal Certificates
          </AppText>
        </View>

        <View style={styles.uploadContainer}>
          <View style={styles.uploadIconCircle}>
            <Icon name="upload" size={24} color={colors.statusBlue} />
          </View>
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.textDark}
            style={styles.uploadTitle}
          >
            Upload Certificate
          </AppText>
          <AppText
            fontSize={fontSize.smallM}
            fontFamily={fontFamily.Regular}
            color={colors.textLighter}
            style={styles.uploadSubtitle}
          >
            PDF, JPG, PNG or DOCX • Max 5 files
          </AppText>

          <TouchableOpacity
            style={styles.chooseFileBtn}
            activeOpacity={0.8}
            onPress={handlePickFiles}
          >
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.white}
            >
              Choose File
              {selectedFiles.length > 0 ? `s (${selectedFiles.length}/5)` : 's'}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ── Staged files pending upload ── */}
        {selectedFiles.length > 0 && (
          <View style={styles.stagedContainer}>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={{ marginBottom: sizes.screenHeight * 0.012 }}
            >
              Ready to Upload ({selectedFiles.length})
            </AppText>
            <FlatList
              data={selectedFiles}
              renderItem={renderSelectedItem}
              keyExtractor={(_, i) => `staged-${i}`}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity
              style={[
                styles.uploadBtn,
                isUploading && styles.uploadBtnDisabled,
              ]}
              activeOpacity={0.8}
              onPress={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator size="small" color={colors.white} style={{ marginRight: 8 }} />
              ) : (
                <Icon
                  name="upload-cloud"
                  size={18}
                  color={colors.white}
                  style={{ marginRight: 8 }}
                />
              )}
              <AppText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.Bold}
                color={colors.white}
              >
                {isUploading ? 'Uploading…' : 'Upload Now'}
              </AppText>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoBox}>
          <Icon name="lock" size={20} color={colors.statusBlue} />
          <View style={styles.infoTextContainer}>
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
              style={styles.infoTitle}
            >
              Private & Secure
            </AppText>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={styles.infoDesc}
            >
              Your certificates are visible only to you and administrators.
            </AppText>
          </View>
        </View>
      </ShadowCard>

      {/* ── Uploaded Certificates List ── */}
      {isProfileLoading ? (
        <CertificateListSkeleton />
      ) : (
        <ShadowCard
          style={{
            padding: sizes.screenWidth * 0.05,
            marginTop: sizes.screenHeight * 0.02,
          }}
        >
          {/* Header row: title + See All */}
          <View style={styles.listHeaderRow}>
            <AppText
              fontSize={fontSize.h6}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
            >
              My Certificates ({allCertificates.length})
            </AppText>
            {hasMore && (
              <TouchableOpacity onPress={() => navigation.navigate('AllCertificates')}>
                <AppText
                  fontSize={fontSize.medium}
                  fontFamily={fontFamily.Medium}
                  color={colors.statusBlue}
                >
                  See All
                </AppText>
              </TouchableOpacity>
            )}
          </View>

          {/* List — scrollEnabled false, parent scroll handles scrolling */}
          <FlatList
            data={certificates}
            renderItem={renderCertItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon
                  name="file-minus"
                  size={32}
                  color={colors.borderLight}
                  style={{ marginBottom: 8 }}
                />
                <AppText fontFamily={fontFamily.Bold} color={colors.textLighter}>
                  No certificates uploaded yet
                </AppText>
              </View>
            }
          />
        </ShadowCard>
      )}

      <ActionMenu
        visible={menuVisible}
        anchorY={menuAnchorY}
        onView={handleView}
        onDelete={handleDelete}
        onClose={() => setMenuVisible(false)}
      />

      <CertificateViewer
        certificate={viewingCert}
        visible={viewingCert !== null}
        onClose={() => setViewingCert(null)}
      />
    </View>
  );
};

export default HomeCertificates;
