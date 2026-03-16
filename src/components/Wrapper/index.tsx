import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, View, StatusBar } from 'react-native'
import { SafeAreaView, Edge } from 'react-native-safe-area-context'
import { colors } from '../../services/utilities/colors'
import { sizes } from '../../services/utilities';

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
    edges = ['top', 'bottom', 'left', 'right']
}: Props) => {

    return (
        <SafeAreaView style={[styles.container, style]} edges={edges}>
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
