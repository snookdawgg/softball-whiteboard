/**
 * scenarios.js
 * ----------------------------
 * Defines umpire mechanics scenarios for NCAA 2-umpire crews.
 * Each scenario contains steps with positions and instructional overlays.
 */

export const scenarios = {
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