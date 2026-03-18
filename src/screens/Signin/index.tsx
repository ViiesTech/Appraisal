import React, { useState } from 'react';
import { View } from 'react-native';
import { Wrapper, AppText, AppInput, Button, GoogleLoginButton, AppImage, AppKeyboardAvoidingView } from '../../components';
import images from '../../services/utilities/images';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../store/authSlice';

interface SigninErrors {
    email: string;
    password: string;
}

const Signin = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<SigninErrors>({
        email: '',
        password: ''
    });

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const validate = () => {
        let emailErr = '';
        let passwordErr = '';

        if (!email) {
            emailErr = 'Email is required';
        } else if (!email.includes('@')) {
            emailErr = 'Invalid email format';
        }

        if (emailErr) {
            setErrors({ email: emailErr, password: '' });
            return false;
        }

        if (!password) {
            passwordErr = 'Password is required';
        } else if (password.length < 6) {
            passwordErr = 'Password must be at least 6 characters';
        }

        if (passwordErr) {
            setErrors({ email: '', password: passwordErr });
            return false;
        }

        setErrors({ email: '', password: '' });
        return true;
    };

    const handleLogin = () => {
        if (validate()) {
            console.log('Login successful!', { email, password });
            const token = 'static-ui-auth-token';
            dispatch(setAuthToken(token));
            // Proceed with login API
        }
    };

    const handleGoogleLogin = () => {
        dispatch(setAuthToken('static-ui-google-auth-token'));
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <AppImage source={images.logo} style={styles.logo} resizeMode="contain" />
                    <AppText
                        fontSize={fontSize.h1}
                        fontFamily={fontFamily.Bold}
                        color={colors.textDark}
                        style={styles.welcomeText}
                    >
                        Welcome
                    </AppText>
                    <AppText
                        fontSize={fontSize.medium}
                        color={colors.textLighter}
                        style={styles.subText}
                    >
                        Login to continue to your appraisal
                    </AppText>
                </View>

                <View style={styles.form}>
                    <AppInput
                        title="Email"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        errorMessage={errors.email}
                    />
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
                        onRightIconPress={togglePasswordVisibility}
                    />

                    <AppText
                        fontSize={fontSize.smallM}
                        fontFamily={fontFamily.Bold}
                        color={colors.blueNormal}
                        style={styles.forgotText}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        Forgot Password?
                    </AppText>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Login"
                        variant="dark"
                        style={styles.loginButton}
                        onPress={handleLogin}
                    />

                    <View style={styles.divider}>
                        <AppText fontSize={fontSize.small} color={colors.textLighter}>
                            or login with
                        </AppText>
                    </View>

                    <GoogleLoginButton
                        style={styles.googleButton}
                        onPress={handleGoogleLogin}
                    />
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default Signin;
