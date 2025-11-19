/**
 * WhiteboardScreen.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Top-level screen that restores UI controls and embeds the Whiteboard canvas.
 *
 * Fixes:
 *   - UI buttons and mode toggles are now rendered above the canvas.
 *   - Drawing overlay no longer blocks button taps.
 */

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import ModeToggle from './components/ModeToggle';
import { getAllPlayers } from './data/players';

export default function WhiteboardScreen() {
  const [resetFlag, setResetFlag] = useState(false);
  const [clearFlag, setClearFlag] = useState(false);
  const [drawMode, setDrawMode] = useState('freehand');
  const [penEnabled, setPenEnabled] = useState(true);
  const [mode, setMode] = useState('whiteboard');

  return (
    <View style={styles.container}>
      {/* Canvas layer */}
      <View style={styles.canvasWrap}>
        <WhiteboardCanvas
          allPlayers={getAllPlayers()}
          penEnabled={penEnabled}
          drawMode={drawMode}
          resetFlag={resetFlag}
          clearFlag={clearFlag}
          onResetHandled={() => setResetFlag(false)}
          onClearHandled={() => setClearFlag(false)}
        />
      </View>

      {/* Controls bar (top) */}
      <View style={styles.controls}>
        <Button title="Reset" onPress={() => setResetFlag(true)} />
        <Button title="Clear" onPress={() => setClearFlag(true)} />
        <Button
          title={drawMode === 'freehand' ? 'Arrow Mode' : 'Freehand Mode'}
          onPress={() => setDrawMode(drawMode === 'freehand' ? 'arrow' : 'freehand')}
        />
        <Button
          title={penEnabled ? 'Disable Pen (drag icons)' : 'Enable Pen (draw)'}
          onPress={() => setPenEnabled(!penEnabled)}
        />
      </View>

      {/* Mode toggle (bottom corners) */}
      <ModeToggle mode={mode} setMode={setMode} position="bottom" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvasWrap: { flex: 1 },
  controls: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    zIndex: 100,
    elevation: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'rgba(238,238,238,0.95)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
