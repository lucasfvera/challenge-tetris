import { ENDPOINTS } from "./endpoints";
import { useGameStateStore } from "../../store/store";

const GAME_SERVICE_BASE_URL = "http://localhost:8000";


class GameServiceApi {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async saveGameState() {
        const { activePiece, board, level, nextPieceType, score } = useGameStateStore.getState();
        const dataToSave = {
            activePiece,
            board,
            level,
            nextPieceType,
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

    async loadGameState() {
        try {
            const response = await fetch(`${this.baseUrl}${ENDPOINTS.USER.GAME_STATE}`);
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