/**
 * ScenarioPicker.js
 * ----------------------------
 * Displays buttons to select mechanics scenarios.
 * Respects safe area insets so it sits below the mode toggle.
 * Calls `setSelectedScenarioKey` passed in as a prop.
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScenarioPicker({ selectedScenarioKey, setSelectedScenarioKey }) {
  const insets = useSafeAreaInsets();

  const scenarios = [
    { key: 'noRunners', label: 'No Runners' },
    { key: 'runnerOnFirst', label: 'R1' },
    { key: 'doublePlay', label: 'Double Play' },
    { key: 'flyBallCoverage', label: 'Fly Ball' },
  ];

  return (
    <View style={[styles.container, { top: insets.top + 56 }]}>
      <Text style={styles.label}>Scenario:</Text>
      <View style={styles.row}>
        {scenarios.map(s => (
          <TouchableOpacity
            key={s.key}
            style={[
              styles.button,
              selectedScenarioKey === s.key && styles.buttonActive,
            ]}
            onPress={() => setSelectedScenarioKey(s.key)}
          >
            <Text style={styles.buttonText}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 8,
    zIndex: 15,
  },
  label: { color: '#fff', marginBottom: 6, fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
  },
  buttonActive: { backgroundColor: '#2980b9' },
  buttonText: { color: '#fff', fontWeight: '600' },
});