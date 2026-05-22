import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/Feather';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import {
  useGetChecklistQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
} from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';
import { ChecklistCategory, ChecklistItem, LocalImage } from './types';
import { CategoryCard, CategoryModal, ItemModal } from './components';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const ChecklistSkeleton = () => (
  <SkeletonPlaceholder speed={1200} backgroundColor={colors.borderLight} highlightColor={colors.blueGrey}>
    <View style={{ gap: sizes.screenHeight * 0.014 }}>
      {[1, 2, 3].map(i => (
        <View
          key={i}
          style={{
            backgroundColor: colors.white,
            borderRadius: sizes.screenWidth * 0.04,
            padding: sizes.screenWidth * 0.04,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: sizes.screenWidth * 0.03, marginBottom: sizes.screenHeight * 0.012 }}>
            <View style={{ width: 32, height: 32, borderRadius: 16 }} />
            <View style={{ flex: 1, gap: 6 }}>
              <View style={{ height: 15, width: '55%', borderRadius: 4 }} />
              <View style={{ height: 11, width: '30%', borderRadius: 4 }} />
            </View>
          </View>
          <View style={{ height: 5, borderRadius: 3 }} />
          <View style={{ gap: sizes.screenHeight * 0.01, marginTop: sizes.screenHeight * 0.012 }}>
            {[1, 2].map(j => (
              <View key={j} style={{ flexDirection: 'row', alignItems: 'center', gap: sizes.screenWidth * 0.025 }}>
                <View style={{ width: 20, height: 20, borderRadius: 5 }} />
                <View style={{ height: 12, flex: 1, borderRadius: 4 }} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  </SkeletonPlaceholder>
);

// ── Main Screen ───────────────────────────────────────────────────────────────
const InspectionChecklist = ({ route }: any) => {
  const { orderId, address } = route.params ?? {};
  console.log('[Checklist] route.params:', route.params);

  const { data, isLoading, isError, refetch } = useGetChecklistQuery(orderId, {
    skip: !orderId,
  });
  const checklist = data?.checklist;
  const categories: ChecklistCategory[] = (checklist?.categories ?? []) as ChecklistCategory[];

  const [addCategory, { isLoading: isAddingCat }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCat }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addItem, { isLoading: isAddingItem }] = useAddChecklistItemMutation();
  const [updateItem, { isLoading: isUpdatingItem }] = useUpdateChecklistItemMutation();
  const [deleteItem] = useDeleteChecklistItemMutation();

  const [catModal, setCatModal] = useState<{
    visible: boolean;
    category?: ChecklistCategory;
  }>({ visible: false });

  const [itemModal, setItemModal] = useState<{
    visible: boolean;
    item?: ChecklistItem;
    categoryId?: string;
  }>({ visible: false });

  const [togglingId, setTogglingId] = useState<string | null>(null);

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const totalDone = categories.reduce(
    (s, c) => s + c.items.filter(i => i.isCompleted).length,
    0,
  );
  const overallProgress = checklist?.overallProgress ?? 0;

  // ── Category handlers ──────────────────────────────────────────────────────
  const handleSaveCategory = async (title: string) => {
    try {
      if (catModal.category) {
        console.log('[Checklist] updateCategory payload:', { orderId, categoryId: catModal.category._id, title });
        const res = await updateCategory({ orderId, categoryId: catModal.category._id, title }).unwrap();
        console.log('[Checklist] updateCategory response:', res);
        showToast('success', 'Category updated');
      } else {
        console.log('[Checklist] addCategory payload:', { orderId, title });
        const res = await addCategory({ orderId, title }).unwrap();
        console.log('[Checklist] addCategory response:', res);
        showToast('success', 'Category added');
      }
      setCatModal({ visible: false });
    } catch (err: any) {
      console.log('[Checklist] saveCategory error:', JSON.stringify(err));
      showToast('error', err?.data?.message ?? 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory({ orderId, categoryId }).unwrap();
      showToast('success', 'Category deleted');
    } catch (err: any) {
      showToast('error', err?.data?.message ?? 'Failed to delete category');
    }
  };

  // ── Item helpers ───────────────────────────────────────────────────────────
  const buildFormData = (
    task: string,
    notes: string,
    isCompleted: boolean,
    images: LocalImage[],
  ) => {
    const fd = new FormData();
    fd.append('task', task);
    fd.append('notes', notes);
    fd.append('isCompleted', String(isCompleted));
    for (const img of images) {
      fd.append('checklistImages', {
        uri: img.uri,
        type: img.type ?? 'image/jpeg',
        name: img.fileName ?? 'image.jpg',
      } as any);
    }
    return fd;
  };

  const handleSaveItem = async (
    task: string,
    notes: string,
    isCompleted: boolean,
    images: LocalImage[],
  ) => {
    const { categoryId, item } = itemModal;
    const formData = buildFormData(task, notes, isCompleted, images);
    try {
      if (item?._id) {
        await updateItem({ orderId, categoryId: categoryId!, itemId: item._id, formData }).unwrap();
        showToast('success', 'Item updated');
      } else {
        await addItem({ orderId, categoryId: categoryId!, formData }).unwrap();
        showToast('success', 'Item added');
      }
      setItemModal({ visible: false });
    } catch (err: any) {
      showToast('error', err?.data?.message ?? 'Failed to save item');
    }
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteItem({ orderId, categoryId, itemId }).unwrap();
            showToast('success', 'Item deleted');
          } catch (err: any) {
            showToast('error', err?.data?.message ?? 'Failed to delete item');
          }
        },
      },
    ]);
  };

  const handleToggleItem = async (
    category: ChecklistCategory,
    item: ChecklistItem,
    isCompleted: boolean,
  ) => {
    setTogglingId(item._id);
    const formData = buildFormData(item.task, item.notes ?? '', isCompleted, []);
    try {
      await updateItem({
        orderId,
        categoryId: category._id,
        itemId: item._id,
        formData,
      }).unwrap();
    } catch {
      showToast('error', 'Failed to update item');
    } finally {
      setTogglingId(null);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Inspection Checklist"
        containerStyle={headerContainerStyle}
        renderCustomTabs={
          <View style={styles.headerExtra}>
            {!!address && (
              <View style={styles.addressCard}>
                <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular} color={colors.blueNormal}>
                  Property
                </AppText>
                <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Regular} color={colors.textDark} style={{ marginTop: 2 }}>
                  {address}
                </AppText>
              </View>
            )}

            <View style={styles.overallRow}>
              <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Regular} color={colors.textDark}>
                Overall Progress
              </AppText>
              <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color={'#4263EB'}>
                {overallProgress}%
              </AppText>
            </View>

            <View style={styles.overallTrack}>
              <View style={[styles.overallFill, { width: `${overallProgress}%` }]} />
            </View>

            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textLighter}
              style={{ marginTop: sizes.screenHeight * 0.006 }}
            >
              {totalDone} of {totalItems} items completed
            </AppText>
          </View>
        }
      />

      {isLoading ? (
        <AppScrollView contentContainerStyle={styles.scrollContent}>
          <ChecklistSkeleton />
        </AppScrollView>
      ) : isError ? (
        <View style={styles.errorWrap}>
          <Icon name="alert-circle" size={36} color={colors.textLighter} />
          <AppText
            fontSize={fontSize.h6}
            fontFamily={fontFamily.Bold}
            color={colors.textLighter}
            style={{ marginTop: sizes.screenHeight * 0.012 }}
          >
            Failed to load checklist
          </AppText>
          <TouchableOpacity style={styles.retryBtn} onPress={refetch}>
            <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Bold} color={colors.white}>
              Retry
            </AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <AppScrollView contentContainerStyle={styles.scrollContent}>
          {categories.map(cat => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={() => setCatModal({ visible: true, category: cat })}
              onDelete={() => handleDeleteCategory(cat._id)}
              onAddItem={() => setItemModal({ visible: true, categoryId: cat._id })}
              onEditItem={item => setItemModal({ visible: true, item, categoryId: cat._id })}
              onDeleteItem={itemId => handleDeleteItem(cat._id, itemId)}
              onToggleItem={(itemId, isComp) => {
                const item = cat.items.find(i => i._id === itemId);
                if (item) handleToggleItem(cat, item, isComp);
              }}
              togglingId={togglingId}
            />
          ))}

          {categories.length === 0 && (
            <View style={styles.emptyWrap}>
              <Icon name="clipboard" size={42} color={colors.textLighter} />
              <AppText
                fontSize={fontSize.h6}
                fontFamily={fontFamily.Bold}
                color={colors.textLighter}
                style={{ marginTop: sizes.screenHeight * 0.012 }}
              >
                No categories yet
              </AppText>
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Regular}
                color={colors.placeholderText}
                align="center"
                style={{ marginTop: 4 }}
              >
                Tap + to add your first inspection category
              </AppText>
            </View>
          )}
        </AppScrollView>
      )}

      {/* ── Add Category FAB ── */}
      {!isLoading && !isError && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setCatModal({ visible: true })}
          activeOpacity={0.85}
        >
          <Icon name="plus" size={22} color={colors.white} />
        </TouchableOpacity>
      )}

      {/* ── Modals ── */}
      <CategoryModal
        visible={catModal.visible}
        onClose={() => setCatModal({ visible: false })}
        onSave={handleSaveCategory}
        initialTitle={catModal.category?.title ?? ''}
        isLoading={isAddingCat || isUpdatingCat}
      />
      <ItemModal
        visible={itemModal.visible}
        onClose={() => setItemModal({ visible: false })}
        onSave={handleSaveItem}
        initialItem={itemModal.item}
        isLoading={isAddingItem || isUpdatingItem}
      />
    </Wrapper>
  );
};

export default InspectionChecklist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  headerExtra: {
    marginTop: sizes.screenHeight * 0.012,
  },
  addressCard: {
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.012,
    marginBottom: sizes.screenHeight * 0.012,
  },
  overallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.screenHeight * 0.008,
  },
  overallTrack: {
    height: sizes.screenHeight * 0.012,
    borderRadius: sizes.screenHeight * 0.006,
    backgroundColor: '#D7DBE4',
    overflow: 'hidden',
  },
  overallFill: {
    height: '100%',
    borderRadius: sizes.screenHeight * 0.006,
    backgroundColor: '#4263EB',
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.018,
    paddingBottom: sizes.screenHeight * 0.12,
    gap: sizes.screenHeight * 0.014,
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryBtn: {
    marginTop: sizes.screenHeight * 0.016,
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.08,
    paddingVertical: sizes.screenHeight * 0.012,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.1,
  },
  fab: {
    position: 'absolute',
    bottom: sizes.screenHeight * 0.04,
    right: sizes.screenWidth * 0.06,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blueNormal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.blueNormal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});

