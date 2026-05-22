import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import type { ViewStyle } from 'react-native';
import {
  Wrapper,
  AppHeader,
  AppText,
  AppScrollView,
} from '../../components';
import { CommentExamplesSkeleton } from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import { useGetCommentExamplesQuery } from '../../redux/api/apiSlice';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E6EB',
};

// ─── Single comment row ───────────────────────────────────────────────────────
interface CommentRowProps {
  comment: string;
}

const CommentRow = ({ comment }: CommentRowProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    Clipboard.setString(comment);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.commentRow}>
      <AppText
        style={styles.commentText}
        fontSize={fontSize.smallM}
        fontFamily={fontFamily.Regular}
        color={colors.textLighter}
      >
        {comment}
      </AppText>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleCopy}
        style={styles.copyBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Icon
          name={copied ? 'check' : 'copy'}
          size={15}
          color={copied ? colors.blueNormal : colors.placeholderText}
        />
      </TouchableOpacity>
    </View>
  );
};

// ─── Category section ─────────────────────────────────────────────────────────
interface CategorySectionProps {
  category: string;
  comments: string[];
}

const CategorySection = ({ category, comments }: CategorySectionProps) => (
  <View style={styles.categoryGroup}>
    <AppText
      style={styles.categoryTitle}
      fontSize={fontSize.smallM}
      fontFamily={fontFamily.Bold}
      color={colors.textDark}
    >
      {category}
    </AppText>
    {comments.map((comment, index) => (
      <CommentRow key={`${category}-${index}`} comment={comment} />
    ))}
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const CommentExamples = ({ navigation }: any) => {
  const { data, isLoading, isError, refetch } = useGetCommentExamplesQuery();
  const commentExamples = data?.commentExamples ?? [];
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!query.trim()) return commentExamples;
    const lower = query.toLowerCase();
    return commentExamples
      .map(item => {
        // If category title matches → show all its comments
        if (item.category.toLowerCase().includes(lower)) return item;
        // Otherwise filter individual comments by keyword
        const matchedComments = item.comments.filter(c =>
          c.toLowerCase().includes(lower),
        );
        return matchedComments.length > 0
          ? { ...item, comments: matchedComments }
          : null;
      })
      .filter(Boolean) as typeof commentExamples;
  }, [query, commentExamples]);

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader title="Comment Examples" showBackground containerStyle={headerContainerStyle} />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <CommentExamplesSkeleton />
        ) : isError ? (
          <View style={styles.errorWrap}>
            <Icon name="alert-circle" size={36} color={colors.placeholderText} />
            <AppText
              style={styles.errorText}
              fontSize={fontSize.smallM}
              fontFamily={fontFamily.Regular}
              color={colors.placeholderText}
            >
              Failed to load comment examples.
            </AppText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => refetch()}
              style={styles.retryBtn}
            >
              <AppText
                fontSize={fontSize.smallM}
                fontFamily={fontFamily.Bold}
                color={colors.white}
              >
                Retry
              </AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <AppText
              style={styles.subtitle}
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.blueNormal}
            >
              Pre-written comments for copy/paste into appraisal reports
            </AppText>

            {/* Search bar */}
            <View style={styles.searchWrap}>
              <Icon name="search" size={16} color={colors.placeholderText} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by category or keyword..."
                placeholderTextColor={colors.placeholderText}
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
              {query.length > 0 && (
                <TouchableOpacity
                  onPress={() => setQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Icon name="x" size={15} color={colors.placeholderText} />
                </TouchableOpacity>
              )}
            </View>

            {filtered.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Icon name="search" size={36} color={colors.placeholderText} />
                <AppText
                  style={styles.emptyText}
                  fontSize={fontSize.smallM}
                  fontFamily={fontFamily.Regular}
                  color={colors.placeholderText}
                >
                  {commentExamples.length === 0
                    ? 'No comment examples found.'
                    : 'No results for your search.'}
                </AppText>
              </View>
            ) : (
              filtered.map(item => (
                <CategorySection
                  key={item._id}
                  category={item.category}
                  comments={item.comments}
                />
              ))
            )}
          </>
        )}
      </AppScrollView>
    </Wrapper>
  );
};

export default CommentExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingTop: sizes.screenHeight * 0.022,
    paddingBottom: sizes.screenHeight * 0.04,
  },
  subtitle: {
    marginBottom: sizes.screenHeight * 0.014,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.03,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: sizes.screenWidth * 0.035,
    height: sizes.screenHeight * 0.055,
    marginBottom: sizes.screenHeight * 0.022,
  },
  searchIcon: {
    marginRight: sizes.screenWidth * 0.025,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Regular,
    color: colors.textDark,
    padding: 0,
  },
  categoryGroup: {
    marginBottom: sizes.screenHeight * 0.024,
  },
  categoryTitle: {
    marginBottom: sizes.screenHeight * 0.012,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.025,
    borderWidth: 1,
    borderColor: '#E6E8EF',
    paddingVertical: sizes.screenHeight * 0.016,
    paddingHorizontal: sizes.screenWidth * 0.04,
    marginBottom: sizes.screenHeight * 0.01,
  },
  commentText: {
    flex: 1,
    lineHeight: 20,
  },
  copyBtn: {
    marginLeft: sizes.screenWidth * 0.03,
    padding: 2,
  },
  errorWrap: {
    alignItems: 'center',
    paddingTop: sizes.screenHeight * 0.1,
    gap: sizes.screenHeight * 0.012,
  },
  errorText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.008,
  },
  retryBtn: {
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.08,
    paddingVertical: sizes.screenHeight * 0.012,
    marginTop: sizes.screenHeight * 0.01,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: sizes.screenHeight * 0.1,
    gap: sizes.screenHeight * 0.012,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.008,
  },
});
