import type { RefObject } from "react";

export const handleMoveRight = (piecePosition: RefObject<{ x: number; y: number }>) => {
    piecePosition.current = { x: piecePosition.current.x + 1, y: piecePosition.current.y };
}

export const handleMoveLeft = (piecePosition: RefObject<{ x: number; y: number }>) => {
    piecePosition.current = { x: piecePosition.current.x - 1, y: piecePosition.current.y };
}
