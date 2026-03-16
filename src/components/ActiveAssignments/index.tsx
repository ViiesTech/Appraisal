import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { ShadowCard, AppText, ProgressBar } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily } from '../../services/utilities';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const DUMMY_DATA = [
    {
        id: '1',
        status: 'In Progress',
        priority: 'High',
        address: '9012 Maple Drive, San Diego, CA',
        progress: 65,
        dueDate: 'Jan 25, 2026',
    },
    {
        id: '2',
        status: 'Scheduled',
        priority: 'Medium',
        address: '3456 Elm Street, Sacramento, CA',
        progress: 30,
        dueDate: 'Jan 26, 2026',
    },
    {
        id: '3',
        status: 'Pending',
        priority: 'Low',
        address: '7890 Birch Road, Oakland, CA',
        progress: 0,
        dueDate: 'Jan 28, 2026',
    },
    {
        id: '4',
        status: 'In Progress',
        priority: 'High',
        address: '1122 Walnut St, San Jose, CA',
        progress: 80,
        dueDate: 'Jan 29, 2026',
    },
    {
        id: '5',
        status: 'Scheduled',
        priority: 'Medium',
        address: '3344 Oak St, San Francisco, CA',
        progress: 45,
        dueDate: 'Jan 30, 2026',
    },
    {
        id: '6',
        status: 'Pending',
        priority: 'Low',
        address: '5566 Pine St, Los Angeles, CA',
        progress: 10,
        dueDate: 'Jan 31, 2026',
    },
];

const ActiveAssignments = () => {
    const navigation = useNavigation<any>();
    const [itemHeight, setItemHeight] = useState(0);

    const onItemLayout = (event: LayoutChangeEvent) => {
        if (itemHeight === 0) {
            const { height } = event.nativeEvent.layout;
            setItemHeight(height);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress': return colors.statusBlue;
            case 'Scheduled': return colors.statusAmber;
            case 'Pending': return colors.statusGray;
            default: return colors.statusGray;
        }
    };

    const getPriorityColors = (priority: string) => {
        switch (priority) {
            case 'High': return { bg: colors.priorityRedBG, text: colors.priorityRedText };
            case 'Medium': return { bg: colors.priorityAmberBG, text: colors.priorityAmberText };
            case 'Low': return { bg: colors.priorityGrayBG, text: colors.priorityGrayText };
            default: return { bg: colors.priorityGrayBG, text: colors.priorityGrayText };
        }
    };

    const renderItem = ({ item, index }: { item: typeof DUMMY_DATA[0], index: number }) => {
        const statusColor = getStatusColor(item.status);
        const { bg: priorityBG, text: priorityText } = getPriorityColors(item.priority);

        return (
            <View
                style={styles.itemContainer}
                onLayout={index === 0 ? onItemLayout : undefined}
            >
                <View style={styles.itemHeader}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <AppText color={colors.textLighter} fontFamily={fontFamily.Bold}
                            fontSize={fontSize.smallM} style={styles.statusText}>{item.status}</AppText>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: priorityBG }]}>
                        <AppText fontFamily={fontFamily.Bold} fontSize={fontSize.small} style={[styles.priorityText, { color: priorityText }]}>
                            {item.priority}
                        </AppText>
                    </View>
                </View>

                <AppText color={colors.textDark} fontFamily={fontFamily.Bold} style={styles.addressText}>{item.address}</AppText>

                <View style={styles.progressHeader}>
                    <AppText fontSize={fontSize.small} fontFamily={fontFamily.Regular}
                        color={colors.textLighter} style={styles.progressLabel}>Progress</AppText>
                    <AppText fontSize={fontSize.small} fontFamily={fontFamily.Black}
                        color={colors.textLighter} style={styles.progressPercent}>{item.progress}%</AppText>
                </View>
                <ProgressBar progress={item.progress} fillColor={statusColor} key={item.id} />

                <View style={styles.dueContainer}>
                    <Icon name="clock" size={fontSize.small} color={colors.placeholderText} />
                    <AppText color={colors.placeholderText} fontSize={fontSize.small}
                        fontFamily={fontFamily.Regular} style={styles.dueText}>Due: {item.dueDate}</AppText>
                </View>
            </View>
        );
    };

    const listHeight = itemHeight > 0 ? (itemHeight * 3) + 25 : undefined; // +25 buffer for 3 items and gaps

    return (
        <ShadowCard style={styles.container}>
            <View style={styles.header}>
                <AppText fontSize={fontSize.h6} fontFamily={fontFamily.Bold}
                    color={colors.textDark} style={styles.headerTitle}>Active Assignments</AppText>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.seeAllContainer}
                    onPress={() => navigation.navigate('Tasks')}
                >
                    <AppText fontSize={fontSize.smallM} fontFamily={fontFamily.Black}
                        color={colors.blueNormal} style={styles.seeAllText}>See All</AppText>
                    <Icon name="chevron-right" size={fontSize.medium} color={colors.blueNormal} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={DUMMY_DATA}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={[styles.flatList]}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <AppText
                            fontFamily={fontFamily.Bold}
                            color={colors.textLighter}
                        >
                            No active assignments
                        </AppText>
                    </View>
                }
            />
        </ShadowCard>
    );
};

export default ActiveAssignments;
