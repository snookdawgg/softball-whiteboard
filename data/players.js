/**
 * players.js
 * ----------------------------
 * Player definitions
 * - Provides initial positions for offensive, defensive, and umpire players.
 * - Coordinates are expressed as percentages of the field width/height (0–100).
 * - This ensures icons scale consistently with the background image.
 */

export const allPlayers = {
  defense: {
    C:   { xPct: 46, yPct: 58 },
    P:   { xPct: 46, yPct: 48 },
    '1B':{ xPct: 61, yPct: 45 },
    '2B':{ xPct: 55, yPct: 40 },
    SS:  { xPct: 35, yPct: 40 },
    '3B':{ xPct: 31, yPct: 45 },
    LF:  { xPct: 10, yPct: 24 },
    CF:  { xPct: 46, yPct: 15 },
    RF:  { xPct: 84, yPct: 24 },
  },
  offense: {
    BR: { xPct: 10, yPct: 75 },
    R1: { xPct: 20, yPct: 75 },
    R2: { xPct: 30, yPct: 75 },
    R3: { xPct: 40, yPct: 75 },
  },
  umpires: {
    PU: { xPct: 46, yPct: 61 },
    U1: { xPct: 79, yPct: 43 },
    U2: { xPct: 46, yPct: 30 },
    U3: { xPct: 14, yPct: 43 },
  },
};

/**
 * Returns the full players object.
 */
export function getAllPlayers() {
  return allPlayers;
}