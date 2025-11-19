/**
 * components/PlayerIcon.js
 * ----------------------------------------------------------------------------
 * Purpose:
 *   Labeled, draggable player/umpire icon.
 *
 * Notes:
 *   - PanGestureHandler wraps the icon directly and is enabled/disabled via prop.
 */

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function PlayerIcon({ id, type, x, y, label = id, dragEnabled = true, onDragEnd }) {
  const [pos, setPos] = useState({ left: x, top: y });
  const start = useRef({ left: x, top: y });

  const color =
    type === 'umpire' ? '#1976d2' : type === 'defense' ? '#111' : type === 'offense' ? '#43a047' : '#444';

  const onGestureEvent = (e) => {
    const { translationX, translationY } = e.nativeEvent;
    const nextLeft = start.current.left + translationX;
    const nextTop = start.current.top + translationY;
    setPos({ left: nextLeft, top: nextTop });
  };

  const onHandlerStateChange = (e) => {
    const { state, translationX, translationY } = e.nativeEvent;
    if (state === State.BEGAN) {
      start.current = { left: pos.left, top: pos.top };
    } else if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      const finalLeft = start.current.left + translationX;
      const finalTop = start.current.top + translationY;
      setPos({ left: finalLeft, top: finalTop });
      onDragEnd && onDragEnd(finalLeft, finalTop);
    }
  };

  return (
    <PanGestureHandler
      enabled={dragEnabled}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      minDist={0}
      shouldCancelWhenOutside={false}
      hitSlop={{ left: 8, right: 8, top: 8, bottom: 8 }}
    >
      <View
        style={[
          styles.icon,
          { left: pos.left, top: pos.top, backgroundColor: color },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </View>
    </PanGestureHandler>
  );
}

const ICON_SIZE = 32;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
