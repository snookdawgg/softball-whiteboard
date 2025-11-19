/**
 * MechanicsPlayer.js
 * ----------------------------
 * Plays through a selected mechanics scenario step by step.
 * - Receives a `scenario` prop with steps, positions, and overlays.
 * - Provides Back, Forward, and Restart controls.
 * - Renders umpire positions and instructional overlays.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MechanicsPlayer({ scenario }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = scenario.steps[stepIndex];

  const nextStep = () => {
    if (stepIndex < scenario.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const restart = () => setStepIndex(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{scenario.situation}</Text>
      <Text style={styles.description}>{step.description}</Text>

      {/* Overlays */}
      {step.overlays.map((overlay, i) => (
        <Text
          key={i}
          style={[styles.overlay, { top: overlay.top, left: overlay.left }]}
        >
          {overlay.text}
        </Text>
      ))}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={prevStep}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Forward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={restart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 12 },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});