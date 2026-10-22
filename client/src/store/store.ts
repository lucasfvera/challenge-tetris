import { create } from 'zustand'
import { createActivePiece, TETROMINOES, type PieceType } from '../utils/tetrominoes';
import { randomPiece } from '../helpers/randomPiece';
import { createEmptyBoard, type Board, updateBoard } from '../utils/board';
import { type IActivePiece } from '../hooks/useTetris';
import { INITIAL_LEVEL, MAX_SAVE_SLOTS, SCORE_PER_LEVEL } from '../settings/gameSettings';
import { persist } from 'zustand/middleware';
import type { GameStatePayload, SaveSlotInfo } from '../api/gameService/types';

// Generate a unique user ID for this browser instance
const generateUserId = (): string => {
    return crypto.randomUUID();
};

interface UserGameState {
    activePiece: IActivePiece;
    board: Board;
    level: number;
    nextPieceType: PieceType;
    score: number;
    userId: string;
    currentSlot: number | null;
    saveSlots: SaveSlotInfo[];
}

interface GameStateStore extends UserGameState {
    isGamePaused: boolean;
    isGameOver: boolean;
    updateBoardLines: (activePiece: IActivePiece, latestPiecePosition: { x: number; y: number }) => void;
    increaseLevel: (newLevel: number) => void;
    togglePause: () => void;
    setActivePiece: (activePiece: IActivePiece) => void;
    setNextPieceType: (pieceType: PieceType) => void;
    setScore: (score: number) => void;
    setGameOver: (isGameOver: boolean) => void;
    resetGame: () => void;
    loadGameState: (loadedState: GameStatePayload) => void;
    setSaveSlots: (slots: SaveSlotInfo[]) => void;
    setCurrentSlot: (slot: number | null) => void;
    updateSlotInfo: (slotNumber: number, info: Partial<SaveSlotInfo>) => void;
    clearSlot: (slotNumber: number) => void;
}

export const useGameStateStore = create<GameStateStore>()(persist((set) => ({
    userId: generateUserId(),
    currentSlot: null,
    saveSlots: Array.from({ length: MAX_SAVE_SLOTS }, (_, i) => ({
        slot_number: i + 1,
        is_empty: true
    })),
    level: 1,
    isGamePaused: false,
    isGameOver: false,
    activePiece: createActivePiece(randomPiece().type),
    nextPieceType: randomPiece().type,
    score: 0,
    board: createEmptyBoard(),
    updateBoardLines: (activePiece, latestPiecePosition) => set((state) => {
        const { updatedBoard, lineScore } = updateBoard(state.board, activePiece, latestPiecePosition)
        const latestScore = state.score + lineScore
        if (latestScore >= state.level * SCORE_PER_LEVEL) {
            const newLevel = Math.floor(latestScore / SCORE_PER_LEVEL) + INITIAL_LEVEL;
            state.increaseLevel(newLevel);
        }

        return {
            board: updatedBoard,
            score: state.score + lineScore
        }
    }),
    increaseLevel: (newLevel: number) => set(() => ({ level: newLevel })),
    togglePause: () => set((state) => ({ isGamePaused: !state.isGamePaused })),
    setActivePiece: (activePiece) => set({ activePiece }),
    setNextPieceType: (pieceType) => set({ nextPieceType: pieceType }),
    setScore: (score) => set({ score }),
    setGameOver: (isGameOver) => set({ isGameOver }),
    resetGame: () => set(() => ({ level: 1, score: 0, isGameOver: false, isGamePaused: false, activePiece: createActivePiece(randomPiece().type), nextPieceType: randomPiece().type, board: createEmptyBoard(), currentSlot: null })),
    loadGameState: (loadedState: GameStatePayload) => set((state) => {
        const activePieceType = loadedState.active_piece_type as PieceType
        const nextPieceType = loadedState.next_piece_type as PieceType
        const activePieceTetromino = TETROMINOES[activePieceType]

        return {
            ...state,
            activePiece: {
                pos: {
                    x: loadedState.active_piece_x,
                    y: loadedState.active_piece_y
                },
                tetromino: activePieceTetromino,
                type: activePieceType,
                rotationIndex: loadedState.active_piece_rotation,
                collided: false
            },
            board: loadedState.board,
            level: loadedState.level,
            nextPieceType: nextPieceType,
            score: loadedState.score,
            currentSlot: loadedState.slot_number
        }
    }),
    setSaveSlots: (slots: SaveSlotInfo[]) => set({ saveSlots: slots }),
    setCurrentSlot: (slot: number | null) => set({ currentSlot: slot }),
    updateSlotInfo: (slotNumber: number, info: Partial<SaveSlotInfo>) => set((state) => ({
        saveSlots: state.saveSlots.map(slot =>
            slot.slot_number === slotNumber ? { ...slot, ...info } : slot
        )
    })),
    clearSlot: (slotNumber: number) => set((state) => ({
        saveSlots: state.saveSlots.map(slot =>
            slot.slot_number === slotNumber ? { slot_number: slotNumber, is_empty: true } : slot
        ),
        currentSlot: state.currentSlot === slotNumber ? null : state.currentSlot
    })),
}), { name: "gameState" }))

