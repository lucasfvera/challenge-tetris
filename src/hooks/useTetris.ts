import { useState, useCallback } from "react";
import { TETROMINOES, type Tetromino, pieceTypeMap, type PieceType } from "../utils/tetrominoes";
import { BOARD_HEIGHT, BOARD_WIDTH, createEmptyBoard, type Board } from "../utils/board";
import { randomPiece } from "../helpers/randomPiece";

export interface IActivePiece {
    pos: { x: number; y: number };
    tetromino: Tetromino;
    type: PieceType;
    collided: boolean;
}

export const useTetris = () => {
    const [board, setBoard] = useState<Board>(createEmptyBoard());
    const [activePiece, setActivePiece] = useState<IActivePiece>({
        pos: { x: 0, y: BOARD_HEIGHT - 1 }, // Start at top, centered
        tetromino: TETROMINOES[pieceTypeMap.O],
        type: pieceTypeMap.O,
        collided: false,
    });

    const drop = useCallback(() => {
        setActivePiece((prev) => {
            if (prev.collided) return prev;

            const newY = prev.pos.y - 1;
            const { shape } = prev.tetromino;
            const bottomShapeIndex = shape.length - 1;

            // Check for collision with floor
            let collided = false;
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    // Check if the current shape has that position occupied
                    if (shape[row][col] !== 0) {
                        // Calculate actual board coordinates
                        // Shape is defined from top to bottom (Row 0 is top)
                        // Component is defined relative to origin (0,0) going up
                        // So Row 0 corresponds to y = shape.length - 1 relative to origin
                        const boardY = newY + (bottomShapeIndex - row);

                        // Collides with the floor
                        if (boardY < 0 || (boardY < BOARD_HEIGHT && board[boardY][prev.pos.x + col])) {
                            collided = true;
                            break;
                        }
                    }
                }
                if (collided) break;
            }

            if (collided) {
                // Lock the piece
                setBoard((prevBoard) => {
                    const newBoard = prevBoard.map((row) => [...row]);
                    shape.forEach((row, rowIndex) => {
                        row.forEach((value, colIndex) => {
                            if (value !== 0) {
                                const boardY = prev.pos.y + (shape.length - 1 - rowIndex);
                                const boardX = prev.pos.x + colIndex;
                                // Ensure we are within bounds before writing (just in case)
                                if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                                    newBoard[boardY][boardX] = prev.tetromino.color;
                                }
                            }
                        });
                    });
                    return newBoard;
                });

                // Spawn new piece
                const nextPiece = randomPiece();
                return nextPiece
            }

            return { ...prev, pos: { x: prev.pos.x, y: newY } };
        });
    }, [board]);

    return { board, activePiece, drop };
};
