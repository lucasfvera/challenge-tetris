import { describe, it, expect } from 'vitest';
import { handleMoveRight, handleMoveLeft } from './controlsBindings';
import type { RefObject } from 'react';

describe('handleMoveRight', () => {
    it('should increment the x position by 1', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 5, y: 10 },
        };

        handleMoveRight(piecePosition);

        expect(piecePosition.current.x).toBe(6);
    });

    it('should keep the y position unchanged', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 5, y: 10 },
        };

        handleMoveRight(piecePosition);

        expect(piecePosition.current.y).toBe(10);
    });

    it('should handle moving right from position 0', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 0, y: 5 },
        };

        handleMoveRight(piecePosition);

        expect(piecePosition.current).toEqual({ x: 1, y: 5 });
    });

    it('should handle moving right from negative position', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: -1, y: 3 },
        };

        handleMoveRight(piecePosition);

        expect(piecePosition.current).toEqual({ x: 0, y: 3 });
    });

    it('should handle multiple consecutive moves right', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 2, y: 8 },
        };

        handleMoveRight(piecePosition);
        handleMoveRight(piecePosition);
        handleMoveRight(piecePosition);

        expect(piecePosition.current.x).toBe(5);
    });
});

describe('handleMoveLeft', () => {
    it('should decrement the x position by 1', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 5, y: 10 },
        };

        handleMoveLeft(piecePosition);

        expect(piecePosition.current.x).toBe(4);
    });

    it('should keep the y position unchanged', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 5, y: 10 },
        };

        handleMoveLeft(piecePosition);

        expect(piecePosition.current.y).toBe(10);
    });

    it('should handle moving left to position 0', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 1, y: 7 },
        };

        handleMoveLeft(piecePosition);

        expect(piecePosition.current).toEqual({ x: 0, y: 7 });
    });

    it('should handle moving left to negative position', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 0, y: 12 },
        };

        handleMoveLeft(piecePosition);

        expect(piecePosition.current).toEqual({ x: -1, y: 12 });
    });

    it('should handle multiple consecutive moves left', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 8, y: 4 },
        };

        handleMoveLeft(piecePosition);
        handleMoveLeft(piecePosition);
        handleMoveLeft(piecePosition);

        expect(piecePosition.current.x).toBe(5);
    });
});

describe('handleMoveRight and handleMoveLeft integration', () => {
    it('should return to original position after moving right then left', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 5, y: 10 },
        };

        handleMoveRight(piecePosition);
        handleMoveLeft(piecePosition);

        expect(piecePosition.current).toEqual({ x: 5, y: 10 });
    });

    it('should return to original position after moving left then right', () => {
        const piecePosition: RefObject<{ x: number; y: number }> = {
            current: { x: 3, y: 7 },
        };

        handleMoveLeft(piecePosition);
        handleMoveRight(piecePosition);

        expect(piecePosition.current).toEqual({ x: 3, y: 7 });
    });
});
