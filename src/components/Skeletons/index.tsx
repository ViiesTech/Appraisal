/**
 * Skeletons/index.tsx
 *
 * All skeleton loader components live here.
 * Every skeleton mirrors the exact layout / sizing of the real UI component
 * so there is no visual "jump" when data arrives.
 *
 * Package: react-native-skeleton-placeholder
 * Peer deps: react-native-linear-gradient, @react-native-masked-view/masked-view
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors, sizes, fontSize } from '../../utils';

// ─── Shared token ─────────────────────────────────────────────────────────────
const SPEED = 1200; // ms per shimmer cycle
const BG = colors.borderLight;     // shimmer background
const HL = colors.blueGrey;        // shimmer highlight

const W = sizes.screenWidth;
const H = sizes.screenHeight;

// ─── 1. Stats Cards (2 × 2 grid on Home & Profile) ────────────────────────────
/**
 * Matches StatsCards component: 4 cards in a 2-column wrapped grid.
 * Each card has an icon circle, a big value number, and a title label.
 */
export const StatsCardsSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.statsGrid}>
            {[0, 1, 2, 3].map((i) => (
                <View key={i} style={skStyles.statsCard}>
                    <View style={skStyles.statsCardInner}>
                        {/* header row: icon circle + big value */}
                        <View style={skStyles.statsHeaderRow}>
                            <View style={skStyles.statsIconCircle} />
                            <View style={skStyles.statsValue} />
                        </View>
                        {/* title */}
                        <View style={skStyles.statsTitle} />
                    </View>
                </View>
            ))}
        </View>
    </SkeletonPlaceholder>
);

// ─── 2. Template Library Card ─────────────────────────────────────────────────
/**
 * Matches TemplateLibraryCard: single row with icon circle, label, chevron.
 */
export const TemplateLibraryCardSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.templateCard}>
            <View style={skStyles.templateIconCircle} />
            <View style={skStyles.templateLabel} />
            <View style={skStyles.templateChevron} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 3. Today Schedule Item ───────────────────────────────────────────────────
/**
 * Mirrors one row of TodaySchedule:
 * coloured time-box on the left + address / type / company on the right.
 */
export const TodayScheduleItemSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.scheduleItem}>
            <View style={skStyles.scheduleTimeBox} />
            <View style={skStyles.scheduleDetails}>
                <View style={skStyles.scheduleRow}>
                    <View style={skStyles.scheduleIconDot} />
                    <View style={skStyles.scheduleAddress} />
                </View>
                <View style={skStyles.scheduleType} />
                <View style={skStyles.scheduleCompany} />
            </View>
        </View>
    </SkeletonPlaceholder>
);

// ─── 4. Today Schedule (3 items + header) ─────────────────────────────────────
export const TodayScheduleSkeleton = () => (
    <View style={skStyles.sectionContainer}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.sectionHeader}>
                <View style={skStyles.sectionTitle} />
                <View style={skStyles.sectionLink} />
            </View>
        </SkeletonPlaceholder>
        <TodayScheduleItemSkeleton />
        <TodayScheduleItemSkeleton />
        <TodayScheduleItemSkeleton />
    </View>
);

// ─── 4b. Today Schedule inner (no header — used inside ShadowCard) ────────────
export const TodayScheduleInnerSkeleton = () => (
    <View style={{ gap: 12 }}>
        <TodayScheduleItemSkeleton />
        <TodayScheduleItemSkeleton />
    </View>
);

// ─── 5. Task Card (single card) ───────────────────────────────────────────────
/**
 * Mirrors TaskCard (task variant):
 * - statusRow: dot + status text (left) | priority pill (right)
 * - address 2 lines
 * - progress label row + progress bar
 * - bottom row: org name (left) | due date (right)
 */
export const TaskCardSkeleton = () => (
    <View style={skStyles.taskCardShell}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.taskCard}>
                {/* status dot + text LEFT, priority pill RIGHT */}
                <View style={skStyles.taskStatusRow}>
                    <View style={skStyles.taskStatusLeft}>
                        <View style={skStyles.taskStatusDot} />
                        <View style={skStyles.taskStatusText} />
                    </View>
                    <View style={skStyles.taskPriorityBadge} />
                </View>
                {/* address */}
                <View style={skStyles.taskAddressLine1} />
                <View style={skStyles.taskAddressLine2} />
                {/* progress label row */}
                <View style={skStyles.taskProgressLabelRow}>
                    <View style={skStyles.taskProgressLabel} />
                    <View style={skStyles.taskProgressPct} />
                </View>
                {/* progress bar */}
                <View style={skStyles.taskProgressBarBG} />
                {/* bottom row: org name left, due date right */}
                <View style={skStyles.taskBottomRow}>
                    <View style={skStyles.taskOrgName} />
                    <View style={skStyles.taskDueDateText} />
                </View>
            </View>
        </SkeletonPlaceholder>
    </View>
);

// ─── 6. Active Assignments (header + 3 task cards) ────────────────────────────
export const ActiveAssignmentsSkeleton = () => (
    <View style={skStyles.sectionContainer}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.sectionHeader}>
                <View style={skStyles.sectionTitle} />
                <View style={skStyles.sectionLink} />
            </View>
        </SkeletonPlaceholder>
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
    </View>
);

// ─── 6b. Active Assignments inner (no header — used inside ShadowCard) ────────
export const ActiveAssignmentsInnerSkeleton = () => (
    <View style={{ gap: 12 }}>
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
    </View>
);

// ─── 7. Certificate Item (single row) ─────────────────────────────────────────
/**
 * One row: icon box | name + meta | action button
 */
export const CertificateItemSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.certItem}>
            <View style={skStyles.certIconBox} />
            <View style={skStyles.certDetails}>
                <View style={skStyles.certName} />
                <View style={skStyles.certMeta} />
            </View>
            <View style={skStyles.certAction} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 8. Certificate Upload Card ───────────────────────────────────────────────
/**
 * The top ShadowCard in HomeCertificates:
 * header row → dashed upload zone (circle + 3 text lines + button) → info box
 */
export const CertificateUploadCardSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.certUploadCard}>
            {/* header row */}
            <View style={skStyles.certUploadHeaderRow}>
                <View style={skStyles.certUploadLockIcon} />
                <View style={skStyles.certUploadTitle} />
            </View>
            {/* upload zone */}
            <View style={skStyles.certUploadZone}>
                <View style={skStyles.certUploadIconCircle} />
                <View style={skStyles.certUploadZoneTitle} />
                <View style={skStyles.certUploadZoneSub} />
                <View style={skStyles.certUploadBtn} />
            </View>
            {/* info box */}
            <View style={skStyles.certInfoBox}>
                <View style={skStyles.certInfoIcon} />
                <View style={skStyles.certInfoText}>
                    <View style={skStyles.certInfoTitle} />
                    <View style={skStyles.certInfoDesc} />
                </View>
            </View>
        </View>
    </SkeletonPlaceholder>
);

// ─── 9. Certificate List Card (header + 3 items) ──────────────────────────────
export const CertificateListSkeleton = () => (
    <View style={skStyles.certListCard}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.certListHeader} />
        </SkeletonPlaceholder>
        <View style={skStyles.certListItems}>
            <CertificateItemSkeleton />
            <CertificateItemSkeleton />
            <CertificateItemSkeleton />
        </View>
    </View>
);

// ─── 10. Profile Header Section ───────────────────────────────────────────────
/**
 * Profile screen top: avatar circle, name, role label, location badge.
 */
export const ProfileHeaderSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.profileHeader}>
            <View style={skStyles.profileAvatar} />
            <View style={skStyles.profileName} />
            <View style={skStyles.profileRole} />
            <View style={skStyles.profileLocation} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 11. Profile Activity Item ────────────────────────────────────────────────
export const ActivityItemSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.activityItem}>
            <View style={skStyles.activityIcon} />
            <View style={skStyles.activityContent}>
                <View style={skStyles.activityTitle} />
                <View style={skStyles.activitySubtitle} />
            </View>
            <View style={skStyles.activityTime} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 12. Recent Activity Item ────────────────────────────────────────────────
/**
 * Mirrors one row of the Recent Activity card:
 * icon square | action title + description line + relative-time line.
 */
export const RecentActivityItemSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.recentActivityItem}>
            <View style={skStyles.recentActivityIcon} />
            <View style={skStyles.recentActivityContent}>
                <View style={skStyles.recentActivityTitle} />
                <View style={skStyles.recentActivityDesc} />
                <View style={skStyles.recentActivityTime} />
            </View>
        </View>
    </SkeletonPlaceholder>
);

// ─── 13. Recent Activity Section (3 items) ────────────────────────────────────
export const RecentActivitySkeleton = () => (
    <View>
        <RecentActivityItemSkeleton />
        <RecentActivityItemSkeleton />
        <RecentActivityItemSkeleton />
    </View>
);

// ─── 14. Notification Card (single item) ─────────────────────────────────────
/**
 * Mirrors one notification card:
 * icon square | content (title + unread dot, description × 2, time).
 */
export const NotificationCardSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.notifCard}>
            <View style={skStyles.notifIcon} />
            <View style={skStyles.notifContent}>
                <View style={skStyles.notifHeaderRow}>
                    <View style={skStyles.notifTitle} />
                    <View style={skStyles.notifDot} />
                </View>
                <View style={skStyles.notifDesc1} />
                <View style={skStyles.notifDesc2} />
                <View style={skStyles.notifTime} />
            </View>
        </View>
    </SkeletonPlaceholder>
);

// ─── 15. Notifications List (5 cards) ────────────────────────────────────────
export const NotificationsSkeleton = () => (
    <View>
        {[0, 1, 2, 3, 4].map(i => (
            <NotificationCardSkeleton key={i} />
        ))}
    </View>
);

// ─── 16. Template Item (single row) ──────────────────────────────────────────
/**
 * Mirrors one template card: file icon box | name + category badge + size | action icon
 */
export const TemplateItemSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.templateItemRow}>
            <View style={skStyles.templateItemIcon} />
            <View style={skStyles.templateItemDetails}>
                <View style={skStyles.templateItemName} />
                <View style={skStyles.templateItemMeta} />
            </View>
            <View style={skStyles.templateItemAction} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 17. Template List (3 rows + section title) ───────────────────────────────
export const TemplateListSkeleton = () => (
    <View style={skStyles.templateListWrap}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.templateListTitle} />
        </SkeletonPlaceholder>
        <TemplateItemSkeleton />
        <TemplateItemSkeleton />
        <TemplateItemSkeleton />
    </View>
);

// ─── 18. Comment Example Row (single comment item) ────────────────────────────
const CommentExampleRowSkeleton = () => (
    <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
        <View style={skStyles.commentExRow}>
            <View style={skStyles.commentExText} />
            <View style={skStyles.commentExCopyBtn} />
        </View>
    </SkeletonPlaceholder>
);

// ─── 19. Comment Example Category Group (title + 2 rows) ─────────────────────
const CommentExampleGroupSkeleton = () => (
    <View style={skStyles.commentExCategoryGroup}>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.commentExCategoryTitle} />
        </SkeletonPlaceholder>
        <CommentExampleRowSkeleton />
        <CommentExampleRowSkeleton />
    </View>
);

// ─── 20. Comment Examples Screen (subtitle + 3 groups) ───────────────────────
export const CommentExamplesSkeleton = () => (
    <View>
        <SkeletonPlaceholder speed={SPEED} backgroundColor={BG} highlightColor={HL}>
            <View style={skStyles.commentExSubtitle} />
        </SkeletonPlaceholder>
        <CommentExampleGroupSkeleton />
        <CommentExampleGroupSkeleton />
        <CommentExampleGroupSkeleton />
    </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const R = (n: number) => Math.round(n); // alias for readability

const skStyles = StyleSheet.create({
    // ── Stats Cards ──────────────────────────────────────────────
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statsCard: {
        width: W * 0.43,
        height: R(W * 0.28),
        borderRadius: R(W * 0.04),
        marginBottom: R(W * 0.04),
        backgroundColor: BG,
        overflow: 'hidden',
    },
    statsCardInner: {
        flex: 1,
        padding: R(W * 0.04),
        justifyContent: 'space-between',
    },
    statsHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statsIconCircle: {
        width: R(W * 0.08),
        height: R(W * 0.08),
        borderRadius: R(W * 0.04),
        backgroundColor: BG,
    },
    statsValue: {
        width: R(W * 0.18),
        height: R(H * 0.025),
        borderRadius: 6,
        backgroundColor: BG,
    },
    statsTitle: {
        width: R(W * 0.28),
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
        marginTop: R(H * 0.01),
    },

    // ── Template Library Card ─────────────────────────────────────
    templateCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: R(W * 0.04),
        borderRadius: R(W * 0.03),
        backgroundColor: BG,
        marginBottom: R(H * 0.015),
        height: R(H * 0.07),
    },
    templateIconCircle: {
        width: R(W * 0.1),
        height: R(W * 0.1),
        borderRadius: R(W * 0.05),
        backgroundColor: BG,
    },
    templateLabel: {
        flex: 1,
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginLeft: R(W * 0.03),
        marginRight: R(W * 0.06),
    },
    templateChevron: {
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: BG,
    },

    // ── Section headers (shared by Schedule & Assignments) ────────
    sectionContainer: {
        marginBottom: R(H * 0.02),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: R(H * 0.015),
        paddingHorizontal: 2,
    },
    sectionTitle: {
        width: R(W * 0.35),
        height: 16,
        borderRadius: 6,
        backgroundColor: BG,
    },
    sectionLink: {
        width: R(W * 0.18),
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },

    // ── Today Schedule Item ───────────────────────────────────────
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: R(W * 0.03),
        backgroundColor: BG,
        marginBottom: R(H * 0.012),
        padding: R(W * 0.03),
        height: R(H * 0.1),
    },
    scheduleTimeBox: {
        width: R(W * 0.2),
        height: '100%',
        borderRadius: R(W * 0.02),
        backgroundColor: BG,
    },
    scheduleDetails: {
        flex: 1,
        marginLeft: R(W * 0.03),
        justifyContent: 'space-between',
    },
    scheduleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleIconDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
        marginRight: 6,
    },
    scheduleAddress: {
        flex: 1,
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },
    scheduleType: {
        width: R(W * 0.28),
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
        marginTop: 6,
    },
    scheduleCompany: {
        width: R(W * 0.22),
        height: 11,
        borderRadius: 6,
        backgroundColor: BG,
        marginTop: 4,
    },

    // ── Task Card ─────────────────────────────────────────────────
    taskCardShell: {
        backgroundColor: colors.white,
        borderRadius: R(W * 0.03),
        borderWidth: 1,
        borderColor: '#E6E8EF',
        padding: R(W * 0.04),
        marginBottom: R(H * 0.012),
    },
    taskCard: {
        // inner layout container — no bg/border (shell handles those)
    },
    taskStatusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: R(H * 0.01),
    },
    taskStatusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    taskStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: BG,
    },
    taskStatusText: {
        width: R(W * 0.22),
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
    },
    taskPriorityBadge: {
        width: R(W * 0.18),
        height: 24,
        borderRadius: 6,
        backgroundColor: BG,
    },
    taskAddressLine1: {
        width: '90%',
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 5,
    },
    taskAddressLine2: {
        width: '60%',
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.014),
    },
    taskProgressLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    taskProgressLabel: {
        width: R(W * 0.15),
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    taskProgressPct: {
        width: R(W * 0.08),
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    taskProgressBarBG: {
        width: '100%',
        height: 6,
        borderRadius: 3,
        backgroundColor: BG,
        marginBottom: R(H * 0.012),
    },
    taskBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskOrgName: {
        width: R(W * 0.38),
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },
    taskDueDateText: {
        width: R(W * 0.28),
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    // ── Certificate Upload Card ───────────────────────────────────
    certUploadCard: {
        borderRadius: R(W * 0.04),
        backgroundColor: BG,
        padding: R(W * 0.05),
        marginTop: R(H * 0.02),
    },
    certUploadHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: R(H * 0.025),
    },
    certUploadLockIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: BG,
        marginRight: R(W * 0.02),
    },
    certUploadTitle: {
        width: R(W * 0.45),
        height: 16,
        borderRadius: 6,
        backgroundColor: BG,
    },
    certUploadZone: {
        borderRadius: R(W * 0.03),
        backgroundColor: BG,
        padding: R(H * 0.04),
        alignItems: 'center',
        marginBottom: R(H * 0.02),
    },
    certUploadIconCircle: {
        width: R(W * 0.15),
        height: R(W * 0.15),
        borderRadius: R(W * 0.075),
        backgroundColor: BG,
        marginBottom: R(H * 0.015),
    },
    certUploadZoneTitle: {
        width: R(W * 0.4),
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 8,
    },
    certUploadZoneSub: {
        width: R(W * 0.5),
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.015),
    },
    certUploadBtn: {
        width: R(W * 0.38),
        height: 38,
        borderRadius: 20,
        backgroundColor: BG,
    },
    certInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: R(W * 0.03),
        padding: R(W * 0.04),
        backgroundColor: BG,
        height: R(H * 0.09),
    },
    certInfoIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: BG,
        marginRight: R(W * 0.03),
    },
    certInfoText: {
        flex: 1,
        justifyContent: 'space-between',
    },
    certInfoTitle: {
        width: R(W * 0.35),
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 6,
    },
    certInfoDesc: {
        width: '80%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },

    // ── Certificate List Card ─────────────────────────────────────
    certListCard: {
        borderRadius: R(W * 0.04),
        backgroundColor: colors.white,
        padding: R(W * 0.05),
        marginVertical: R(H * 0.02),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    certListHeader: {
        width: R(W * 0.45),
        height: 16,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.015),
    },
    certListItems: {
        gap: R(W * 0.03),
    },

    // ── Certificate Item ──────────────────────────────────────────
    certItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: R(W * 0.03),
        backgroundColor: BG,
        padding: R(W * 0.04),
        marginBottom: 0,
        height: R(H * 0.075),
    },
    certIconBox: {
        width: R(W * 0.12),
        height: R(W * 0.12),
        borderRadius: R(W * 0.02),
        backgroundColor: BG,
    },
    certDetails: {
        flex: 1,
        marginLeft: R(W * 0.03),
        justifyContent: 'center',
    },
    certName: {
        width: '70%',
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 7,
    },
    certMeta: {
        width: '45%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    certAction: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: BG,
    },

    // ── Profile Header ────────────────────────────────────────────
    profileHeader: {
        alignItems: 'center',
        paddingVertical: R(H * 0.03),
        paddingHorizontal: R(W * 0.06),
    },
    profileAvatar: {
        width: R(W * 0.25),
        height: R(W * 0.25),
        borderRadius: R(W * 0.125),
        backgroundColor: BG,
        marginBottom: R(H * 0.015),
    },
    profileName: {
        width: R(W * 0.5),
        height: 20,
        borderRadius: 8,
        backgroundColor: BG,
        marginBottom: 10,
    },
    profileRole: {
        width: R(W * 0.3),
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 10,
    },
    profileLocation: {
        width: R(W * 0.45),
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
    },

    // ── Activity Item ─────────────────────────────────────────────
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: R(H * 0.015),
        borderRadius: R(W * 0.02),
        height: R(H * 0.07),
    },
    activityIcon: {
        width: R(W * 0.1),
        height: R(W * 0.1),
        borderRadius: R(W * 0.05),
        backgroundColor: BG,
    },
    activityContent: {
        flex: 1,
        marginLeft: R(W * 0.03),
    },
    activityTitle: {
        width: '65%',
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 6,
    },
    activitySubtitle: {
        width: '45%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    activityTime: {
        width: R(W * 0.2),
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },

    // ── Recent Activity Item ──────────────────────────────────────
    recentActivityItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: R(H * 0.01),
        borderBottomWidth: 1,
        borderBottomColor: '#EEF0F4',
        minHeight: R(H * 0.085),
    },
    recentActivityIcon: {
        width: R(W * 0.06),
        height: R(W * 0.06),
        borderRadius: R(W * 0.018),
        backgroundColor: BG,
        marginRight: R(W * 0.025),
        marginTop: 2,
    },
    recentActivityContent: {
        flex: 1,
        justifyContent: 'center',
    },
    recentActivityTitle: {
        width: '55%',
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: 7,
    },
    recentActivityDesc: {
        width: '85%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
        marginBottom: 6,
    },
    recentActivityTime: {
        width: '30%',
        height: 10,
        borderRadius: 5,
        backgroundColor: BG,
    },

    // ── Notification Card ─────────────────────────────────────────
    notifCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: R(W * 0.03),
        backgroundColor: BG,
        padding: R(W * 0.035),
        marginBottom: R(H * 0.01),
        minHeight: R(H * 0.11),
    },
    notifIcon: {
        width: R(W * 0.11),
        height: R(W * 0.11),
        borderRadius: R(W * 0.025),
        backgroundColor: BG,
        marginRight: R(W * 0.03),
        flexShrink: 0,
    },
    notifContent: {
        flex: 1,
        justifyContent: 'center',
    },
    notifHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: R(H * 0.007),
    },
    notifTitle: {
        width: '55%',
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },
    notifDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: BG,
    },
    notifDesc1: {
        width: '90%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
        marginBottom: R(H * 0.005),
    },
    notifDesc2: {
        width: '70%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
        marginBottom: R(H * 0.007),
    },
    notifTime: {
        width: '28%',
        height: 10,
        borderRadius: 5,
        backgroundColor: BG,
    },

    // ── Template Item ─────────────────────────────────────────────
    templateListWrap: {
        marginBottom: R(H * 0.018),
    },
    templateListTitle: {
        width: R(W * 0.4),
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.014),
    },
    templateItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: R(W * 0.03),
        borderWidth: 1,
        borderColor: '#E6E8EF',
        padding: R(W * 0.035),
        marginBottom: R(H * 0.012),
        height: R(H * 0.1),
    },
    templateItemIcon: {
        width: R(W * 0.1),
        height: R(W * 0.1),
        borderRadius: R(W * 0.025),
        backgroundColor: BG,
        marginRight: R(W * 0.025),
    },
    templateItemDetails: {
        flex: 1,
        gap: 6,
    },
    templateItemName: {
        width: '85%',
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },
    templateItemMeta: {
        width: '55%',
        height: 11,
        borderRadius: 5,
        backgroundColor: BG,
    },
    templateItemAction: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: BG,
        marginLeft: R(W * 0.02),
    },

    // ── Comment Examples ──────────────────────────────────────────
    commentExSubtitle: {
        width: R(W * 0.65),
        height: 12,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.022),
    },
    commentExCategoryGroup: {
        marginBottom: R(H * 0.022),
    },
    commentExCategoryTitle: {
        width: R(W * 0.38),
        height: 14,
        borderRadius: 6,
        backgroundColor: BG,
        marginBottom: R(H * 0.012),
    },
    commentExRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: R(W * 0.025),
        borderWidth: 1,
        borderColor: '#E6E8EF',
        paddingVertical: R(H * 0.016),
        paddingHorizontal: R(W * 0.04),
        marginBottom: R(H * 0.01),
    },
    commentExText: {
        flex: 1,
        height: 13,
        borderRadius: 6,
        backgroundColor: BG,
    },
    commentExCopyBtn: {
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: BG,
        marginLeft: R(W * 0.03),
    },
});

