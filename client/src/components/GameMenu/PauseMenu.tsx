import { MenuContainer } from "./MenuContainer"
import { useGameStateStore } from "../../store/store"
import GameServiceApi from "../../api/gameService/gameService"

export const PauseMenu = () => {
    const resetGame = useGameStateStore((state) => state.resetGame);
    const saveGame = () => {
        GameServiceApi.saveGameState()
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
    </MenuContainer>
}
