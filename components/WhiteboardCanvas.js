/**
 * components/WhiteboardCanvas.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Gesture-driven softball whiteboard canvas using react-native-gesture-handler.
 *
 * Fixes:
 *   - Prevent duplicate arrowheads by rendering head only on finalized arrows.
 *   - During arrow drawing: show a live line (no head). On release: commit arrow with head.
 *   - Icons are draggable when pen is disabled. Drawing overlay does not block UI buttons.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Path, Line, Polygon } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import PlayerIcon from './PlayerIcon';
import { getAllPlayers } from '../data/players';

export default function WhiteboardCanvas({
  allPlayers,
  penEnabled = true,
  drawMode = 'freehand',
  resetFlag,
  clearFlag,
  onResetHandled,
  onClearHandled,
}) {
  const { width, height } = useWindowDimensions();

  const [playersState, setPlayersState] = useState(allPlayers || getAllPlayers());
  const [paths, setPaths] = useState([]);
  const [arrows, setArrows] = useState([]);

  // Live drawing refs
  const currentPath = useRef(null);
  const tempArrow = useRef(null); // live arrow without head
  const isArrowDrawing = useRef(false);

  useEffect(() => {
    if (resetFlag) {
      setPlayersState(getAllPlayers());
      setPaths([]);
      setArrows([]);
      currentPath.current = null;
      tempArrow.current = null;
      isArrowDrawing.current = false;
      onResetHandled && onResetHandled();
    }
  }, [resetFlag]);

  useEffect(() => {
    if (clearFlag) {
      setPaths([]);
      setArrows([]);
      currentPath.current = null;
      tempArrow.current = null;
      isArrowDrawing.current = false;
      onClearHandled && onClearHandled();
    }
  }, [clearFlag]);

  const onCanvasGestureEvent = useMemo(
    () => (event) => {
      const x = event.nativeEvent.absoluteX;
      const y = event.nativeEvent.absoluteY;

      if (drawMode === 'freehand' && currentPath.current) {
        currentPath.current.push(`L${x},${y}`);
        setPaths((prev) => {
          const next = [...prev];
          next[next.length - 1] = [...currentPath.current];
          return next;
        });
      } else if (drawMode === 'arrow' && isArrowDrawing.current && tempArrow.current) {
        tempArrow.current.x2 = x;
        tempArrow.current.y2 = y;
        // No state update here for performance; we render tempArrow directly
      }
    },
    [drawMode]
  );

  const onCanvasHandlerStateChange = useMemo(
    () => (event) => {
      const x = event.nativeEvent.absoluteX;
      const y = event.nativeEvent.absoluteY;
      const { state } = event.nativeEvent;

      if (state === State.BEGAN) {
        if (drawMode === 'freehand') {
          currentPath.current = [`M${x},${y}`];
          setPaths((prev) => [...prev, currentPath.current]);
        } else {
          isArrowDrawing.current = true;
          tempArrow.current = { x1: x, y1: y, x2: x, y2: y };
        }
      } else if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
        if (drawMode === 'freehand') {
          currentPath.current = null;
        } else if (isArrowDrawing.current && tempArrow.current) {
          // Finalize arrow: commit a single arrow with head
          const finalizedArrow = { ...tempArrow.current, x2: x, y2: y };
          setArrows((prev) => [...prev, finalizedArrow]);
          // Clear live state
          isArrowDrawing.current = false;
          tempArrow.current = null;
        }
      }
    },
    [drawMode]
  );

  const updatePlayerPctPosition = (id, groupName, nextLeftPx, nextTopPx) => {
    const xPct = (nextLeftPx / width) * 100;
    const yPct = (nextTopPx / height) * 100;
    setPlayersState((prev) => {
      const next = { ...prev, [groupName]: { ...prev[groupName] } };
      next[groupName][id] = { ...prev[groupName][id], xPct, yPct };
      return next;
    });
  };

  return (
    <View style={styles.container}>
      {/* Field background */}
      <Image
        source={{ uri: 'https://drive.google.com/uc?export=view&id=1PLUpdkIlfhLeXr58gwtFeV056JaVLPOh' }}
        style={styles.field}
        resizeMode="contain"
        pointerEvents="none"
      />

      {/* Player icons */}
      <View style={styles.iconsLayer}>
        {Object.entries(playersState).flatMap(([groupName, group]) =>
          Object.entries(group).map(([id, pos]) => {
            const type = groupName === 'umpires' ? 'umpire' : groupName;
            const left = (pos.xPct / 100) * width;
            const top = (pos.yPct / 100) * height;
            return (
              <PlayerIcon
                key={id}
                id={id}
                type={type}
                x={left}
                y={top}
                label={id}
                dragEnabled={!penEnabled}
                onDragEnd={(leftPx, topPx) => updatePlayerPctPosition(id, groupName, leftPx, topPx)}
              />
            );
          })
        )}
      </View>

      {/* Drawing overlay (only when pen is enabled) */}
      {penEnabled && (
        <PanGestureHandler
          onGestureEvent={onCanvasGestureEvent}
          onHandlerStateChange={onCanvasHandlerStateChange}
        >
          <View style={styles.overlay} pointerEvents="box-none">
            <Svg style={StyleSheet.absoluteFill}>
              {/* Freehand paths */}
              {paths.map((commands, idx) => (
                <Path
                  key={`path-${idx}`}
                  d={commands.join(' ')}
                  stroke="yellow"
                  strokeWidth={6}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              ))}

              {/* Finalized arrows (line + head) */}
              {arrows.map((arrow, idx) => {
                const { x1, y1, x2, y2 } = arrow;
                if ([x1, y1, x2, y2].some((v) => typeof v !== 'number' || isNaN(v))) return null;
                const headSize = 14;
                const angle = Math.atan2(y2 - y1, x2 - x1);
                const hx1 = x2 - headSize * Math.cos(angle - Math.PI / 6);
                const hy1 = y2 - headSize * Math.sin(angle - Math.PI / 6);
                const hx2 = x2 - headSize * Math.cos(angle + Math.PI / 6);
                const hy2 = y2 - headSize * Math.sin(angle + Math.PI / 6);
                return (
                  <React.Fragment key={`arrow-${idx}`}>
                    <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke="blue" strokeWidth={6} />
                    <Polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill="blue" />
                  </React.Fragment>
                );
              })}

              {/* Live arrow (line only, no head) */}
              {isArrowDrawing.current && tempArrow.current && (
                <Line
                  x1={tempArrow.current.x1}
                  y1={tempArrow.current.y1}
                  x2={tempArrow.current.x2}
                  y2={tempArrow.current.y2}
                  stroke="blue"
                  strokeWidth={6}
                />
              )}
            </Svg>
          </View>
        </PanGestureHandler>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  field: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
  iconsLayer: { ...StyleSheet.absoluteFillObject, zIndex: 10 },
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 20 },
});
