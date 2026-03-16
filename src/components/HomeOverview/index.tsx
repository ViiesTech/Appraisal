import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, TodaySchedule, ActiveAssignments } from '..';
import { colors, fontSize, fontFamily, sizes } from '../../services/utilities';

const HomeOverview = () => {
    return (
        <View style={styles.container}>
            <TodaySchedule />
            <ActiveAssignments />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeOverview;
