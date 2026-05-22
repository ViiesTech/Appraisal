import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView } from '../../components';
import { colors } from '../../utils/colors';
import { fontSize, fontFamily } from '../../utils/fonts';
import styles from './style';
import { setCredentials } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useVerifyOtpMutation, useVerifyEmailMutation, useForgotPasswordMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

const VerifyAccount = ({ route, navigation }: any) => {
    const { email, flow } = route.params || { email: 'user@example.com', flow: 'signup' };

    const dispatch = useDispatch();
    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [verifyEmail, { isLoading: isVerifyingEmail }] = useVerifyEmailMutation();
    const [forgotPassword, { isLoading: isResending }] = useForgotPasswordMutation();

    const [code, setCode] = useState<string>('');
    const [timer, setTimer] = useState<number>(59);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleResendCode = async () => {
        if (timer === 0 && !isResending) {
            try {
                const result = await forgotPassword({ email }).unwrap();
                if (result.success) {
                    showToast('success', 'Code Resent', result.message);
                    setTimer(59);
                    setError('');
                } else {
                    showToast('error', 'Error', result.message);
                }
            } catch (err: any) {
                const errorMsg = err?.data?.message || 'Failed to resend code';
                showToast('error', 'Error', errorMsg);
            }
        }
    };

    const handleVerify = async () => {
        if (!code) {
            setError('Verification code is required');
        } else if (code.length < 4) {
            setError('Please enter a 4-digit code');
        } else {
            setError('');
            try {
                const result = flow === 'signup'
                    ? await verifyEmail({ email, otp: code }).unwrap()
                    : await verifyOtp({ email, otp: code }).unwrap();
                if (result.success) {
                    showToast('success', 'Verified', result.message);
                    if (result.token) {
                        // Signup / unverified-login flow: token returned → save credentials → go to app
                        dispatch(setCredentials({ token: result.token, user: result.appraiser }));
                    } else {
                        // Forgot-password flow: no token → proceed to reset password
                        navigation.navigate('ResetPassword', { email });
                    }
                } else {
                    showToast('error', 'Verification Failed', result.message);
                }
            } catch (err: any) {
                const errorMsg = err?.data?.message || 'Invalid verification code';
                showToast('error', 'Verification Failed', errorMsg);
                setError(errorMsg);
            }
        }
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AppText
                        fontSize={fontSize.h1}
                        fontFamily={fontFamily.Black}
                        color={colors.textLight}
                        style={styles.title}
                    >
                        Verify Account
                    </AppText>
                    <AppText
                        fontSize={fontSize.smallM}
                        color={colors.iconLight}
                        style={styles.description}
                    >
                        Code has been send to {"\n"}<AppText fontFamily={fontFamily.Black} color={colors.textLight}>{email}</AppText>.
                        {"\n"}Enter the code to verify your account.
                    </AppText>
                    <View style={styles.form}>
                        <AppInput
                            title="Enter Code"
                            placeholder="4 Digit Code"
                            keyboardType="number-pad"
                            maxLength={4}
                            value={code}
                            onChangeText={(text) => {
                                setCode(text);
                                if (error) setError('');
                            }}
                            errorMessage={error}
                        />
                    </View>
                    <View style={styles.resendTextContainer}>
                        <View style={styles.resendContainer}>
                            <AppText fontSize={fontSize.smallM} color={colors.textLighter}>
                                Didn't Receive Code?{' '}
                            </AppText>
                            <TouchableOpacity
                                onPress={handleResendCode}
                                disabled={timer > 0 || isResending}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                {isResending ? (
                                    <ActivityIndicator size="small" color={colors.blueNormal} />
                                ) : (
                                    <AppText
                                        fontSize={fontSize.smallM}
                                        fontFamily={fontFamily.Bold}
                                        color={timer === 0 && !isResending ? colors.blueNormal : colors.iconLight}
                                        style={timer === 0 && !isResending ? styles.resendCodeActive : {}}
                                    >
                                        Resend Code
                                    </AppText>
                                )}
                            </TouchableOpacity>
                        </View>
                        <AppText
                            fontSize={fontSize.smallM}
                            color={colors.textLighter}
                            style={styles.timerText}
                        >
                            Resend code in 00:{timer < 10 ? `0${timer}` : timer}
                        </AppText>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Verify Account"
                        variant="dark"
                        style={styles.verifyButton}
                        onPress={handleVerify}
                        isLoading={isVerifying || isVerifyingEmail}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default VerifyAccount;
