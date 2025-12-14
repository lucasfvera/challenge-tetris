import { MenuContainer } from "./MenuContainer"
import { useGameStateStore } from "../../store/store"
import GameServiceApi from "../../api/gameService/gameService"

export const PauseMenu = () => {
    const resetGame = useGameStateStore((state) => state.resetGame);
    const loadGameState = useGameStateStore((state) => state.loadGameState);
    const sessionId = useGameStateStore((state) => state.sessionId);
    const setSessionId = useGameStateStore((state) => state.setSessionId);

    const saveGame = () => {
        GameServiceApi.saveGameState().then((state) => {
            setSessionId(state.id)
        })
    }
    const loadGame = () => {
        if (!sessionId) return;
        GameServiceApi.loadGameState(sessionId).then((state) => {
            loadGameState(state)
        })
    }

    return <MenuContainer>
        <h1>Paused</h1>
        <button
            onClick={resetGame}
            className="button destroy-button"
        >
            Restart
        </button>
        <button
            onClick={saveGame}
            className="button success-button"
        >
            Save
        </button>
        <button
            onClick={loadGame}
            className="button success-button"
        >
            Load
        </button>
    </MenuContainer>
}
