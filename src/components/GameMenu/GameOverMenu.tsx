import { MenuContainer } from "./MenuContainer"
import { useGameStateStore } from "../../store/store"

export const GameOverMenu = () => {
    const score = useGameStateStore((state) => state.score);
    const resetGame = useGameStateStore((state) => state.resetGame);

    return <MenuContainer>
        <h1 style={{ color: "#ff4444", marginBottom: "1rem" }}>Game Over</h1>
        <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Final Score: {score}</p>
        <button
            onClick={resetGame}
            className="button success-button"
        >
            Restart
        </button>
    </MenuContainer>
}
