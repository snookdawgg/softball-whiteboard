/**
 * WhiteboardScreen.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Top-level screen that restores UI controls and embeds the Whiteboard canvas.
 *
 * Responsibilities:
 *   - Render UI controls: Reset, Clear, Draw mode toggle, Pen enable toggle.
 *   - Render ModeToggle (📝 / ⚾) pinned to safe-area corners.
 *   - Embed WhiteboardCanvas beneath controls with proper z-ordering.
 *
 * Context:
 *   - Buttons vanished when the app mounted WhiteboardCanvas directly.
 *     This screen restores controls and passes flags/handlers to the canvas.
 */

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import ModeToggle from './components/ModeToggle';
import { getAllPlayers } from './data/players';

export default function WhiteboardScreen() {
  const [resetFlag, setResetFlag] = useState(false);
  const [clearFlag, setClearFlag] = useState(false);
  const [drawMode, setDrawMode] = useState('freehand'); // 'freehand' | 'arrow'
  const [penEnabled, setPenEnabled] = useState(true);   // when true: draw; when false: drag icons
  const [mode, setMode] = useState('whiteboard');       // 'whiteboard' | 'mechanics' (mechanics paused)

  return (
    <View style={styles.container}>
      {/* Mode toggle (top corners, above everything) */}
      <ModeToggle mode={mode} setMode={setMode} />

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

      {/* Canvas layer (fills remaining space) */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    zIndex: 15,
    elevation: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'rgba(238,238,238,0.95)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  canvasWrap: {
    flex: 1,
  },
});
