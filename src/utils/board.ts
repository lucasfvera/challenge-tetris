import { clearFullLines } from "../helpers/clearFullLines";
import type { IActivePiece } from "../hooks/useTetris";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type Board = (string | null)[][];

export const createEmptyBoard = (): Board =>
    Array.from(Array(BOARD_HEIGHT), createEmptyRow);

export const createEmptyRow = (): (string | null)[] => Array(BOARD_WIDTH).fill(null);

export const updateBoard = (previousBoard: Board, targetPiece: IActivePiece, latestPiecePosition: { x: number; y: number }) => {
    // We declare it as let to indicate that is being mutated even though it is not being reassigned
    //eslint-disable-next-line prefer-const
    let newBoard = previousBoard.map((row) => [...row]);
    const targetPieceShape = targetPiece.tetromino.rotations[targetPiece.rotationIndex].shape;

    let canSpawn = true;
    targetPieceShape.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value !== 0) {
                const boardY = latestPiecePosition.y + (targetPieceShape.length - 1 - rowIndex);
                const boardX = latestPiecePosition.x + colIndex;
                if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                    newBoard[boardY][boardX] = targetPiece.tetromino.color;
                    if (previousBoard[boardY][boardX]) {
                        // Track that we cannot spawn another piece (game over)
                        canSpawn = false;
                    }
                }
            }
        });
    });
    const { newBoard: updatedBoard, lineScore } = clearFullLines(newBoard);

    return { updatedBoard, lineScore, canSpawn };
}