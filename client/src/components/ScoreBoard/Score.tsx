import { useGameStateStore } from "../../store/store";

export const Score = () => {
    const score = useGameStateStore((state) => state.score);

    return <h2 id="score">Score: {score}</h2>;
}