import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { ShadowCard, AppText, TaskCard } from '..';
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
        statusColor: colors.statusBlue,
        priorityColor: colors.priorityRedText,
        progressColor: colors.statusBlue,
    },
    {
        id: '2',
        status: 'Scheduled',
        priority: 'Medium',
        address: '3456 Elm Street, Sacramento, CA',
        progress: 30,
        dueDate: 'Jan 26, 2026',
        statusColor: colors.statusAmber,
        priorityColor: colors.priorityAmberText,
        progressColor: colors.statusAmber,
    },
    {
        id: '3',
        status: 'Pending',
        priority: 'Low',
        address: '7890 Birch Road, Oakland, CA',
        progress: 0,
        dueDate: 'Jan 28, 2026',
        statusColor: colors.statusGray,
        priorityColor: colors.priorityGrayText,
        progressColor: colors.statusGray,
    },
    {
        id: '4',
        status: 'In Progress',
        priority: 'High',
        address: '1122 Walnut St, San Jose, CA',
        progress: 80,
        dueDate: 'Jan 29, 2026',
        statusColor: colors.statusBlue,
        priorityColor: colors.priorityRedText,
        progressColor: colors.statusBlue,
    },
    {
        id: '5',
        status: 'Scheduled',
        priority: 'Medium',
        address: '3344 Oak St, San Francisco, CA',
        progress: 45,
        dueDate: 'Jan 30, 2026',
        statusColor: colors.statusAmber,
        priorityColor: colors.priorityAmberText,
        progressColor: colors.statusAmber,
    },
    {
        id: '6',
        status: 'Pending',
        priority: 'Low',
        address: '5566 Pine St, Los Angeles, CA',
        progress: 10,
        dueDate: 'Jan 31, 2026',
        statusColor: colors.statusGray,
        priorityColor: colors.priorityGrayText,
        progressColor: colors.statusGray,
    },
];

const ActiveAssignments = () => {
    const navigation = useNavigation<any>();

    const renderItem = ({ item }: { item: typeof DUMMY_DATA[0] }) => {
        return (
            <TaskCard
                status={item.status}
                priority={item.priority}
                address={item.address}
                progress={item.progress}
                dueDate={item.dueDate}
                statusColor={item.statusColor}
                priorityColor={item.priorityColor}
                progressColor={item.progressColor}
                variant="home"
                           onPress={() => navigation.navigate('AssignmentDetails')}
            />
        );
    };

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
                data={DUMMY_DATA.slice(0, 3)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                style={styles.flatList}
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
