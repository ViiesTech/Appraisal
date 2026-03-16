/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, ViewStyle, ImageBackground, TextInput } from 'react-native';
import AppText from '../AppText';
import AppInput from '../AppInput';
import AppTabs from '../AppTabs';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    showSearchBar?: boolean;
    renderCustomTabs?:React.ReactNode;
    rightActionText?: string;
    rightActionIcon?: string;
    onRightActionPress?: () => void;
    rightActionNode?: React.ReactNode;
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
    showSearchBar,
    renderCustomTabs,
    rightActionText,
    rightActionIcon,
    onRightActionPress,
    rightActionNode,
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

                {rightActionNode ? (
                    rightActionNode
                ) : (rightActionText || rightActionIcon) ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onRightActionPress}
                        style={[styles.rightActionBtn, showBackground && styles.rightActionBtnBackground]}
                    >
                        {rightActionIcon ? (
                            <Icon
                                name={rightActionIcon}
                                size={14}
                                color={showBackground ? colors.blueNormal : colors.textDark}
                            />
                        ) : null}
                        {rightActionText ? (
                            <AppText
                                fontSize={fontSize.smallM}
                                fontFamily={fontFamily.Bold}
                                color={showBackground ? colors.blueNormal : colors.textDark}
                                style={styles.rightActionText}
                            >
                                {rightActionText}
                            </AppText>
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
            {showSearchBar && (
                <View style={{borderColor: '#D1D5DC', borderWidth: 1, borderRadius: 15, padding: 8,paddingHorizontal:15, flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="search" size={20} color="#99A1AF" />
                    <TextInput placeholderTextColor="#858585" placeholder="Search templates..." style={{marginLeft: 8, flex: 1}} />
                </View>
            )}

            {showTabs ? (
                <View style={styles.tabsContainer}>
                    <AppTabs {...tabProps} />
                </View>
            ) : renderCustomTabs ? (renderCustomTabs) : null}

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
