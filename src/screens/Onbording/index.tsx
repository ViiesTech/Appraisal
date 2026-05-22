import { View } from 'react-native';
import React, { useState } from 'react';
import {
  Wrapper,
  Button,
  GoogleLoginButton,
  AppImage,
  AppText,
} from '../../components';
import images from '../../utils/images';
import { colors } from '../../utils/colors';
import { fontFamily, fontSize } from '../../utils/fonts';
import styles from './style';
import { handleGoogleSigninFlow } from '../../utils/googleAuth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { useGoogleLoginMutation } from '../../redux/api/apiSlice';
import { showToast } from '../../utils/toast';

const Onbording = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [googleLogin] = useGoogleLoginMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onGooglePress = async () => {
    setIsGoogleLoading(true);
    const result = await handleGoogleSigninFlow(
      data => googleLogin(data).unwrap(),
      dispatch,
      setCredentials,
    );
    setIsGoogleLoading(false);
    if (!result.success) {
      showToast(
        'error',
        'Google Login Failed',
        'Could not sign in with Google',
      );
    }
  };

  return (
    <Wrapper style={styles.container}>
      <View style={styles.topContainer}>
        <AppImage
          source={images.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText
          fontSize={fontSize.h3}
          fontFamily={fontFamily.Black}
          color={colors.textDark}
          style={styles.title}
        >
          Welcome to Appraisal
        </AppText>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.buttonRow}>
          <Button
            title="Register"
            variant="light"
            size="half"
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            title="Login"
            variant="dark"
            size="half"
            onPress={() => navigation.navigate('Signin')}
          />
        </View>
        <GoogleLoginButton
          style={styles.googleButton}
          onPress={onGooglePress}
          isLoading={isGoogleLoading}
        />
      </View>
    </Wrapper>
  );
};

export default Onbording;
