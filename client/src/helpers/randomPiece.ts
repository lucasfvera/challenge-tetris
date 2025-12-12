import type { IActivePiece } from "../hooks/useTetris";
import { BOARD_HEIGHT } from "../settings/gameSettings";
import { randomTetromino } from "../utils/tetrominoes";

export const randomPiece = (): IActivePiece => {
    const { type, tetromino } = randomTetromino();
    return { type, tetromino, pos: { x: 0, y: BOARD_HEIGHT - 1 }, rotationIndex: 0, collided: false };
}