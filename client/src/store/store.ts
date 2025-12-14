import { create } from 'zustand'
import { createActivePiece, TETROMINOES, type PieceType } from '../utils/tetrominoes';
import { randomPiece } from '../helpers/randomPiece';
import { createEmptyBoard, type Board, updateBoard } from '../utils/board';
import { type IActivePiece } from '../hooks/useTetris';
import { INITIAL_LEVEL, SCORE_PER_LEVEL } from '../settings/gameSettings';
import { persist } from 'zustand/middleware';
import type { GameStatePayload } from '../api/gameService/types';

interface UserGameState {
    activePiece: IActivePiece;
    board: Board;
    level: number;
    nextPieceType: PieceType;
    score: number;
    // We will track as a session ID the id returned by the server when saving the game. This should actually be handled by cookies
    sessionId: string;
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
    setSessionId: (sessionId: string) => void;
}

export const useGameStateStore = create<GameStateStore>()(persist((set) => ({
    sessionId: "",
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
    resetGame: () => set(() => ({ level: 1, score: 0, isGameOver: false, isGamePaused: false, activePiece: createActivePiece(randomPiece().type), nextPieceType: randomPiece().type, board: createEmptyBoard() })),
    loadGameState: (loadedState: GameStatePayload) => set((state) => {
        const activePieceType = loadedState.active_piece_type as PieceType
        const nextPieceType = loadedState.next_piece_type as PieceType
        const activePieceTetromino = TETROMINOES[activePieceType]

        const stateToLoad: UserGameState = {
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
            sessionId: loadedState.id!
        }

        return { ...state, ...stateToLoad }
    }),
    setSessionId: (sessionId: string) => set({ sessionId }),
}), { name: "gameState" }))
