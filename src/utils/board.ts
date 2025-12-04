export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type Board = (string | null)[][];

export const createEmptyBoard = (): Board =>
    Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));