import React from 'react';
import { View, TouchableOpacity, ViewStyle, ImageBackground } from 'react-native';
import AppText from '../AppText';
import AppInput from '../AppInput';
import AppTabs from '../AppTabs';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { colors, fontFamily, fontSize } from '../../services/utilities';
import images from '../../services/utilities/images';
import styles from './style';
import AppScrollView from '../AppScrollView';

interface Props {
    title?: string;
    description?: string;
    showSearch?: boolean;
    showBackground?: boolean;
    showTabs?: boolean;
    hideBackButton?: boolean;
    onBackPress?: () => void;
    searchProps?: any; // Partial props for AppInput
    tabProps?: any; // Props for AppTabs
    containerStyle?: ViewStyle;
}

const AppHeader = ({
    title,
    description,
    showSearch,
    showBackground,
    showTabs,
    hideBackButton,
    onBackPress,
    searchProps,
    tabProps,
    containerStyle,
}: Props) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };
    const renderContent = () => (
        <View style={[styles.contentContainer, !showBackground && containerStyle]}>
            <View style={styles.headerRow}>
                {!hideBackButton && (
                    <TouchableOpacity
                        style={[styles.backBtn, showBackground && styles.backBtnBackground]}
                        onPress={handleBack}
                        activeOpacity={0.7}
                    >
                        <Icon name="arrow-left" size={24} color={colors.textDark} />
                    </TouchableOpacity>
                )}
                {(title || description) && (
                    <View style={styles.titleContainer}>
                        {title && (
                            <AppText
                                fontSize={fontSize.h6}
                                fontFamily={fontFamily.Bold}
                                color={showBackground ? colors.white : colors.textDark}
                                style={styles.title}
                            >
                                {title}
                            </AppText>
                        )}
                        {description && (
                            <AppText
                                fontSize={fontSize.small}
                                fontFamily={fontFamily.Regular}
                                color={showBackground ? colors.white : colors.textLighter}
                                style={styles.description}
                            >
                                {description}
                            </AppText>
                        )}
                    </View>
                )}
            </View>

            {showTabs && (
                <AppScrollView>

                <View style={styles.tabsContainer}>
                    <AppTabs {...tabProps} />
                </View>
                </AppScrollView>
            )}

            {showSearch && (
                <View style={styles.searchContainer}>
                    <AppInput
                        placeholder="Search templates..."
                        leftIcon={<Icon name="search" size={20} color={colors.textLighter} />}
                        {...searchProps}
                        style={[styles.searchInput, searchProps?.style]}
                    />
                </View>
            )}
        </View>
    );

    if (showBackground) {
        return (
            <ImageBackground
                source={images.appHeaderBG}
                style={[styles.container, containerStyle]}
                resizeMode="stretch"
            >
                {renderContent()}
            </ImageBackground>
        );
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {renderContent()}
        </View>
    );
};

export default AppHeader;
