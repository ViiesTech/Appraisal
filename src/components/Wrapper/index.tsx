import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, View, StatusBar } from 'react-native'
import { SafeAreaView, Edge } from 'react-native-safe-area-context'
import { colors } from '../../utils/colors'

type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    barStyle?: 'default' | 'light-content' | 'dark-content';
    statusBarHidden?: boolean;
    statusBarTranslucent?: boolean;
    edges?: Edge[];
}

const Wrapper = ({
    children,
    style,
    barStyle = 'dark-content',
    statusBarHidden = false,
    statusBarTranslucent = false,
}: Props) => {

    return (
        <SafeAreaView edges={['top']} style={[styles.container, style]} >
            <StatusBar
                barStyle={barStyle}
                hidden={statusBarHidden}
                translucent={statusBarTranslucent}
            />
            {children}
        </SafeAreaView>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
})
