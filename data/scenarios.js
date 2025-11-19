/**
 * scenarios.js
 * ----------------------------
 * Scenario definitions
 * - Provides initial scenario configurations for mechanics playback.
 * - Each scenario references player positions by ID.
 * - Coordinates are expressed as percentages of the field width/height (0–100).
 */

export const allScenarios = {
  exampleScenario: {
    description: 'Runner on first, ground ball to shortstop',
    players: {
      defense: {
        SS: { xPct: 35, yPct: 35 },
        '1B': { xPct: 65, yPct: 60 },
        P: { xPct: 45, yPct: 50 },
        C: { xPct: 50, yPct: 50 },
      },
      offense: {
        R1: { xPct: 70, yPct: 70 },
        BR: { xPct: 55, yPct: 95 },
      },
      umpires: {
        PU: { xPct: 52, yPct: 45 },
        U1: { xPct: 75, yPct: 75 },
      },
    },
  },
};

/**
 * Returns the full scenarios object.
 */
export function getAllScenarios() {
  return allScenarios;
}