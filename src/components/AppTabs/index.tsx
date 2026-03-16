import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ShadowCard from '../ShadowCard';
import AppText from '../AppText';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import { sizes } from '../../services/utilities/sizes';
import styles from './style';

interface AppTabsProps {
    tab1Title: string;
    tab1Icon?: string;
    tab2Title: string;
    tab2Icon?: string;
    activeTab: string;
    setActiveTab: (val: string) => void;
    variant?: 'default' | 'shadow';
}

const AppTabs = ({
    tab1Title,
    tab1Icon,
    tab2Title,
    tab2Icon,
    activeTab,
    setActiveTab,
    variant = 'default'
}: AppTabsProps) => {
    const isShadowVariant = variant === 'shadow';

    const renderTab = (title: string, icon?: string) => {
        const isActive = activeTab === title;

        const TabContent = (
            <View style={[
                styles.tab,
                isActive && !isShadowVariant && styles.activeTab,
                isActive && isShadowVariant && styles.shadowActiveTab
            ]}>
                {icon && (
                    <Icon
                        name={icon}
                        size={fontSize.h5}
                        color={isActive ? (isShadowVariant ? colors.blueNormal : colors.white) : colors.textLighter}
                    />
                )}
                <AppText
                    fontSize={fontSize.medium}
                    fontFamily={fontFamily.Bold}
                    color={isActive ? (isShadowVariant ? colors.blueNormal : colors.white) : colors.textLighter}
                    style={styles.tabTitle}
                >
                    {title}
                </AppText>
            </View>
        );

        if (isActive && isShadowVariant) {
            return (
                <ShadowCard style={styles.activeShadowCard} onPress={() => setActiveTab(title)}>
                    {TabContent}
                </ShadowCard>
            );
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab(title)}
                style={styles.tabContainer}
            >
                {TabContent}
            </TouchableOpacity>
        );
    };

    const Container = isShadowVariant ? View : ShadowCard;
    return (
        <Container style={[styles.container, isShadowVariant && styles.shadowVariantContainer]}>
            <View style={styles.tabsWrapper}>
                {renderTab(tab1Title, tab1Icon)}
                {renderTab(tab2Title, tab2Icon)}
            </View>
        </Container>
    );
};

export default AppTabs;
