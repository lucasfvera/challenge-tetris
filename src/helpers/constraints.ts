import type { RefObject } from "react";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../settings/gameSettings";
import type { Board } from "../utils/board";
import type { TetrominoBounds } from "../utils/tetrominoes";

export const canMoveLeft = (piecePosition: RefObject<{ x: number; y: number }>, bounds: TetrominoBounds, shape: number[][], board: Board) => {
    // 1. Wall Collision
    if (piecePosition.current.x + bounds.minCol <= 0) return false;

    // 2. Board Collision
    const currentX = piecePosition.current.x;
    const currentY = piecePosition.current.y;
    const targetX = currentX - 1;

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const boardX = targetX + col;
                const boardY = currentY + (shape.length - 1 - row);

                // Check if the position is occupied on the board
                if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                    if (board[boardY][boardX] !== null) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

export const canMoveRight = (piecePosition: RefObject<{ x: number; y: number }>, bounds: TetrominoBounds, shape: number[][], board: Board) => {
    // 1. Wall Collision
    if (piecePosition.current.x + bounds.maxCol >= BOARD_WIDTH - 1) return false;

    // 2. Board Collision
    const currentX = piecePosition.current.x;
    const currentY = piecePosition.current.y;
    const targetX = currentX + 1;

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const boardX = targetX + col;
                const boardY = currentY + (shape.length - 1 - row);

                // Check if the position is occupied on the board
                if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                    if (board[boardY][boardX] !== null) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

export const canRotate = (piecePosition: RefObject<{ x: number; y: number }>, nextShape: number[][], board: Board) => {
    const currentX = piecePosition.current.x;
    const currentY = piecePosition.current.y;

    for (let row = 0; row < nextShape.length; row++) {
        for (let col = 0; col < nextShape[row].length; col++) {
            if (nextShape[row][col] !== 0) {
                const boardX = currentX + col;
                const boardY = currentY + (nextShape.length - 1 - row);

                // 1. Wall Collision
                if (boardX < 0 || boardX >= BOARD_WIDTH) {
                    return false;
                }

                // 2. Floor Collision
                if (boardY < 0) {
                    return false;
                }

                // 3. Board Collision
                if (boardY < BOARD_HEIGHT && board[boardY][boardX] !== null) {
                    return false;
                }
            }
        }
    }
    return true;
}