/**
 * ModeToggle.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Render two corner buttons (📝 Whiteboard, ⚾ Mechanics) respecting safe-area.
 *
 * Fixes:
 *   - Accepts position prop ('top' | 'bottom').
 *   - Defaults to top if not provided.
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModeToggle({ mode, setMode, position = 'top' }) {
  const insets = useSafeAreaInsets();
  const insetStyle =
    position === 'top' ? { top: insets.top + 6 } : { bottom: insets.bottom + 6 };

  return (
    <>
      <TouchableOpacity
        style={[styles.modeButton, styles.modeButtonLeft, insetStyle]}
        onPress={() => setMode('whiteboard')}
      >
        <Text style={styles.modeButtonText}>📝</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeButton, styles.modeButtonRight, insetStyle]}
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
    elevation: 20,
  },
  modeButtonLeft: { left: 10 },
  modeButtonRight: { right: 10 },
  modeButtonText: { color: '#fff', fontSize: 18 },
});
