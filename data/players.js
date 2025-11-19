/**
 * players.js
 * ----------------------------
 * Defines initial positions for defensive, offensive, and umpire players.
 * Exports a combined `allPlayers` array for use in WhiteboardCanvas.
 */

export const defensivePlayers = [
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

export const offensivePlayers = [
  { label: 'BR', top: 680, left: 20 },
  { label: 'R1', top: 720, left: 20 },
  { label: 'R2', top: 680, left: 60 },
  { label: 'R3', top: 720, left: 60 },
];

export const umpirePlayers = [
  { label: 'PU', top: 580, left: 180 },
  { label: 'U1', top: 420, left: 320 },
  { label: 'U2', top: 300, left: 180 },
  { label: 'U3', top: 420, left: 40 },
];

export const allPlayers = [
  ...defensivePlayers,
  ...offensivePlayers,
  ...umpirePlayers,
];