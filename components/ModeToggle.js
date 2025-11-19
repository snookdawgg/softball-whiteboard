/**
 * ModeToggle.js
 * ----------------------------
 * Renders two corner buttons (📝 Whiteboard, ⚾ Mechanics).
 * Uses safe area insets to avoid iOS notch/status bar overlap.
 * Calls `setMode` passed in as a prop.
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModeToggle({ mode, setMode }) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <TouchableOpacity
        style={[styles.modeButton, styles.modeButtonLeft, { top: insets.top }]}
        onPress={() => setMode('whiteboard')}
      >
        <Text style={styles.modeButtonText}>📝</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeButton, styles.modeButtonRight, { top: insets.top }]}
        onPress={() => setMode('mechanics')}
      >
        <Text style={styles.modeButtonText}>⚾</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  modeButton: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 18,
    zIndex: 20,
    elevation: 3,
  },
  modeButtonLeft: { left: 10 },
  modeButtonRight: { right: 10 },
  modeButtonText: { color: '#fff', fontSize: 18 },
});