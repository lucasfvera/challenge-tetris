import { ENDPOINTS } from "./endpoints";
import { useGameStateStore } from "../../store/store";
import { type GameStatePayload } from "./types";

const GAME_SERVICE_BASE_URL = "http://localhost:8000";


class GameServiceApi {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async saveGameState() {
        const { activePiece, board, level, nextPieceType, score, sessionId } = useGameStateStore.getState();

        // If the user has a sessionId, they already saved the game once and we will use that same "session" to store new game saves.
        const dataToSave: GameStatePayload = {
            id: sessionId ? sessionId : undefined,
            active_piece_type: activePiece.type,
            active_piece_x: activePiece.pos.x,
            active_piece_y: activePiece.pos.y,
            active_piece_rotation: activePiece.rotationIndex,
            board,
            level,
            next_piece_type: nextPieceType,
            score
        }

        try {
            const response = await fetch(`${this.baseUrl}${ENDPOINTS.USER.GAME_STATE}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...dataToSave
                })
            });

            if (!response.ok) {
                throw new Error("Failed to save game state");
            }

            return response.json();

        } catch (error) {
            console.error("Error saving game state:", error);
        }


    }

    async loadGameState(sessionId: string) {
        try {
            const response = await fetch(`${this.baseUrl}${ENDPOINTS.USER.GAME_STATE}/${sessionId}`);
            if (!response.ok) {
                throw new Error("Failed to load game state");
            }

            return response.json();
        } catch (error) {
            console.error("Error loading game state:", error);
        }
    }
}

export default new GameServiceApi(GAME_SERVICE_BASE_URL);