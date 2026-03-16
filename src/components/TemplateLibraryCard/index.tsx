import React from 'react';
import { View } from 'react-native';
import { ShadowCard, AppText } from '..';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSize, fontFamily } from '../../services/utilities';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../services/config/navigation';

const TemplateLibraryCard = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    return (
        <ShadowCard
            onPress={() => navigation.navigate('TemplateLibrary')}
            style={styles.templateCard}
        >
            <View style={styles.templateCardContent}>
                <View style={styles.templateIconContainer}>
                    <Icon name="file-text" size={fontSize.h5} color={colors.blueNormal} />
                </View>
                <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={colors.textDark}
                    style={styles.templateText}
                >
                    Template Library
                </AppText>
                <Icon name="chevron-right" size={fontSize.h4} color={colors.tabBarIcon} />
            </View>
        </ShadowCard>
    );
};

export default TemplateLibraryCard;
