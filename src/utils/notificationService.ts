import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
} from '@notifee/react-native';
import { Platform } from 'react-native';

export const CHANNEL_ID = 'appraisal_default';
export const CHANNEL_NAME = 'Appraisal Notifications';

/**
 * Creates the default Android notification channel.
 * Safe to call multiple times — notifee is idempotent.
 */
export async function createNotificationChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;

  await notifee.createChannel({
    id: CHANNEL_ID,
    name: CHANNEL_NAME,
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
    sound: 'default',
  });
}

/**
 * Requests notification permission on iOS (Android 13+ handled separately).
 * Returns true if permission is granted.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();

  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
}

/**
 * Displays a local notification using notifee.
 * Call this when a foreground FCM message is received.
 */
export async function displayNotification(
  title: string,
  body: string,
  data?: Record<string, string>,
): Promise<void> {
  await createNotificationChannel();

  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: CHANNEL_ID,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  });
}

/**
 * Clears all delivered notifications and resets badge count.
 */
export async function clearAllNotifications(): Promise<void> {
  await notifee.cancelAllNotifications();
  if (Platform.OS === 'ios') {
    await notifee.setBadgeCount(0);
  }
}
