import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import type { ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import { useGetNotesQuery } from '../../redux/api/apiSlice';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

// ── Note card ─────────────────────────────────────────────────────────────────
interface NoteCardProps {
  note: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  createdAt: string;
  updatedAt: string;
}

const NoteCard = ({
  note,
  adminFirstName,
  adminLastName,
  adminEmail,
  createdAt,
  updatedAt,
}: NoteCardProps) => {
  const isEdited = updatedAt !== createdAt;

  return (
    <View style={styles.noteCard}>
      <View style={styles.noteCardHeader}>
        <View style={styles.adminRow}>
          <View style={styles.adminAvatar}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.white}
            >
              {adminFirstName.charAt(0).toUpperCase()}
            </AppText>
          </View>
          <View style={styles.adminInfo}>
            <AppText
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Bold}
              color={colors.textDark}
            >
              {adminFirstName} {adminLastName}
            </AppText>
            <AppText
              fontSize={fontSize.tiny}
              fontFamily={fontFamily.Regular}
              color={colors.placeholderText}
            >
              {adminEmail}
            </AppText>
          </View>
        </View>
        <AppText
          fontSize={fontSize.tiny}
          fontFamily={fontFamily.Regular}
          color={colors.placeholderText}
        >
          {moment(createdAt).fromNow()}
        </AppText>
      </View>

      <AppText
        style={styles.noteContent}
        fontSize={fontSize.smallM}
        fontFamily={fontFamily.Regular}
        color={colors.textLighter}
      >
        {note}
      </AppText>

      {isEdited && (
        <AppText
          fontSize={fontSize.tiny}
          fontFamily={fontFamily.Regular}
          color={colors.placeholderText}
          style={styles.editedLabel}
        >
          edited {moment(updatedAt).fromNow()}
        </AppText>
      )}
    </View>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const NotesSkeleton = () => (
  <>
    {[1, 2, 3].map(i => (
      <View key={i} style={[styles.noteCard, styles.skeletonCard]}>
        <View style={styles.skeletonHeaderRow}>
          <View style={styles.skeletonAvatar} />
          <View style={styles.skeletonNameBlock}>
            <View style={styles.skeletonName} />
            <View style={styles.skeletonEmail} />
          </View>
        </View>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, { width: '70%' }]} />
      </View>
    ))}
  </>
);

// ── Screen ────────────────────────────────────────────────────────────────────
const Notes = ({ navigation }: any) => {
  const { data, isLoading, isError, refetch } = useGetNotesQuery();
  const notes = data?.notes ?? [];

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        title="Admin Notes"
        showBackground
        containerStyle={headerContainerStyle}
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <NotesSkeleton />
        ) : isError ? (
          <View style={styles.emptyWrap}>
            <Icon name="alert-circle" size={36} color={colors.placeholderText} />
            <AppText style={styles.emptyText}>Failed to load notes.</AppText>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={refetch}
              style={styles.retryBtn}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.blueNormal}
              >
                Retry
              </AppText>
            </TouchableOpacity>
          </View>
        ) : notes.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon name="file-text" size={40} color={colors.placeholderText} />
            <AppText style={styles.emptyText}>No notes yet.</AppText>
            <AppText style={styles.emptySubText}>
              Notes shared by admin will appear here.
            </AppText>
          </View>
        ) : (
          notes.map(item => (
            <NoteCard
              key={item._id}
              note={item.note}
              adminFirstName={item.adminId.firstName}
              adminLastName={item.adminId.lastName}
              adminEmail={item.adminId.email}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
            />
          ))
        )}
      </AppScrollView>
    </Wrapper>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  scrollContent: {
    padding: sizes.screenWidth * 0.045,
    paddingBottom: sizes.screenHeight * 0.04,
    gap: sizes.screenHeight * 0.014,
  },
  // ── Note card
  noteCard: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    padding: sizes.screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#E5E6EB',
    gap: sizes.screenHeight * 0.01,
  },
  noteCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  adminRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  adminAvatar: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.045,
    backgroundColor: colors.blueNormal,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  adminInfo: {
    flex: 1,
    gap: 2,
  },
  noteContent: {
    lineHeight: 20,
  },
  editedLabel: {
    marginTop: 2,
  },
  // ── Empty / error
  emptyWrap: {
    alignItems: 'center',
    paddingTop: sizes.screenHeight * 0.1,
    gap: sizes.screenHeight * 0.012,
  },
  emptyText: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
    marginTop: 4,
  },
  emptySubText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.placeholderText,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.blueNormal,
  },
  // ── Skeleton
  skeletonCard: {
    gap: sizes.screenHeight * 0.012,
  },
  skeletonHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  skeletonAvatar: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.045,
    backgroundColor: '#E5E6EB',
  },
  skeletonNameBlock: {
    gap: 6,
  },
  skeletonName: {
    height: 13,
    width: sizes.screenWidth * 0.35,
    backgroundColor: '#E5E6EB',
    borderRadius: 5,
  },
  skeletonEmail: {
    height: 11,
    width: sizes.screenWidth * 0.45,
    backgroundColor: '#F0F1F4',
    borderRadius: 5,
  },
  skeletonLine: {
    height: 12,
    width: '90%',
    backgroundColor: '#F0F1F4',
    borderRadius: 5,
  },
});
