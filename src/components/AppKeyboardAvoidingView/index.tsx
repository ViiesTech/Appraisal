import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    isScrollable?: boolean;
}

const AppKeyboardAvoidingView = ({
    children,
    style,
    contentContainerStyle,
    isScrollable = true
}: Props) => {
    const content = (
        <ScrollView
            scrollEnabled={isScrollable}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle, style]}
            keyboardShouldPersistTaps="handled"
        >
            {children}
        </ScrollView>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {content}
        </KeyboardAvoidingView>
    );
};

export default AppKeyboardAvoidingView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    simpleContent: {
        flex: 1,
    },
});

// import React from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleProp,
//   ViewStyle,
//   StyleSheet,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';

// type Props = {
//   children: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
//   contentContainerStyle?: StyleProp<ViewStyle>;
//   isScrollable?: boolean;
// };

// const AppKeyboardAvoidingView = ({
//   children,
//   style,
//   contentContainerStyle,
//   isScrollable = true,
// }: Props) => {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={[styles.container, style]}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           scrollEnabled={isScrollable}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={[
//             styles.scrollContent,
//             contentContainerStyle,
//           ]}
//         >
//           {children}
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default AppKeyboardAvoidingView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
// });
