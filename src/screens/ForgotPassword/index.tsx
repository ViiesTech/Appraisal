import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView, AuthHeader } from '../../components';
import { colors } from '../../utils/colors';
import { fontSize, fontFamily } from '../../utils/fonts';
import styles from './style';
import { useForgotPasswordMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

const ForgotPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleSendInstructions = async () => {
        if (!email) {
            setError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
        } else {
            setError('');
            try {
                const result = await forgotPassword({ email }).unwrap();
                if (result.success) {
                    showToast('success', 'OTP Sent', result.message);
                    navigation.navigate('VerifyAccount', { email, flow: 'forgotPassword' });
                } else {
                    showToast('error', 'Error', result.message);
                }
            } catch (err: any) {
                const errorMsg = err?.data?.message || 'Failed to send OTP';
                showToast('error', 'Error', errorMsg);
                setError(errorMsg);
            }
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
                        isLoading={isLoading}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default ForgotPassword;
