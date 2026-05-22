import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Wrapper,
  AppText,
  AppHeader,
  AppScrollView,
  StatsCards,
  AppImage,
  RecentActivitySkeleton,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import type { ViewStyle } from 'react-native';
import moment from 'moment';
import { useGetRecentActivityQuery, useGetProfileQuery } from '../../redux/api/apiSlice';

const headerContainerStyle: ViewStyle = {
  paddingTop: sizes.screenHeight * 0.03,
  paddingBottom: sizes.screenHeight * 0.01,
  backgroundColor: colors.white,
};

const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'Auth':
      return 'log-in';
    case 'Upload':
      return 'upload';
    case 'Delete':
      return 'trash-2';
    case 'Update':
      return 'edit-2';
    default:
      return 'activity';
  }
};

const Profile = ({ navigation }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  // Trigger a fresh profile fetch on mount; extraReducers in authSlice
  // merges the response into state.auth.user automatically.
  useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true });
  const performance = user?.performance || {};

  const { data: activityData, isLoading: isActivityLoading } =
    useGetRecentActivityQuery({ page: 1, limit: 10 });
  const activities = activityData?.activities ?? [];

  const profileStats = [
    {
      id: '1',
      icon: 'book-open',
      value: performance.totalOrders?.toString() || '0',
      title: 'Total Projects',
    },
    {
      id: '2',
      icon: 'trending-up',
      value:
        performance.completionRatePercent !== undefined
          ? `${performance.completionRatePercent}%`
          : '0%',
      title: 'Success Rate',
    },
    {
      id: '3',
      icon: 'star',
      value: performance.avgTurnAroundDays?.toString() || '0',
      title: 'Avg Rating',
    },
    {
      id: '4',
      icon: 'award',
      value: (performance.completedOrders || 0).toString(),
      title: 'Completed',
    },
  ];

  return (
    <Wrapper
      style={styles.container}
    >
      <AppHeader
        showBackground
        hideBackButton
        containerStyle={headerContainerStyle}
        rightActionNode={
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={18} color={colors.blueNormal} />
          </TouchableOpacity>
        }
        renderCustomTabs={
          <View style={styles.profileHeadWrap}>
            <View style={styles.avatarWrap}>
              {user?.profile ? (
                <AppImage
                  source={{ uri: user.profile }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Icon name="user" size={32} color={colors.blueNormal} />
              )}
            </View>
            <AppText
              fontSize={fontSize.h6}
              fontFamily={fontFamily.Bold}
              color={colors.white}
              style={styles.nameText}
            >
              {user?.firstName} {user?.lastName}
            </AppText>
            <AppText
              fontSize={fontSize.small}
              fontFamily={fontFamily.Regular}
              color={colors.textBlue}
            >
              {user?.role?.toUpperCase()} - {user?.profession || 'Appraiser'}
            </AppText>
          </View>
        }
      />

      <AppScrollView contentContainerStyle={styles.scrollContent}>
        <StatsCards data={profileStats} />
        {/* 
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderLeft}>
                            <Icon name="award" size={14} color={colors.blueNormal} />
                            <AppText style={styles.cardTitle}>Achievements</AppText>
                        </View>
                    </View>
                    <View style={styles.achievementRow}>
                        <View style={styles.achievementChip}>
                            <Icon name="award" size={12} color={'#F59E0B'} />
                            <AppText style={styles.achievementText}>Top Performer</AppText>
                        </View>
                        <View style={styles.achievementChip}>
                            <Icon name="zap" size={12} color={'#FBBF24'} />
                            <AppText style={styles.achievementText}>Quick Response</AppText>
                        </View>
                    </View>
                </View> */}

        <View style={styles.card}>
          <View style={styles.cardHeaderBetween}>
            <AppText style={styles.cardTitle}>About Me</AppText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <AppText style={styles.editLink}>Edit</AppText>
            </TouchableOpacity>
          </View>
          <AppText style={styles.aboutText}>
            {user?.bio || 'No bio provided yet.'}
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText style={styles.cardTitle}>Contact Information</AppText>

          <View style={styles.contactCardRow}>
            <View style={styles.contactIconWrap}>
              <Icon name="mail" size={14} color={colors.placeholderText} />
            </View>
            <View>
              <AppText style={styles.contactLabel}>Email Address</AppText>
              <AppText style={styles.contactValue}>{user?.email}</AppText>
            </View>
          </View>

          {user?.phoneNumber && (
            <View style={styles.contactCardRow}>
              <View style={styles.contactIconWrap}>
                <Icon name="phone" size={14} color={colors.placeholderText} />
              </View>
              <View>
                <AppText style={styles.contactLabel}>Phone Number</AppText>
                <AppText style={styles.contactValue}>
                  {user.phoneNumber}
                </AppText>
              </View>
            </View>
          )}

          {user?.location?.address && (
            <View style={styles.contactCardRow}>
              <View style={styles.contactIconWrap}>
                <Icon name="map-pin" size={14} color={colors.placeholderText} />
              </View>
              <View>
                <AppText style={styles.contactLabel}>Location</AppText>
                <AppText style={styles.contactValue}>
                  {user.location.address}
                </AppText>
              </View>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <AppText style={styles.cardTitle}>Recent Activity</AppText>
          {isActivityLoading ? (
            <RecentActivitySkeleton />
          ) : activities.length === 0 ? (
            <AppText style={styles.activitySub}>No recent activity.</AppText>
          ) : (
            activities.map(item => (
              <View key={item._id} style={styles.activityRow}>
                <View style={styles.activityIconWrap}>
                  <Icon
                    name={getActivityIcon(item.type)}
                    size={13}
                    color={colors.placeholderText}
                  />
                </View>
                <View style={styles.activityContent}>
                  <AppText style={styles.activityTitle}>{item.action}</AppText>
                  <AppText style={styles.activitySub}>{item.description}</AppText>
                  <AppText style={styles.activityTime}>
                    {moment(item.createdAt).fromNow()}
                  </AppText>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <AppText style={styles.cardTitle}>Tools & Resources</AppText>
          <TouchableOpacity
            style={styles.toolRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notes')}
          >
            <View style={styles.toolRowLeft}>
              <View style={styles.toolIconWrap}>
                <Icon name="file-text" size={15} color={colors.blueNormal} />
              </View>
              <View>
                <AppText style={styles.toolTitle}>Admin Notes</AppText>
                <AppText style={styles.toolSub}>Notes shared by admin</AppText>
              </View>
            </View>
            <Icon name="chevron-right" size={16} color={colors.placeholderText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CommentExamples')}
          >
            <View style={styles.toolRowLeft}>
              <View style={styles.toolIconWrap}>
                <Icon name="message-square" size={15} color={colors.blueNormal} />
              </View>
              <View>
                <AppText style={styles.toolTitle}>Comment Examples</AppText>
                <AppText style={styles.toolSub}>Pre-written report comments</AppText>
              </View>
            </View>
            <Icon name="chevron-right" size={16} color={colors.placeholderText} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.editProfileBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <AppText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.Bold}
            color={colors.white}
          >
            Edit Profile
          </AppText>
        </TouchableOpacity>
      </AppScrollView>
    </Wrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.AppBG,
  },
  profileHeadWrap: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.004,
  },
  settingsBtn: {
    marginLeft: 'auto',
position: 'absolute',
    right: sizes.screenWidth * 0.01,
    // top: sizes.screenHeight * 0.01,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.0065,
  },
  avatarWrap: {
    width: sizes.screenWidth * 0.14,
    height: sizes.screenWidth * 0.14,
    borderRadius: sizes.screenWidth * 0.035,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: sizes.screenWidth * 0.045,
    height: sizes.screenWidth * 0.045,
    borderRadius: sizes.screenWidth * 0.022,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  nameText: {
    marginTop: sizes.screenHeight * 0.014,
    marginBottom: 2,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingTop: sizes.screenHeight * 0.012,
    paddingBottom: sizes.screenHeight * 0.03,
    gap: sizes.screenHeight * 0.012,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.05,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.014,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: sizes.screenHeight * 0.01,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.015,
  },
  cardHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.screenHeight * 0.008,
  },
  cardTitle: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
  },
  editLink: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.blueNormal,
  },
  achievementRow: {
    flexDirection: 'row',
    gap: sizes.screenWidth * 0.02,
  },
  achievementChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.screenWidth * 0.025,
    paddingVertical: sizes.screenHeight * 0.008,
    borderRadius: sizes.screenWidth * 0.02,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: sizes.screenWidth * 0.012,
  },
  achievementText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
  },
  aboutText: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
    lineHeight: 20,
  },
  contactRow: {
    display: 'none',
  },
  contactCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.screenHeight * 0.008,
    paddingHorizontal: sizes.screenWidth * 0.02,
    borderRadius: sizes.screenWidth * 0.025,
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: '#ECEFF5',
    marginTop: sizes.screenHeight * 0.008,
  },
  contactIconWrap: {
    width: sizes.screenWidth * 0.07,
    height: sizes.screenWidth * 0.07,
    borderRadius: sizes.screenWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    marginRight: sizes.screenWidth * 0.025,
  },
  contactLabel: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
  },
  contactValue: {
    marginTop: 2,
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: sizes.screenHeight * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F4',
  },
  activityIconWrap: {
    width: sizes.screenWidth * 0.06,
    height: sizes.screenWidth * 0.06,
    borderRadius: sizes.screenWidth * 0.018,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    marginRight: sizes.screenWidth * 0.025,
    marginTop: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Bold,
    color: colors.textDark,
  },
  activitySub: {
    marginTop: 1,
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.textLighter,
  },
  activityTime: {
    marginTop: 2,
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.placeholderText,
  },
  editProfileBtn: {
    marginTop: sizes.screenHeight * 0.004,
    backgroundColor: colors.blueNormal,
    borderRadius: sizes.screenWidth * 0.03,
    minHeight: sizes.screenHeight * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sizes.screenHeight * 0.012,
  },
  toolRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.screenWidth * 0.03,
    flex: 1,
  },
  toolIconWrap: {
    width: sizes.screenWidth * 0.09,
    height: sizes.screenWidth * 0.09,
    borderRadius: sizes.screenWidth * 0.022,
    backgroundColor: colors.blueGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolTitle: {
    fontSize: fontSize.smallM,
    fontFamily: fontFamily.Medium,
    color: colors.textDark,
  },
  toolSub: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: colors.placeholderText,
    marginTop: 2,
  },
});
