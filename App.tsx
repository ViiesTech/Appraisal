import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import MainNavigation from './src/services/config/navigation';
import { LogBox, Platform } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

function App() {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.stickyImmersive();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
