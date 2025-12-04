import type { RefObject } from "react";
import { BOARD_WIDTH } from "../utils/board";
import type { TetrominoBounds } from "../utils/tetrominoes";

export const canMoveLeft = (piecePosition: RefObject<{ x: number; y: number }>, bounds: TetrominoBounds) => {
    return piecePosition.current.x + bounds.minCol > 0;
}

export const canMoveRight = (piecePosition: RefObject<{ x: number; y: number }>, bounds: TetrominoBounds) => {
    return piecePosition.current.x + bounds.maxCol < BOARD_WIDTH - 1;
}