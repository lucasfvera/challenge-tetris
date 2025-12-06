import { create } from 'zustand'
import type { PieceType } from '../utils/tetrominoes';

interface GameStateStore {
    level: number;
    isGamePaused: boolean;
    nextPieceType: PieceType | null;
    score: number;
    increaseLevel: () => void;
    togglePause: () => void;
    setNextPieceType: (pieceType: PieceType) => void;
    setScore: (score: number) => void;
}

export const useGameStateStore = create<GameStateStore>((set) => ({
    level: 0,
    isGamePaused: false,
    nextPieceType: null,
    score: 0,
    increaseLevel: () => set((state) => ({ level: state.level + 1 })),
    togglePause: () => set((state) => ({ isGamePaused: !state.isGamePaused })),
    setNextPieceType: (pieceType) => set({ nextPieceType: pieceType }),
    setScore: (score) => set({ score }),
    resetScore: () => set({ score: 0 }),
}))
