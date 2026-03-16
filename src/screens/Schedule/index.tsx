import React from 'react';
import { Wrapper, AppText } from '../../components';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import { colors } from '../../services/utilities/colors';
import { StyleSheet } from 'react-native';

const Schedule = () => {
    return (
        <Wrapper style={styles.container}>
            <AppText 
                fontSize={fontSize.h1} 
                fontFamily={fontFamily.Bold} 
                color={colors.textDark}
            >
                Schedule
            </AppText>
        </Wrapper>
    );
};

export default Schedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
