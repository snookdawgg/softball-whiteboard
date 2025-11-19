/**
 * index.js
 * ----------------------------
 * Entry point for Expo managed workflow.
 * Wraps the root <App /> component in SafeAreaProvider
 * so SafeAreaView and useSafeAreaInsets have context.
 * Uses Expo's registerRootComponent instead of AppRegistry.
 */

import { registerRootComponent } from 'expo';
import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Root() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);