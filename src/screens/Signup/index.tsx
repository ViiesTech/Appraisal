import React, { useState } from 'react';
import { View } from 'react-native';
import { Wrapper, AppText, AppInput, Button, AppKeyboardAvoidingView } from '../../components';
import { colors } from '../../services/utilities/colors';
import { fontSize, fontFamily } from '../../services/utilities/fonts';
import styles from './style';
import Icon from 'react-native-vector-icons/Feather';

interface SignupErrors {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = ({ navigation }: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errors, setErrors] = useState<SignupErrors>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validate = () => {
        let isValid = true;
        let newErrors: SignupErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
            setErrors(newErrors);
            return false;
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            setErrors(newErrors);
            return false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            setErrors(newErrors);
            return false;
        } else if (!email.includes('@')) {
            newErrors.email = 'Invalid email format';
            setErrors(newErrors);
            return false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            setErrors(newErrors);
            return false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            setErrors(newErrors);
            return false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
            setErrors(newErrors);
            return false;
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
            setErrors(newErrors);
            return false;
        }

        setErrors(newErrors);
        return true;
    };

    const handleSignup = () => {
        if (validate()) {
            console.log('Signup Successful!', {
                firstName,
                lastName,
                email,
                password
            });
            navigation.navigate('VerifyAccount', { email });
            // Proceed with Signup API
        }
    };

    return (
        <Wrapper>
            <AppKeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <AppText
                            fontSize={fontSize.h1}
                            fontFamily={fontFamily.Black}
                            color={colors.textLight}
                        >
                            Register
                        </AppText>
                    </View>
                    <View style={styles.row}>
                        <AppInput
                            size="half"
                            title="First Name"
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={(text) => {
                                setFirstName(text);
                                if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                            }}
                            errorMessage={errors.firstName}
                        />
                        <AppInput
                            size="half"
                            title="Last Name"
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={(text) => {
                                setLastName(text);
                                if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                            }}
                            errorMessage={errors.lastName}
                        />
                    </View>

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
                <View style={styles.footerTextContainer}>
                    <Button
                        title="Create Account"
                        variant="dark"
                        style={styles.footerButton}
                        onPress={handleSignup}
                    />
                    <View style={styles.agreementContainer}>
                        <AppText
                            fontSize={fontSize.smallM}
                            fontFamily={fontFamily.regular}
                            color={colors.iconLight}
                            style={styles.footerText}
                        >
                            By continuing, you agree to our{' '}
                        </AppText>
                        <AppText
                            fontSize={fontSize.smallM}
                            fontFamily={fontFamily.Bold}
                            color={colors.blueNormal}
                            style={styles.boldText}
                            onPress={() => console.log("Terms of Service pressed")}
                        >
                            Terms of Service
                        </AppText>
                        <AppText
                            fontSize={fontSize.smallM}
                            fontFamily={fontFamily.regular}
                            color={colors.iconLight}
                            style={styles.footerText}
                        >
                            {' '}and{' '}
                        </AppText>
                        <AppText
                            fontSize={fontSize.smallM}
                            fontFamily={fontFamily.Bold}
                            color={colors.blueNormal}
                            style={styles.boldText}
                            onPress={() => console.log("Privacy Policy pressed")}
                        >
                            Privacy Policy
                        </AppText>
                        <AppText
                            fontSize={fontSize.smallM}
                            color={colors.iconLight}
                            fontFamily={fontFamily.regular}
                            style={styles.footerText}
                        >
                            .
                        </AppText>
                    </View>
                </View>
            </AppKeyboardAvoidingView>
        </Wrapper>
    );
};

export default Signup;
