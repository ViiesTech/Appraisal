import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Home';
import Tasks from '../../../screens/Tasks';
import Schedule from '../../../screens/Schedule';
import Notifications from '../../../screens/Notifications';
import Profile from '../../../screens/Profile';
import { AppText } from '../../../components';
import { colors } from '../../utilities/colors';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const getIcon = (name: string, color: string) => {
                    let iconName = 'home';
                    switch (name) {
                        case 'Home': iconName = 'home'; break;
                        case 'Tasks': iconName = 'file-text'; break;
                        case 'Schedule': iconName = 'calendar'; break;
                        case 'Notifications': iconName = 'bell'; break;
                        case 'Profile': iconName = 'user'; break;
                    }
                    return <Icon name={iconName} size={23} color={color} />;
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        <View style={isFocused ? styles.activePill : styles.inactiveContainer}>
                            {getIcon(route.name, isFocused ? colors.blueNormal : colors.tabBarIcon)}
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: isFocused ? colors.blueNormal : colors.white }
                                ]}
                            />
                            <AppText
                                style={[
                                    styles.tabLabel,
                                    { color: isFocused ? colors.blueNormal : colors.tabBarIcon }
                                ]}
                            >
                                {label}
                            </AppText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
