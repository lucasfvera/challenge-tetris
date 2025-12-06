import { useState, useCallback, useRef, useEffect } from "react";
import { TETROMINOES, type Tetromino, pieceTypeMap, type PieceType } from "../utils/tetrominoes";
import { BOARD_HEIGHT, BOARD_WIDTH, createEmptyBoard, type Board } from "../utils/board";
import { randomPiece } from "../helpers/randomPiece";
import { canRotate } from "../helpers/constraints";
import { clearFullLines } from "../helpers/clearFullLines";

export interface IActivePiece {
    pos: { x: number; y: number };
    tetromino: Tetromino;
    type: PieceType;
    rotationIndex: number;
    collided: boolean;
}

export const useTetris = () => {
    const [board, setBoard] = useState<Board>(createEmptyBoard());
    const [activePiece, setActivePiece] = useState<IActivePiece>({
        pos: { x: 0, y: BOARD_HEIGHT - 1 }, // Start at top, centered
        tetromino: TETROMINOES[pieceTypeMap.O],
        type: pieceTypeMap.O,
        rotationIndex: 0,
        collided: false,
    });

    const latestScore = useRef(0);

    const boardRef = useRef(board);
    useEffect(() => {
        boardRef.current = board;
    }, [board]);

    const piecePosition = useRef({ x: 0, y: BOARD_HEIGHT - 1 });
    const activePieceRef = useRef(activePiece);
    useEffect(() => {
        activePieceRef.current = activePiece;
        piecePosition.current = activePiece.pos;
    }, [activePiece]);

    const tick = useCallback(() => {
        const prevPos = piecePosition.current;
        const currentPiece = activePieceRef.current;

        if (currentPiece.collided) return;

        const newY = prevPos.y - 1;
        const { shape } = currentPiece.tetromino.rotations[currentPiece.rotationIndex];
        const bottomShapeIndex = shape.length - 1;

        // Check for collision with floor or other pieces
        let collided = false;
        const currentBoard = boardRef.current;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardY = newY + (bottomShapeIndex - row);

                    // Check floor or board collision
                    if (boardY < 0 || (boardY < BOARD_HEIGHT && currentBoard[boardY][prevPos.x + col])) {
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
                // We declare it as let to indicate that is being mutated even though it is not being reassigned
                //eslint-disable-next-line prefer-const
                let newBoard = prevBoard.map((row) => [...row]);
                shape.forEach((row, rowIndex) => {
                    row.forEach((value, colIndex) => {
                        if (value !== 0) {
                            const boardY = prevPos.y + (shape.length - 1 - rowIndex);
                            const boardX = prevPos.x + colIndex;
                            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                                newBoard[boardY][boardX] = currentPiece.tetromino.color;
                            }
                        }
                    });
                });
                const { newBoard: updatedBoard, lineScore } = clearFullLines(newBoard);
                latestScore.current += lineScore;

                return updatedBoard;
            });

            // Spawn new piece
            const nextPiece = randomPiece();
            setActivePiece(nextPiece);
            // Position ref will be updated by the useEffect above
        } else {
            // Update position ref
            piecePosition.current = { x: prevPos.x, y: newY };
        }
    }, []);

    const rotate = useCallback(() => {
        const currentPiece = activePieceRef.current;
        if (currentPiece.collided) return;

        const nextRotationIndex = (currentPiece.rotationIndex + 1) % 4;
        const nextShape = currentPiece.tetromino.rotations[nextRotationIndex].shape;

        if (canRotate(piecePosition, nextShape, boardRef.current)) {
            setActivePiece((prev) => ({
                ...prev,
                rotationIndex: nextRotationIndex,
                pos: { x: piecePosition.current.x, y: piecePosition.current.y },
            }));
        }
    }, [piecePosition]);

    return { board, activePiece, piecePosition, tick, rotate, latestScore };
};

