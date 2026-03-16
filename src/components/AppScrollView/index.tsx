import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

interface AppScrollViewProps extends ScrollViewProps {
    children: React.ReactNode;
}

const AppScrollView = ({ children, contentContainerStyle, ...props }: AppScrollViewProps) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            {...props}
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
    },
});

export default AppScrollView;
