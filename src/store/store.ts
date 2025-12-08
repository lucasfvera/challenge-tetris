import { create } from 'zustand'
import { createActivePiece, type PieceType } from '../utils/tetrominoes';
import { randomPiece } from '../helpers/randomPiece';
import { createEmptyBoard, type Board, updateBoard } from '../utils/board';
import { type IActivePiece } from '../hooks/useTetris';
import { INITIAL_LEVEL, SCORE_PER_LEVEL } from '../settings/gameSettings';

interface GameStateStore {
    level: number;
    isGamePaused: boolean;
    isGameOver: boolean;
    activePiece: IActivePiece;
    nextPieceType: PieceType;
    score: number;
    board: Board;
    updateBoardLines: (activePiece: IActivePiece, latestPiecePosition: { x: number; y: number }) => void;
    increaseLevel: (newLevel: number) => void;
    togglePause: () => void;
    setActivePiece: (activePiece: IActivePiece) => void;
    setNextPieceType: (pieceType: PieceType) => void;
    setScore: (score: number) => void;
    setGameOver: (isGameOver: boolean) => void;
    resetGame: () => void;
}

export const useGameStateStore = create<GameStateStore>((set) => ({
    level: 1,
    isGamePaused: false,
    isGameOver: false,
    activePiece: createActivePiece(randomPiece().type),
    nextPieceType: randomPiece().type,
    score: 0,
    board: createEmptyBoard(),
    updateBoardLines: (activePiece, latestPiecePosition) => set((state) => {
        const { updatedBoard, lineScore, canSpawn } = updateBoard(state.board, activePiece, latestPiecePosition)
        const latestScore = state.score + lineScore
        if (latestScore >= state.level * SCORE_PER_LEVEL) {
            const newLevel = Math.floor(latestScore / SCORE_PER_LEVEL) + INITIAL_LEVEL;
            state.increaseLevel(newLevel);
        }

        return {
            board: updatedBoard,
            score: state.score + lineScore,
            isGameOver: !canSpawn
        }
    }),
    increaseLevel: (newLevel: number) => set(() => ({ level: newLevel })),
    togglePause: () => set((state) => ({ isGamePaused: !state.isGamePaused })),
    setActivePiece: (activePiece) => set({ activePiece }),
    setNextPieceType: (pieceType) => set({ nextPieceType: pieceType }),
    setScore: (score) => set({ score }),
    setGameOver: (isGameOver) => set({ isGameOver }),
    resetGame: () => set(() => ({ level: 1, score: 0, isGameOver: false, isGamePaused: false, activePiece: createActivePiece(randomPiece().type), nextPieceType: randomPiece().type, board: createEmptyBoard() })),
}))
