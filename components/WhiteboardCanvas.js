/**
 * WhiteboardCanvas.js
 * ----------------------------
 * Renders the softball field background, draggable player icons,
 * and sketch layer for drawing paths.
 * - Receives `allPlayers` array and manages pan responders.
 * - Provides Reset and Clear Sketch controls.
 * - Exposes sketch toggle (✏️) to enable/disable drawing.
 */

import React, { useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WhiteboardCanvas({ allPlayers }) {
  // Draggable players
  const panRefs = useMemo(
    () => allPlayers.map(p => new Animated.ValueXY({ x: p.left, y: p.top })),
    [allPlayers]
  );

  const responders = panRefs.map(pan =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => pan.flattenOffset(),
    })
  );

  const resetPositions = () => {
    allPlayers.forEach((player, i) => {
      panRefs[i].setValue({ x: player.left, y: player.top });
      panRefs[i].setOffset({ x: 0, y: 0 });
    });
  };

  // Sketching
  const [paths, setPaths] = useState([]);
  const currentPath = useRef('');
  const [sketchEnabled, setSketchEnabled] = useState(true);

  const sketchResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => sketchEnabled,
        onPanResponderGrant: e => {
          const { locationX, locationY } = e.nativeEvent;
          currentPath.current = `M${locationX},${locationY}`;
        },
        onPanResponderMove: e => {
          const { locationX, locationY } = e.nativeEvent;
          currentPath.current += ` L${locationX},${locationY}`;
          setPaths(prev => [...prev, currentPath.current]);
        },
        onPanResponderRelease: () => {
          setPaths(prev => [...prev, currentPath.current]);
          currentPath.current = '';
        },
      }),
    [sketchEnabled]
  );

  const clearSketch = () => setPaths([]);

  return (
    <View style={styles.canvasContainer}>
      {/* Field background */}
      <Image
        source={{
          uri: 'https://drive.google.com/uc?export=view&id=1PLUpdkIlfhLeXr58gwtFeV056JaVLPOh',
        }}
        style={styles.field}
        resizeMode="contain"
      />

      {/* Sketch layer */}
      <View style={StyleSheet.absoluteFill} {...sketchResponder.panHandlers}>
        <Svg style={StyleSheet.absoluteFill}>
          {paths.map((d, i) => (
            <Path key={i} d={d} stroke="yellow" strokeWidth={3} fill="none" />
          ))}
        </Svg>
      </View>

      {/* Players */}
      {allPlayers.map((player, index) => {
        const isOffensive = ['BR', 'R1', 'R2', 'R3'].includes(player.label);
        const isUmpire = ['PU', 'U1', 'U2', 'U3'].includes(player.label);
        const style = isOffensive
          ? styles.offensiveIcon
          : isUmpire
          ? styles.umpireIcon
          : styles.defensiveIcon;

        return (
          <Animated.View
            key={player.label}
            style={[style, { transform: panRefs[index].getTranslateTransform() }]}
            {...responders[index].panHandlers}
          >
            <Text style={styles.iconText}>{player.label}</Text>
          </Animated.View>
        );
      })}

      {/* Controls */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={resetPositions}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearSketch}>
          <Text style={styles.buttonText}>Clear Sketch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSketchEnabled(prev => !prev)}>
          <Text
            style={[
              styles.pencilIcon,
              sketchEnabled ? styles.pencilActive : styles.pencilInactive,
            ]}
          >
            ✏️
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvasContainer: { flex: 1, position: 'relative' },
  field: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },

  defensiveIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 4,
  },
  offensiveIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
  },
  umpireIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 4,
  },
  iconText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  buttonRow: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  pencilIcon: { fontSize: 24, padding: 10, borderRadius: 6 },
  pencilActive: { backgroundColor: '#27ae60', color: '#fff' },
  pencilInactive: { backgroundColor: '#7f8c8d', color: '#fff' },
});