import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView, AuthHeader } from '../../components';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import styles from './style';
import { setAuthToken } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const ForgotPassVerify = ({ route, navigation }: any) => {
    const { email } = route.params || { email: 'user@example.com' };

    const dispatch = useDispatch()

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

    const handleResendCode = () => {
        if (timer === 0) {
            setTimer(59);
            setError('');
            console.log('Resending code to:', email);
            // Add resend API call logic here
        }
    };

    const handleVerify = () => {
        if (!code) {
            setError('Verification code is required');
        } else if (code.length < 4) {
            setError('Please enter a 4-digit code');
        } else {
            setError('');
            console.log('Verifying code:', code);
            navigation.navigate('ResetPassword', { email });
            // const token = 'asdad4a54sa5d'
            // dispatch(setAuthToken(token))
            // navigation.navigate('Home');
        }
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AuthHeader />
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
                            <AppText
                                fontSize={fontSize.smallM}
                                fontFamily={fontFamily.Bold}
                                color={timer === 0 ? colors.blueNormal : colors.iconLight}
                                style={timer === 0 ? styles.resendCodeActive : {}}
                                onPress={handleResendCode}
                            >
                                Resend Code
                            </AppText>
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
                        title="Verify Code"
                        variant="dark"
                        style={styles.verifyButton}
                        onPress={handleVerify}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default ForgotPassVerify;
