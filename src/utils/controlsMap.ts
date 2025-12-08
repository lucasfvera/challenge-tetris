import type { KeyboardControlsEntry } from "@react-three/drei";

export const controls = {
  moveLeft: 'moveLeft',
  moveRight: 'moveRight',
  rotate: 'rotate',
  softDrop: 'softDrop',
  hardDrop: 'hardDrop',
  pause: 'pause',
} as const;

export const controlsMap: KeyboardControlsEntry<Controls>[] = [
  { name: controls.moveLeft, keys: ['ArrowLeft', 'KeyA'] },
  { name: controls.moveRight, keys: ['ArrowRight', 'KeyD'] },
  { name: controls.rotate, keys: ['ArrowUp', 'KeyW'] },
  { name: controls.softDrop, keys: ['ArrowDown', 'KeyS'] },
  { name: controls.hardDrop, keys: ['Space'] },
  { name: controls.pause, keys: ['p'] },
]

export type Controls = keyof typeof controls;