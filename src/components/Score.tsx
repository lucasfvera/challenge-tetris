import { useGameStateStore } from "../store/store";

export const Score = () => {
    const score = useGameStateStore((state) => state.score);

    return <h1 id="score">{score}</h1>;
}