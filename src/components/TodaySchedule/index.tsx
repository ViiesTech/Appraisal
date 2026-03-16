import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { ShadowCard, AppText } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily } from '../../services/utilities';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const DUMMY_DATA = [
    {
        id: '1',
        time: '10:00 AM',
        address: '1234 Oak Street, Sa',
        type: 'Residential',
        company: 'ABC Real Estate',
    },
    {
        id: '2',
        time: '2:00 PM',
        address: '5678 Pine Avenue, l',
        type: 'Commercial',
        company: 'XYZ Corp',
    },
    {
        id: '3',
        time: '4:00 PM',
        address: '1234 Oak Street, Sa',
        type: 'Commercial',
        company: 'WXY Corp',
    },
];

interface TodayScheduleProps {
    date?: string;
    onPress?: () => void;
}

const TodaySchedule = ({ date, onPress }: TodayScheduleProps) => {
    const navigation = useNavigation<any>();
    const [itemHeight, setItemHeight] = useState(0);

    const handleViewAll = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('Schedule');
        }
    };

    const renderItem = ({ item, index }: { item: typeof DUMMY_DATA[0], index: number }) => (
        <View
            style={styles.itemContainer}>
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
                    {item.time}
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
                        {item.address}
                    </AppText>
                </View>

                <View style={styles.metaContainer}>
                    <View style={styles.typeContainer}>
                        <AppText
                            fontSize={fontSize.small}
                            fontFamily={fontFamily.Regular}
                            color={colors.textLighter}
                        >
                            {item.type}
                        </AppText>
                    </View>
                    <View style={styles.dot} />
                    <AppText
                        fontSize={fontSize.small}
                        fontFamily={fontFamily.Regular}
                        color={colors.textLighter}
                        numberOfLines={1}
                    >
                        {item.company}
                    </AppText>
                </View>
            </View>
        </View>
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
                            No schedule for today
                        </AppText>
                    </View>
                }
            />
        </ShadowCard>
    );
};

export default TodaySchedule;
