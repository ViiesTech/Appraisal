import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  AppText,
  AppScrollView,
  Wrapper,
  AppHeader,
  CertificateViewer,
} from '../../components';
import type { Certificate } from '../../components/CertificateViewer';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import {
  useGetProfileQuery,
  useDeleteCertificatesMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { useNavigation } from '@react-navigation/native';
import { CertificateListSkeleton } from '../../components/Skeletons';

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── ActionMenu ───────────────────────────────────────────────────────────────
interface ActionMenuProps {
  visible: boolean;
  anchorY: number;
  onView: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ActionMenu = ({
  visible,
  anchorY,
  onView,
  onDelete,
  onClose,
}: ActionMenuProps) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.menuOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={[styles.menuCard, { top: anchorY }]}>
        <View style={styles.menuCardInner}>
          <TouchableOpacity style={styles.menuItem} onPress={onView}>
            <Icon name="eye" size={16} color={colors.statusBlue} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.textDark}
              style={styles.menuItemText}
            >
              View
            </AppText>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <Icon name="trash-2" size={16} color={colors.statusRed} />
            <AppText
              fontSize={fontSize.medium}
              fontFamily={fontFamily.Medium}
              color={colors.statusRed}
              style={styles.menuItemText}
            >
              Delete
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const AllCertificates = () => {
  const navigation = useNavigation();

  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const [deleteCertificates, { isLoading: isDeleting }] =
    useDeleteCertificatesMutation();

  const certificates: Certificate[] =
    profileData?.appraiser?.certificates ?? [];

  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchorY, setMenuAnchorY] = useState(0);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dotsRefs = useRef<Record<string, TouchableOpacity | null>>({});

  const openMenu = (cert: Certificate, ref: TouchableOpacity | null) => {
    if (!ref) return;
    ref.measure((_fx, _fy, _w, _h, _px, py) => {
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
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => confirmDelete(activeCert._id),
        },
      ],
    );
  };

  const confirmDelete = async (id: string) => {
    setDeletingId(id);
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
          <ActivityIndicator
            size="small"
            color={colors.statusBlue}
            style={styles.dotsBtn}
          />
        ) : (
          <TouchableOpacity
            ref={ref => {
              dotsRefs.current[item._id] = ref;
            }}
            style={styles.dotsBtn}
            onPress={() => openMenu(item, dotsRefs.current[item._id] ?? null)}
          >
            <Icon name="more-vertical" size={20} color={colors.textLighter} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const headerContainerStyle: ViewStyle = {
    paddingTop: sizes.screenHeight * 0.03,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E6EB',
  };

  return (
    <Wrapper
    >
      <AppHeader
        title={`My Certificates${
          certificates.length ? ` (${certificates.length})` : ''
        }`}
        containerStyle={headerContainerStyle}
        onBackPress={() => navigation.goBack()}
      />

      {isLoading ? (
        <AppScrollView contentContainerStyle={styles.scrollContent}>
          <CertificateListSkeleton />
        </AppScrollView>
      ) : certificates.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="file-minus" size={40} color={colors.borderLight} />
          <AppText
            fontFamily={fontFamily.Bold}
            color={colors.textLighter}
            style={styles.emptyText}
          >
            No certificates uploaded yet
          </AppText>
        </View>
      ) : (
        <FlatList
          data={certificates}
          renderItem={renderCertItem}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: sizes.screenWidth * 0.05,
  },
  listContent: {
    padding: sizes.screenWidth * 0.05,
    gap: sizes.screenWidth * 0.03,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: sizes.screenWidth * 0.04,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  certIconContainer: {
    width: sizes.screenWidth * 0.12,
    height: sizes.screenWidth * 0.12,
    borderRadius: sizes.cardRadius,
    backgroundColor: colors.certIconBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certDetails: {
    flex: 1,
    marginLeft: sizes.screenWidth * 0.03,
  },
  certName: {},
  certMeta: {
    marginTop: 2,
  },
  dotsBtn: {
    padding: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: sizes.screenHeight * 0.015,
  },
  // ── Action Menu ──
  menuOverlay: {
    flex: 1,
  },
  menuCard: {
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
  menuCardInner: {
    borderRadius: sizes.cardRadius,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.016,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },
  menuItemText: {
    marginLeft: sizes.screenWidth * 0.025,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: sizes.screenWidth * 0.04,
  },
});

export default AllCertificates;
