import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../services/utilities/colors';
import styles from './style';

interface AuthHeaderProps {
    style?: StyleProp<ViewStyle>;
    onBackPress?: () => void;
}

const AuthHeader = ({ style, onBackPress }: AuthHeaderProps) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={handleBack}
                style={styles.backButton}
            >
                <Icon name="arrow-left" size={20} color={colors.iconLight} />
            </TouchableOpacity>
        </View>
    );
};

export default AuthHeader;
