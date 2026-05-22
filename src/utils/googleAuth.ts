import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { webClientId,IosClientId } from '../redux/constant';
import getFCMToken from './getFCMToken';

export const initGoogleAuth = () => {
    GoogleSignin.configure({
        webClientId: webClientId,
        iosClientId: IosClientId,
    });
};

export const handleGoogleSigninFlow = async (
    googleLoginMutation: (data: any) => Promise<any>,
    dispatch: (action: any) => void,
    setCredentials: (payload: { token: string; user: any; isGoogleSignin: boolean }) => any,
) => {
    try {
        await GoogleSignin.hasPlayServices();

        // Force sign out first to ensure the account picker always appears
        try {
            await GoogleSignin.signOut();
        } catch {
            // Ignore error if user wasn't previously signed in
        }

        const userInfo = await GoogleSignin.signIn();
        console.log('Google Signin Info:', userInfo);

        const idToken = userInfo?.data?.idToken;
        if (!idToken) {
            return { success: false, error: 'No idToken received from Google' };
        }

        const body: Record<string, string> = { idToken };

        const fcmToken = await getFCMToken();
        if (fcmToken) {
            body.fcmToken = fcmToken;
        }

        const result = await googleLoginMutation(body);
        if (result.success) {
            dispatch(setCredentials({ token: result.token, user: result.appraiser, isGoogleSignin: true }));
        }
        return { success: result.success, data: result };
    } catch (error: any) {
        console.log('Google signin error:', error);
        return { success: false, error: error };
    }
};
