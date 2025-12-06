import { create } from 'zustand'
import type { PieceType } from '../utils/tetrominoes';

interface GameStateStore {
    level: number;
    isGamePaused: boolean;
    nextPieceType: PieceType | null;
    increaseLevel: () => void;
    togglePause: () => void;
    setNextPieceType: (pieceType: PieceType) => void;
}

export const useGameStateStore = create<GameStateStore>((set) => ({
    level: 0,
    isGamePaused: false,
    nextPieceType: null,
    increaseLevel: () => set((state) => ({ level: state.level + 1 })),
    togglePause: () => set((state) => ({ isGamePaused: !state.isGamePaused })),
    setNextPieceType: (pieceType) => set({ nextPieceType: pieceType }),
}))
