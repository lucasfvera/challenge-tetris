// src/App.jsx or a separate file
export const controlsMap = {
  moveLeft: 'moveLeft',
  moveRight: 'moveRight',
  rotate: 'rotate',
  softDrop: 'softDrop',
  hardDrop: 'hardDrop',
  pause: 'pause',
} as const;

export type Controls = keyof typeof controlsMap;