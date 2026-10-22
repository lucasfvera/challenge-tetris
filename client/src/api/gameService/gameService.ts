import { ENDPOINTS } from "./endpoints";
import { useGameStateStore } from "../../store/store";
import { type GameStatePayload, type SaveSlotInfo } from "./types";
import { MAX_SAVE_SLOTS } from "../../settings/gameSettings";

const GAME_SERVICE_BASE_URL = "http://localhost:8000";


class GameServiceApi {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async saveGameState(slotNumber: number): Promise<GameStatePayload | undefined> {
        const { activePiece, board, level, nextPieceType, score, userId } = useGameStateStore.getState();

        const dataToSave: GameStatePayload = {
            slot_number: slotNumber,
            user_id: userId,
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
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) {
                throw new Error("Failed to save game state");
            }

            return response.json();

        } catch (error) {
            console.error("Error saving game state:", error);
        }
    }

    async loadGameState(slotNumber: number): Promise<GameStatePayload | undefined> {
        const { userId } = useGameStateStore.getState();

        try {
            const response = await fetch(
                `${this.baseUrl}${ENDPOINTS.USER.GAME_STATE}/${slotNumber}?user_id=${encodeURIComponent(userId)}`
            );
            if (!response.ok) {
                throw new Error("Failed to load game state");
            }

            return response.json();
        } catch (error) {
            console.error("Error loading game state:", error);
        }
    }

    async getSaveSlots(): Promise<SaveSlotInfo[]> {
        const { userId } = useGameStateStore.getState();

        try {
            const response = await fetch(
                `${this.baseUrl}${ENDPOINTS.USER.GAME_SLOTS}?user_id=${encodeURIComponent(userId)}`
            );
            if (!response.ok) {
                throw new Error("Failed to get save slots");
            }

            return response.json();
        } catch (error) {
            console.error("Error getting save slots:", error);
            return Array.from({ length: MAX_SAVE_SLOTS }, (_, i) => ({
                slot_number: i + 1,
                is_empty: true
            }));
        }
    }

    async deleteSlot(slotNumber: number): Promise<boolean> {
        const { userId } = useGameStateStore.getState();

        try {
            const response = await fetch(
                `${this.baseUrl}${ENDPOINTS.USER.GAME_STATE}/${slotNumber}?user_id=${encodeURIComponent(userId)}`,
                { method: "DELETE" }
            );
            if (!response.ok) {
                throw new Error("Failed to delete save slot");
            }

            return true;
        } catch (error) {
            console.error("Error deleting save slot:", error);
            return false;
        }
    }
}

export default new GameServiceApi(GAME_SERVICE_BASE_URL);