import React, { useState } from 'react';
import { View } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView, AuthHeader } from '../../components';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';

const ResetPassword = ({ route, navigation }: any) => {
    const { email } = route.params || { email: 'user@example.com' };

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' });

    const validateInputs = () => {
        let passErr = '';
        let confirmPassErr = '';

        if (!password) {
            passErr = 'Password is required';
        } else if (password.length < 6) {
            passErr = 'Password must be at least 6 characters';
        }

        if (passErr) {
            setErrors({ password: passErr, confirmPassword: '' });
            return false;
        }

        if (!confirmPassword) {
            confirmPassErr = 'Confirm password is required';
        } else if (confirmPassword !== password) {
            confirmPassErr = 'Passwords do not match';
        }

        if (confirmPassErr) {
            setErrors({ password: '', confirmPassword: confirmPassErr });
            return false;
        }

        setErrors({ password: '', confirmPassword: '' });
        return true;
    };

    const handleReset = () => {
        if (validateInputs()) {
            console.log('Resetting password for:', email);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Signin' }],
            });
            // Add reset password API call logic here
        }
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AuthHeader />
                    <AppText
                        fontSize={fontSize.h3}
                        fontFamily={fontFamily.Black}
                        color={colors.textLight}
                        style={styles.title}
                    >
                        Create New Password
                    </AppText>
                    <AppText
                        fontSize={fontSize.smallM}
                        color={colors.iconLight}
                        style={styles.description}
                    >
                        Please enter and confirm your new password.{"\n"}You will need to login after you reset.
                    </AppText>

                    <View style={styles.form}>
                        <AppInput
                            title="Password"
                            placeholder="**********"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                            }}
                            errorMessage={errors.password}
                            rightIcon={
                                <Icon
                                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={colors.iconLight}
                                />
                            }
                            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />
                        <AppInput
                            title="Confirm Password"
                            placeholder="**********"
                            secureTextEntry={!isConfirmPasswordVisible}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                            }}
                            errorMessage={errors.confirmPassword}
                            rightIcon={
                                <Icon
                                    name={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={colors.iconLight}
                                />
                            }
                            onRightIconPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        />
                      </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Reset Password"
                        variant="dark"
                        style={styles.resetButton}
                        onPress={handleReset}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default ResetPassword;
