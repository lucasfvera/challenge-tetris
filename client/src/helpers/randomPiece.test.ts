import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { randomPiece } from './randomPiece';
import { BOARD_HEIGHT } from '../settings/gameSettings';
import * as tetrominoesModule from '../utils/tetrominoes';

describe('randomPiece', () => {
    beforeEach(() => {
        vi.spyOn(Math, 'random');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return a piece with the correct structure', () => {
        const piece = randomPiece();

        expect(piece).toHaveProperty('type');
        expect(piece).toHaveProperty('tetromino');
        expect(piece).toHaveProperty('pos');
        expect(piece).toHaveProperty('rotationIndex');
        expect(piece).toHaveProperty('collided');
    });

    it('should initialize piece at the top of the board', () => {
        const piece = randomPiece();

        expect(piece.pos.y).toBe(BOARD_HEIGHT - 1);
    });

    it('should initialize piece with rotationIndex 0', () => {
        const piece = randomPiece();

        expect(piece.rotationIndex).toBe(0);
    });

    it('should initialize piece with collided set to false', () => {
        const piece = randomPiece();

        expect(piece.collided).toBe(false);
    });


    it('should have tetromino with rotations property', () => {
        const piece = randomPiece();

        expect(piece.tetromino).toHaveProperty('rotations');
        expect(Array.isArray(piece.tetromino.rotations)).toBe(true);
    });

    it('should have tetromino with color property', () => {
        const piece = randomPiece();

        expect(piece.tetromino).toHaveProperty('color');
        expect(typeof piece.tetromino.color).toBe('string');
    });

    it('should return an I piece when randomTetromino returns I', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.I;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'I',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('I');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return a J piece when randomTetromino returns J', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.J;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'J',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('J');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return a L piece when randomTetromino returns L', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.L;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'L',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('L');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return an O piece when randomTetromino returns O', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.O;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'O',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('O');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return an S piece when randomTetromino returns S', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.S;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'S',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('S');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return a T piece when randomTetromino returns T', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.T;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'T',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('T');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should return a Z piece when randomTetromino returns Z', () => {
        const mockTetromino = tetrominoesModule.TETROMINOES.Z;
        vi.spyOn(tetrominoesModule, 'randomTetromino').mockReturnValue({
            type: 'Z',
            tetromino: mockTetromino,
        });

        const piece = randomPiece();

        expect(piece.type).toBe('Z');
        expect(piece.tetromino).toBe(mockTetromino);
    });

    it('should call randomTetromino once', () => {
        const randomTetrominoSpy = vi.spyOn(tetrominoesModule, 'randomTetromino');

        randomPiece();

        expect(randomTetrominoSpy).toHaveBeenCalledTimes(1);
    });
});
