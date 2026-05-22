import React, { useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { ShadowCard, AppText, TodayScheduleInnerSkeleton } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import moment from 'moment';
import { useGetOrdersQuery } from '../../redux/api/apiSlice';

const getScheduledTime = (order: any): string => {
    if (order.timeline?.scheduledAt) {
        return moment(order.timeline.scheduledAt).format('h:mm A');
    }
    return 'TBD';
};

interface TodayScheduleProps {
    date?: string;
    onPress?: () => void;
}

const TodaySchedule = ({ date, onPress }: TodayScheduleProps) => {
    const navigation = useNavigation<any>();

    const todayISO = useMemo(() => moment().startOf('day').toISOString(), []);
    const { data, isLoading, isFetching } = useGetOrdersQuery({ status: 'scheduled', date: todayISO });
    const orders = data?.orders ?? [];

    const handleViewAll = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('Schedule');
        }
    };

    const renderItem = ({ item }: { item: typeof orders[0] }) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AssignmentDetails', { orderId: item._id })} style={styles.itemContainer}>
            <View style={styles.timeBox}>
                <AppText
                    fontSize={fontSize.smallM}
                    fontFamily={fontFamily.Regular}
                    color={colors.white}
                >
                    Today
                </AppText>
                <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.white}
                >
                    {getScheduledTime(item)}
                </AppText>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.addressContainer}>
                    <Icon name="map-pin" size={fontSize.medium} color={colors.blueNormal} />
                    <AppText
                        fontSize={fontSize.medium}
                        fontFamily={fontFamily.Bold}
                        color={colors.textDark}
                        numberOfLines={1}
                        style={styles.addressText}
                    >
                        {item.property?.address ?? '—'}
                    </AppText>
                </View>

                <View style={styles.metaContainer}>
                    <View style={styles.typeContainer}>
                        <AppText
                            fontSize={fontSize.small}
                            fontFamily={fontFamily.Regular}
                            color={colors.textLighter}
                        >
                            {item.property?.type ?? '—'}
                        </AppText>
                    </View>
                    <View style={styles.dot} />
                    <AppText
                        fontSize={fontSize.small}
                        fontFamily={fontFamily.Regular}
                        color={colors.textLighter}
                        numberOfLines={1}
                    >
                        {item.lender?.companyName ?? '—'}
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <ShadowCard style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Icon name="calendar" size={fontSize.h6} color={colors.blueNormal} />
                    <AppText
                        fontSize={fontSize.h6}
                        fontFamily={fontFamily.Bold}
                        color={colors.textDark}
                        style={styles.headerTitle}
                    >
                        Today's Schedule
                    </AppText>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!!date}
                    onPress={handleViewAll}
                >
                    <AppText
                        fontSize={fontSize.smallM}
                        fontFamily={date ? fontFamily.Bold : fontFamily.Black}
                        color={date ? colors.placeholderText : colors.blueNormal}
                    >
                        {date ? date : 'View All'}
                    </AppText>
                </TouchableOpacity>
            </View>

            {isLoading || isFetching ? (
                <TodayScheduleInnerSkeleton />
            ) : (
                <FlatList
                    data={orders.slice(0, 2)}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    scrollEnabled={false}
                    style={styles.flatList}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <AppText
                                fontFamily={fontFamily.Bold}
                                color={colors.textLighter}
                            >
                                No schedule for today
                            </AppText>
                        </View>
                    }
                />
            )}
        </ShadowCard>
    );
};

export default TodaySchedule;
