import { SCORE_PER_LINE } from "../settings/gameSettings";
import type { Board } from "../utils/board";
import { createEmptyRow } from "../utils/board";

export const clearFullLines = (board: Board) => {
    const newBoard = board.map((row) => [...row]);
    let clearedLines = 0;

    for (let i = 0; i < newBoard.length; i++) {
        const row = newBoard[i];
        if (row.every((cell) => cell !== null)) {
            newBoard.splice(i, 1);
            newBoard.push(createEmptyRow());
            i--;
            clearedLines++;
        }
    }

    return { newBoard, lineScore: clearedLines * SCORE_PER_LINE };
}
