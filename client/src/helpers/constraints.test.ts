import { describe, it, expect, beforeEach } from 'vitest';
import { canMoveLeft, canMoveRight, canRotate } from './constraints';
import type { Board } from '../utils/board';
import type { TetrominoBounds } from '../utils/tetrominoes';
import type { RefObject } from 'react';

const EMPTY_ROW = [null, null, null, null, null, null, null, null, null, null];

describe('canMoveLeft', () => {
    let piecePosition: RefObject<{ x: number; y: number }>;
    let emptyBoard: Board;

    beforeEach(() => {
        emptyBoard = Array(20).fill(null).map(() => [...EMPTY_ROW]);
    });

    it('should allow moving left when there is space', () => {
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 1, bottomRow: 0 };
        const shape = [[1, 1]];

        const result = canMoveLeft(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent moving left when hitting the left wall', () => {
        piecePosition = { current: { x: 0, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 1, bottomRow: 0 };
        const shape = [[1, 1]];

        const result = canMoveLeft(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should prevent moving left when the piece would collide with occupied cells', () => {
        const board: Board = Array(20).fill(null).map(() => [...EMPTY_ROW]);
        board[10][4] = 'red';
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 0, bottomRow: 0 };
        const shape = [[1]];

        const result = canMoveLeft(piecePosition, bounds, shape, board);

        expect(result).toBe(false);
    });

    it('should allow moving left with L-shaped piece when path is clear', () => {
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 2, bottomRow: 1 };
        const shape = [
            [0, 0, 1],
            [1, 1, 1],
        ];

        const result = canMoveLeft(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent moving left when L-shaped piece would collide', () => {
        const board: Board = Array(20).fill(null).map(() => [...EMPTY_ROW]);
        board[10][4] = 'red';
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 2, bottomRow: 1 };
        const shape = [
            [0, 0, 1],
            [1, 1, 1],
        ];

        const result = canMoveLeft(piecePosition, bounds, shape, board);

        expect(result).toBe(false);
    });

    it('should prevent moving left when piece with offset minCol would hit the wall', () => {
        piecePosition = { current: { x: -1, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 1, maxCol: 2, bottomRow: 0 };
        const shape = [[0, 1, 1]];

        const result = canMoveLeft(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(false);
    });
});

describe('canMoveRight', () => {
    let piecePosition: RefObject<{ x: number; y: number }>;
    let emptyBoard: Board;

    beforeEach(() => {
        emptyBoard = Array(20).fill(null).map(() => [...EMPTY_ROW]);
    });

    it('should allow moving right when there is space', () => {
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 1, bottomRow: 0 };
        const shape = [[1, 1]];

        const result = canMoveRight(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent moving right when hitting the right wall', () => {
        piecePosition = { current: { x: 8, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 1, bottomRow: 0 };
        const shape = [[1, 1]];

        const result = canMoveRight(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should prevent moving right when the piece would collide with occupied cells', () => {
        const board: Board = Array(20).fill(null).map(() => [...EMPTY_ROW]);
        board[10][6] = 'blue';
        piecePosition = { current: { x: 5, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 0, bottomRow: 0 };
        const shape = [[1]];

        const result = canMoveRight(piecePosition, bounds, shape, board);

        expect(result).toBe(false);
    });

    it('should allow moving right with I-piece when path is clear', () => {
        piecePosition = { current: { x: 2, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 3, bottomRow: 0 };
        const shape = [[1, 1, 1, 1]];

        const result = canMoveRight(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent moving right when I-piece would hit the wall', () => {
        piecePosition = { current: { x: 6, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 3, bottomRow: 0 };
        const shape = [[1, 1, 1, 1]];

        const result = canMoveRight(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should handle piece with offset maxCol correctly', () => {
        piecePosition = { current: { x: 7, y: 10 } };
        const bounds: TetrominoBounds = { minCol: 0, maxCol: 2, bottomRow: 0 };
        const shape = [[1, 1, 1]];

        const result = canMoveRight(piecePosition, bounds, shape, emptyBoard);

        expect(result).toBe(false);
    });
});

describe('canRotate', () => {
    let piecePosition: RefObject<{ x: number; y: number }>;
    let emptyBoard: Board;

    beforeEach(() => {
        piecePosition = { current: { x: 5, y: 10 } };
        emptyBoard = Array(20).fill(null).map(() => [...EMPTY_ROW]);
    });

    it('should allow rotation when there is space', () => {
        const nextShape = [
            [1],
            [1],
            [1],
            [1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent rotation when the piece would hit the left wall', () => {
        piecePosition.current = { x: -1, y: 10 };
        const nextShape = [[1, 1]];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should prevent rotation when the piece would hit the right wall', () => {
        piecePosition.current = { x: 9, y: 10 };
        const nextShape = [[1, 1]];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should prevent rotation when the piece would hit the floor', () => {
        piecePosition.current = { x: 5, y: -1 };
        const nextShape = [
            [1],
            [1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(false);
    });

    it('should prevent rotation when the piece would collide with occupied cells', () => {
        const board: Board = Array(20).fill(null).map(() => [...EMPTY_ROW]);
        board[10][5] = 'green';
        piecePosition.current = { x: 5, y: 10 };
        const nextShape = [[1]];

        const result = canRotate(piecePosition, nextShape, board);

        expect(result).toBe(false);
    });

    it('should allow rotation of T-piece when space is available', () => {
        piecePosition.current = { x: 5, y: 10 };
        const nextShape = [
            [0, 1, 0],
            [1, 1, 1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent rotation of T-piece when blocked by other pieces', () => {
        const board: Board = Array(20).fill(null).map(() => [...EMPTY_ROW]);
        board[10][6] = 'yellow';
        piecePosition.current = { x: 5, y: 10 };
        const nextShape = [
            [0, 1, 0],
            [1, 1, 1],
        ];

        const result = canRotate(piecePosition, nextShape, board);

        expect(result).toBe(false);
    });

    it('should handle rotation near the top of the board', () => {
        piecePosition.current = { x: 5, y: 19 };
        const nextShape = [
            [1, 1],
            [1, 1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should prevent rotation when piece extends beyond board height', () => {
        piecePosition.current = { x: 5, y: 18 };
        const nextShape = [
            [1],
            [1],
            [1],
            [1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(true);
    });

    it('should handle complex L-shaped rotation', () => {
        piecePosition.current = { x: 5, y: 10 };
        const nextShape = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];

        const result = canRotate(piecePosition, nextShape, emptyBoard);

        expect(result).toBe(true);
    });
});
