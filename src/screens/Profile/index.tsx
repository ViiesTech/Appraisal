import React from 'react';
import { Wrapper, AppText } from '../../components';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import { colors } from '../../services/utilities/colors';
import { StyleSheet } from 'react-native';

const Profile = () => {
    return (
        <Wrapper style={styles.container}>
            <AppText 
                fontSize={fontSize.h1} 
                fontFamily={fontFamily.Bold} 
                color={colors.textDark}
            >
                Profile
            </AppText>
        </Wrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
