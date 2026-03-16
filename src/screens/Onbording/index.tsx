import { View } from 'react-native'
import React from 'react'
import { Wrapper, Button, GoogleLoginButton, AppImage, AppText } from '../../components'
import images from '../../services/utilities/images'
import { colors } from '../../services/utilities/colors'
import { fontFamily, fontSize } from '../../services/utilities/fonts'
import styles from './style'

type Props = {}

const Onbording = ({ navigation }: any) => {    
    return (
        <Wrapper style={styles.container}>
            <View style={styles.topContainer}>
                <AppImage source={images.logo} style={styles.logo} resizeMode="contain" />
                <AppText fontSize={fontSize.h3} fontFamily={fontFamily.Black}
                    color={colors.textDark} style={styles.title}>
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
                <GoogleLoginButton style={styles.googleButton} />
            </View>
        </Wrapper>
    )
}

export default Onbording
