import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { displayNotification } from './notificationService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NotificationPressHandler = (
  data: Record<string, string> | undefined,
) => void;

// ---------------------------------------------------------------------------
// Background & quit-state FCM handler (registered in index.js)
// Must be pure — no UI, no navigation, only local display via notifee
// ---------------------------------------------------------------------------

export function registerBackgroundFCMHandler(): void {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    if (notification?.title || notification?.body) {
      await displayNotification(
        notification?.title ?? '',
        notification?.body ?? '',
        data as Record<string, string>,
      );
    }
  });
}

// ---------------------------------------------------------------------------
// Foreground FCM listener — call inside a useEffect in App.tsx
// ---------------------------------------------------------------------------

export function subscribeForegroundFCM(): () => void {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    const { notification, data } = remoteMessage;
    if (notification?.title || notification?.body) {
      await displayNotification(
        notification?.title ?? '',
        notification?.body ?? '',
        data as Record<string, string>,
      );
    }
  });

  return unsubscribe;
}

// ---------------------------------------------------------------------------
// Notifee foreground event handler (notification press / action)
// onPressHandler receives the notification data so you can navigate
// ---------------------------------------------------------------------------

export function subscribeNotifeeEvents(
  onPressHandler?: NotificationPressHandler,
): () => void {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      onPressHandler?.(detail.notification?.data as Record<string, string>);
    }
  });
}

// ---------------------------------------------------------------------------
// Background notifee event handler (registered in index.js)
// ---------------------------------------------------------------------------

export function registerBackgroundNotifeeHandler(): void {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      // Navigation from background/quit state is handled via
      // messaging().getInitialNotification() in App.tsx
      console.log('Background notifee press:', detail.notification?.data);
    }
  });
}

// ---------------------------------------------------------------------------
// Handles notification that launched the app from quit state (FCM)
// Call once in App.tsx useEffect
// ---------------------------------------------------------------------------

export async function getInitialNotification(): Promise<
  FirebaseMessagingTypes.RemoteMessage | null
> {
  return messaging().getInitialNotification();
}
