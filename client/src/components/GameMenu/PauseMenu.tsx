import { MenuContainer } from "./MenuContainer"
import { useGameStateStore } from "../../store/store"
import { SaveSlotsPanel } from "./SaveSlotsPanel"

export const PauseMenu = () => {
    const resetGame = useGameStateStore((state) => state.resetGame);

    return <MenuContainer>
        <h1>Paused</h1>
        <SaveSlotsPanel />
        <button
            onClick={resetGame}
            className="button destroy-button"
        >
            Restart
        </button>
    </MenuContainer>
}

