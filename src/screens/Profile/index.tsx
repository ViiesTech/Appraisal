import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
    Wrapper,
    AppText,
    AppHeader,
    AppScrollView,
    StatsCards,
    AppImage,
} from '../../components';
import { colors, fontFamily, fontSize, sizes } from '../../services/utilities';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import type { ViewStyle } from 'react-native';

const headerContainerStyle: ViewStyle = {
    paddingTop: sizes.screenHeight * 0.03,
    backgroundColor: colors.white,
};

const profileStats = [
    { id: '1', icon: 'book-open', value: '156', title: 'Total Projects' },
    { id: '2', icon: 'trending-up', value: '98%', title: 'Success Rate' },
    { id: '3', icon: 'star', value: '4.9', title: 'Avg Rating' },
    { id: '4', icon: 'calendar', value: '10y', title: 'Experience' },
];

const activities = [
    {
        id: '1',
        title: 'Completed Report',
        subtitle: '1234 Oak Street',
        time: '1 hour ago',
        icon: 'file-text',
    },
    {
        id: '2',
        title: 'Inspection Scheduled',
        subtitle: '5678 Pine Avenue',
        time: '5 hours ago',
        icon: 'calendar',
    },
    {
        id: '3',
        title: 'New Assignment',
        subtitle: '9012 Maple Drive',
        time: '1 day ago',
        icon: 'star',
    },
];

const Profile = ({ navigation }: any) => {
    const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

    const handlePickProfileImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 0.8,
            });

            if (result.didCancel) {
                return;
            }

            if (result.errorCode) {
                Alert.alert('Image Picker', result.errorMessage || 'Unable to select image');
                return;
            }

            const selectedAsset = result.assets?.[0];
            if (selectedAsset?.uri) {
                setProfileImageUri(selectedAsset.uri);
            }
        } catch {
            Alert.alert('Image Picker', 'Something went wrong while selecting image');
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
                showBackground
                hideBackButton
                containerStyle={headerContainerStyle}
                rightActionNode={
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={styles.settingsBtn}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Icon name="settings" size={14} color={colors.blueNormal} />
                    </TouchableOpacity>
                }
                renderCustomTabs={
                    <View style={styles.profileHeadWrap}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.avatarWrap}
                            onPress={handlePickProfileImage}
                        >
                            {profileImageUri ? (
                                <AppImage
                                    source={{ uri: profileImageUri }}
                                    style={styles.avatarImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Icon name="user" size={32} color={colors.blueNormal} />
                            )}
                            <View style={styles.avatarEditBadge}>
                                <Icon name="edit-2" size={9} color={colors.blueNormal} />
                            </View>
                        </TouchableOpacity>
                        <AppText
                            fontSize={fontSize.h6}
                            fontFamily={fontFamily.Bold}
                            color={colors.white}
                            style={styles.nameText}
                        >
                            John Anderson
                        </AppText>
                        <AppText
                            fontSize={fontSize.small}
                            fontFamily={fontFamily.Regular}
                            color={colors.textBlue}
                        >
                            Level 3 - Senior Appraiser
                        </AppText>
                    </View>
                }
            />

            <AppScrollView contentContainerStyle={styles.scrollContent}>
                <StatsCards data={profileStats} />

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
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeaderBetween}>
                        <AppText style={styles.cardTitle}>About Me</AppText>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('EditProfile')}>
                            <AppText style={styles.editLink}>Edit</AppText>
                        </TouchableOpacity>
                    </View>
                    <AppText style={styles.aboutText}>
                        Certified Real Estate Appraiser with 10+ years of experience in residential and commercial property valuation.
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
                            <AppText style={styles.contactValue}>john.anderson@example.com</AppText>
                        </View>
                    </View>

                    <View style={styles.contactCardRow}>
                        <View style={styles.contactIconWrap}>
                            <Icon name="phone" size={14} color={colors.placeholderText} />
                        </View>
                        <View>
                            <AppText style={styles.contactLabel}>Phone Number</AppText>
                            <AppText style={styles.contactValue}>+1 (555) 123-4567</AppText>
                        </View>
                    </View>

                    <View style={styles.contactCardRow}>
                        <View style={styles.contactIconWrap}>
                            <Icon name="map-pin" size={14} color={colors.placeholderText} />
                        </View>
                        <View>
                            <AppText style={styles.contactLabel}>Location</AppText>
                            <AppText style={styles.contactValue}>San Francisco, CA</AppText>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <AppText style={styles.cardTitle}>Recent Activity</AppText>
                    {activities.map(item => (
                        <View key={item.id} style={styles.activityRow}>
                            <View style={styles.activityIconWrap}>
                                <Icon name={item.icon} size={13} color={colors.placeholderText} />
                            </View>
                            <View style={styles.activityContent}>
                                <AppText style={styles.activityTitle}>{item.title}</AppText>
                                <AppText style={styles.activitySub}>{item.subtitle}</AppText>
                                <AppText style={styles.activityTime}>{item.time}</AppText>
                            </View>
                        </View>
                    ))}
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
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white,
        borderRadius: sizes.screenWidth * 0.03,
        paddingHorizontal: sizes.screenWidth * 0.03,
        paddingVertical: sizes.screenHeight * 0.006,
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
});
