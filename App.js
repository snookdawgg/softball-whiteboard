/**
 * App.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Root entry point for the softball whiteboard app.
 *
 * Responsibilities:
 *   - Initialize react-native-gesture-handler (must be imported first).
 *   - Wrap the app with GestureHandlerRootView so all gestures are recognized.
 *   - Provide SafeAreaView to respect device notches/status bars.
 *   - Mount WhiteboardScreen (not the canvas directly) to restore UI controls.
 *
 * Integration:
 *   - Requires: react-native-gesture-handler, react-native-safe-area-context.
 *     npx expo install react-native-gesture-handler react-native-safe-area-context
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import WhiteboardScreen from './WhiteboardScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <WhiteboardScreen />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
