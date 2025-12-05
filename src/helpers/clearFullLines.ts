import type { Board } from "../utils/board";
import { createEmptyRow } from "../utils/board";

export const clearFullLines = (board: Board) => {
    const newBoard = board.map((row) => [...row]);

    for (let i = 0; i < newBoard.length; i++) {
        const row = newBoard[i];
        if (row.every((cell) => cell !== null)) {
            newBoard.splice(i, 1);
            newBoard.push(createEmptyRow());
            i--;
        }
    }
    return newBoard;
}
