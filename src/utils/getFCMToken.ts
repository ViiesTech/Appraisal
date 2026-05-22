import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import {
  createNotificationChannel,
  requestNotificationPermission,
} from './notificationService';

async function getFCMToken(): Promise<string | null> {
  // iOS: register device for APNs before requesting FCM token
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
  }

  // Android: create channel early so notifications work immediately
  await createNotificationChannel();

  // Request permission via notifee (handles both platforms)
  const granted = await requestNotificationPermission();
  if (!granted) {
    console.warn('Notification permission denied');
    return null;
  }

  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
}

export default getFCMToken;
