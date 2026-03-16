import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView, AuthHeader } from '../../components';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import styles from './style';

const ForgotPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSendInstructions = () => {
        if (!email) {
            setError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
        } else {
            setError('');
            console.log('Sending reset instructions to:', email);
            navigation.navigate('ForgotPassVerify', { email });
            // Add forgot password API call logic here
        }
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AuthHeader />
                    <AppText
                        fontSize={fontSize.h2}
                        fontFamily={fontFamily.Black}
                        color={colors.textLight}
                        style={styles.title}
                    >
                        Forgot Password
                    </AppText>
                    <AppText
                        fontSize={fontSize.smallM}
                        color={colors.iconLight}
                        style={styles.description}
                    >
                        No worries! Enter your email address below and we will send you a code to reset password.
                    </AppText>

                    <View style={styles.form}>
                        <AppInput
                            title="Email"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (error) setError('');
                            }}
                            errorMessage={error}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Send Reset Instruction"
                        variant="dark"
                        style={styles.sendButton}
                        onPress={handleSendInstructions}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default ForgotPassword;
