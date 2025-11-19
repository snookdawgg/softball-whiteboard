/**
 * App.js
 * ----------------------------
 * Root component of the softball whiteboard app.
 * - Holds global state for mode (whiteboard vs mechanics) and selected scenario.
 * - Defines player and scenario data.
 * - Delegates rendering to modular components:
 *   • ModeToggle (corner buttons)
 *   • WhiteboardCanvas (field, draggable players, sketch layer)
 *   • ScenarioPicker (scenario selection buttons)
 *   • MechanicsPlayer (step-through umpire mechanics playback)
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModeToggle from './components/ModeToggle';
import ScenarioPicker from './components/ScenarioPicker';
import MechanicsPlayer from './components/MechanicsPlayer';
import WhiteboardCanvas from './components/WhiteboardCanvas';

// --- Player data (could be moved into data/players.js later) ---
const defensivePlayers = [
  { label: 'C', top: 550, left: 180 },
  { label: 'P', top: 420, left: 180 },
  { label: '1B', top: 440, left: 260 },
  { label: '2B', top: 360, left: 240 },
  { label: 'SS', top: 360, left: 120 },
  { label: '3B', top: 440, left: 100 },
  { label: 'LF', top: 260, left: 40 },
  { label: 'CF', top: 180, left: 180 },
  { label: 'RF', top: 260, left: 320 },
];
const offensivePlayers = [
  { label: 'BR', top: 680, left: 20 },
  { label: 'R1', top: 720, left: 20 },
  { label: 'R2', top: 680, left: 60 },
  { label: 'R3', top: 720, left: 60 },
];
const umpirePlayers = [
  { label: 'PU', top: 580, left: 180 },
  { label: 'U1', top: 420, left: 320 },
  { label: 'U2', top: 300, left: 180 },
  { label: 'U3', top: 420, left: 40 },
];
const allPlayers = [...defensivePlayers, ...offensivePlayers, ...umpirePlayers];

// --- Scenario data (could be moved into data/scenarios.js later) ---
const scenarios = {
  noRunners: {
    code: 'NCAA',
    crewSize: 2,
    situation: 'No Runners on Base – Starting Positions',
    steps: [
      {
        step: 1,
        description: 'Starting positions for 2-umpire crew.',
        positions: {
          PU: { top: 580, left: 180 },
          U1: { top: 420, left: 320 },
        },
        overlays: [
          { text: 'PU starts behind the plate.', top: 560, left: 200 },
          { text: 'U1 starts in the A position.', top: 440, left: 340 },
        ],
      },
    ],
  },
  runnerOnFirst: {
    code: 'NCAA',
    crewSize: 2,
    situation: 'Runner on First – Starting Positions',
    steps: [
      {
        step: 1,
        description: 'U1 moves to B position.',
        positions: {
          PU: { top: 580, left: 180 },
          U1: { top: 360, left: 240 },
        },
        overlays: [{ text: 'U1 moves to B position.', top: 380, left: 260 }],
      },
    ],
  },
  doublePlay: {
    code: 'NCAA',
    crewSize: 2,
    situation: 'Double Play – Movement',
    steps: [
      {
        step: 1,
        description: 'U1 rotates to second base.',
        positions: {
          PU: { top: 580, left: 180 },
          U1: { top: 360, left: 120 },
        },
        overlays: [{ text: 'U1 rotates to second.', top: 340, left: 140 }],
      },
    ],
  },
  flyBallCoverage: {
    code: 'NCAA',
    crewSize: 2,
    situation: 'Fly Ball Coverage – Outfield',
    steps: [
      {
        step: 1,
        description: 'PU watches tag-up, U1 covers catch.',
        positions: {
          PU: { top: 580, left: 180 },
          U1: { top: 260, left: 320 },
        },
        overlays: [{ text: 'U1 covers catch in RF.', top: 240, left: 340 }],
      },
    ],
  },
};

export default function App() {
  const [mode, setMode] = useState('whiteboard'); // 'whiteboard' | 'mechanics'
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('noRunners');

  return (
    <SafeAreaView style={styles.container}>
      {/* Mode toggle always visible */}
      <ModeToggle mode={mode} setMode={setMode} />

      <View style={styles.canvasContainer}>
        {mode === 'whiteboard' ? (
          <WhiteboardCanvas allPlayers={allPlayers} />
        ) : (
          <>
            <ScenarioPicker
              selectedScenarioKey={selectedScenarioKey}
              setSelectedScenarioKey={setSelectedScenarioKey}
            />
            <MechanicsPlayer scenario={scenarios[selectedScenarioKey]} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvasContainer: { flex: 1, position: 'relative' },
});