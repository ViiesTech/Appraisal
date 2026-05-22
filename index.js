/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  registerBackgroundFCMHandler,
  registerBackgroundNotifeeHandler,
} from './src/utils/notificationHandler';

// Must be registered outside of any component — runs in headless JS context
registerBackgroundFCMHandler();
registerBackgroundNotifeeHandler();

AppRegistry.registerComponent(appName, () => App);
