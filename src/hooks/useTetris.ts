import { useRef, useEffect } from "react";
import { type Tetromino, type PieceType, createActivePiece } from "../utils/tetrominoes";
import { randomPiece } from "../helpers/randomPiece";
import { canRotate } from "../helpers/constraints";
import { useGameStateStore } from "../store/store";
import { INITIAL_PIECE_POSITION, BOARD_HEIGHT } from "../settings/gameSettings";

export interface IActivePiece {
    pos: { x: number; y: number };
    tetromino: Tetromino;
    type: PieceType;
    rotationIndex: number;
    collided: boolean;
}


export const useTetris = () => {
    const activePiece = useGameStateStore((state) => (state.activePiece));
    const setActivePiece = useGameStateStore((state) => (state.setActivePiece));
    const setNextPieceType = useGameStateStore((state) => (state.setNextPieceType));
    const nextPieceType = useGameStateStore((state) => (state.nextPieceType));
    const board = useGameStateStore((state) => (state.board));
    const updateBoardLines = useGameStateStore((state) => (state.updateBoardLines));

    const latestScore = useRef(0);
    const piecePosition = useRef(INITIAL_PIECE_POSITION);

    useEffect(() => {
        piecePosition.current = activePiece.pos;
    }, [activePiece]);

    const tick = () => {
        const prevPos = piecePosition.current;
        const currentPiece = activePiece;

        if (currentPiece.collided) return;

        const newY = prevPos.y - 1;
        const { shape } = currentPiece.tetromino.rotations[currentPiece.rotationIndex];
        const bottomShapeIndex = shape.length - 1;

        // Check for collision with floor or other pieces
        let collided = false;
        const currentBoard = board;

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
            updateBoardLines(currentPiece, piecePosition.current);

            // Spawn new piece
            setActivePiece(createActivePiece(nextPieceType));
            setNextPieceType(randomPiece().type);
            // Position ref will be updated by the useEffect above
        } else {
            // Update position ref
            piecePosition.current = { x: prevPos.x, y: newY };
        }
    }

    const rotate = () => {
        const currentPiece = activePiece;
        if (currentPiece.collided) return;

        const nextRotationIndex = (currentPiece.rotationIndex + 1) % 4;
        const nextShape = currentPiece.tetromino.rotations[nextRotationIndex].shape;

        if (canRotate(piecePosition, nextShape, board)) {
            setActivePiece({
                ...currentPiece,
                rotationIndex: nextRotationIndex,
                pos: { x: piecePosition.current.x, y: piecePosition.current.y },
            });
        }
    }

    return { board, piecePosition, tick, rotate, latestScore };
};

