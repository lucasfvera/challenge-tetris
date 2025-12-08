import { MenuContainer } from "./MenuContainer"
import { useGameStateStore } from "../../store/store"

export const PauseMenu = () => {
    const resetGame = useGameStateStore((state) => state.resetGame);

    return <MenuContainer>
        <h1>Paused</h1>
        <button
            onClick={resetGame}
            className="primary-button"
        >
            Restart
        </button>
    </MenuContainer>
}
