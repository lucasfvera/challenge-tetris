import { ENDPOINTS } from "./endpoints";
import { useGameStateStore } from "../../store/store";

const GAME_SERVICE_BASE_URL = "http://localhost:4004";


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
        const body = JSON.stringify(dataToSave);
        console.log(body);

        return body;

        const response = await fetch(`${this.baseUrl}${ENDPOINTS.SAVE_GAME_STATE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dataToSave
            })
        });

        if (!response.ok) {
            throw new Error("Failed to save game state");
        }

        return response.json();
    }
}

export default new GameServiceApi(GAME_SERVICE_BASE_URL);