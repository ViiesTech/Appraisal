import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import MainNavigation from './src/navigation';
import { LogBox, Platform } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Toast from 'react-native-toast-message';
import { initGoogleAuth } from './src/utils/googleAuth';
import { getFCMToken } from './src/utils';
import {
  subscribeForegroundFCM,
  subscribeNotifeeEvents,
  getInitialNotification,
} from './src/utils/notificationHandler';
import { selectAuthToken, selectCurrentUser } from './src/redux/slices/authSlice';
import { connectSocket, disconnectSocket, onOnlineStatus, onNewMessage, onInbox } from './src/utils/chatSocket';
import { useDispatch } from 'react-redux';
import { selectConversation, setAdminOnlineStatus, addMessage, setUnreadCount } from './src/redux/slices/conversationSlice';

// ---------------------------------------------------------------------------
// Connects / disconnects the socket based on auth state.
// Must live inside <Provider> so it can access Redux.
// ---------------------------------------------------------------------------
function SocketManager() {
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const conversation = useSelector(selectConversation);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (authToken) {
      console.log('[App] Auth token present — connecting socket');
      connectSocket(authToken);
    } else {
      console.log('[App] No auth token — disconnecting socket');
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [authToken]);

  // Global new message listener — active on every screen
  useEffect(() => {
    if (!authToken || !conversation?._id) return;
    const unsub = onNewMessage((message) => {
      if (message.conversationId === conversation._id) {
        const senderId = typeof message.senderId === 'string' ? message.senderId : message.senderId?._id ?? '';
        dispatch(addMessage({
          _id: message._id,
          senderId,
          text: message.content ?? message.text ?? '',
          attachments: message.attachments ?? [],
          createdAt: message.createdAt
            ? typeof message.createdAt === 'string'
              ? message.createdAt
              : new Date(message.createdAt).toISOString()
            : new Date().toISOString(),
          isRead: message.isRead ?? false,
        }));
      }
    });
    return unsub;
  }, [authToken, conversation?._id, dispatch]);

  // Global inbox listener — updates unread count badge in real time
  useEffect(() => {
    if (!authToken || !currentUser?._id) return;
    const unsub = onInbox((data) => {
      const count = data?.unreadCount?.[currentUser._id] ?? 0;
      dispatch(setUnreadCount(count));
    });
    return unsub;
  }, [authToken, currentUser?._id, dispatch]);

  // Global admin online status listener
  useEffect(() => {
    if (!conversation?.adminId) return;
    const unsub = onOnlineStatus(data => {
      if (data.userId === conversation.adminId) {
        console.log("data",data)
        dispatch(setAdminOnlineStatus({ isOnline: data.isOnline, lastSeen: data.lastSeen ?? null }));
      }
    });
    return unsub;
  }, [conversation?.adminId, dispatch]);

  return null;
}

function App() {
  LogBox.ignoreAllLogs(true);

  // FCM token + foreground listeners
  useEffect(() => {
    getFCMToken().then(fcmToken => {
      console.log('fcmToken', fcmToken);
    });

    const unsubscribeFCM = subscribeForegroundFCM();
    const unsubscribeNotifee = subscribeNotifeeEvents((data) => {
      // TODO: navigate based on data if needed
      console.log('Notification pressed:', data);
    });

    // Handle notification that opened the app from quit state
    getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from quit-state notification:', remoteMessage.data);
        // TODO: navigate based on remoteMessage.data if needed
      }
    });

    return () => {
      unsubscribeFCM();
      unsubscribeNotifee();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.stickyImmersive();
    }
    initGoogleAuth();
  }, []);

  return (
    <Provider store={store}>
      <SocketManager />
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </PersistGate>
      <Toast />
    </Provider>
  );
}

export default App;
