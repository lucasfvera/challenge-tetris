import { describe, it, expect } from 'vitest';
import { clearFullLines } from './clearFullLines';
import { SCORE_PER_LINE } from '../settings/gameSettings';
import type { Board } from '../utils/board';

const EMPTY_ROW = [null, null, null, null, null, null, null, null, null, null];

describe('clearFullLines', () => {
    it('should return the same board when there are no full lines', () => {
        const board: Board = [
            ['red', null, null, null, null, null, null, null, null, null],
            [null, 'blue', null, null, null, null, null, null, null, null],
            [null, null, 'green', null, null, null, null, null, null, null],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual(board);
        expect(result.lineScore).toBe(0);
    });

    it('should clear a single full line and move it to the top', () => {
        const board: Board = [
            ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            ['blue', null, null, null, null, null, null, null, null, null],
            ['green', null, null, null, null, null, null, null, null, null],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual([
            ['blue', null, null, null, null, null, null, null, null, null],
            ['green', null, null, null, null, null, null, null, null, null],
            [...EMPTY_ROW],
        ]);
        expect(result.lineScore).toBe(SCORE_PER_LINE);
    });

    it('should clear multiple consecutive full lines', () => {
        const board: Board = [
            ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
            ['green', null, null, null, null, null, null, null, null, null],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual([
            ['green', null, null, null, null, null, null, null, null, null],
            [...EMPTY_ROW],
            [...EMPTY_ROW],
        ]);
        expect(result.lineScore).toBe(SCORE_PER_LINE * 2);
    });

    it('should clear multiple non-consecutive full lines', () => {
        const board: Board = [
            ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            ['blue', null, null, null, null, null, null, null, null, null],
            ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
            ['yellow', null, null, null, null, null, null, null, null, null],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual([
            ['blue', null, null, null, null, null, null, null, null, null],
            ['yellow', null, null, null, null, null, null, null, null, null],
            [...EMPTY_ROW],
            [...EMPTY_ROW],
        ]);
        expect(result.lineScore).toBe(SCORE_PER_LINE * 2);
    });

    it('should clear all lines when the entire board is full', () => {
        const board: Board = [
            ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
            ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual([
            [...EMPTY_ROW],
            [...EMPTY_ROW],
            [...EMPTY_ROW],
        ]);
        expect(result.lineScore).toBe(SCORE_PER_LINE * 3);
    });

    it('should not mutate the original board', () => {
        const board: Board = [
            ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            ['blue', null, null, null, null, null, null, null, null, null],
        ];
        const originalBoard = board.map(row => [...row]);

        clearFullLines(board);

        expect(board).toEqual(originalBoard);
    });

    it('should return zero score when no lines are cleared', () => {
        const board: Board = [
            ['red', null, 'red', null, 'red', null, 'red', null, 'red', null],
            [null, 'blue', null, 'blue', null, 'blue', null, 'blue', null, 'blue'],
        ];

        const result = clearFullLines(board);

        expect(result.lineScore).toBe(0);
    });

    it('should handle an empty board', () => {
        const board: Board = [
            [...EMPTY_ROW],
            [...EMPTY_ROW],
            [...EMPTY_ROW],
        ];

        const result = clearFullLines(board);

        expect(result.newBoard).toEqual(board);
        expect(result.lineScore).toBe(0);
    });
});
