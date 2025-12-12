import { useGameStateStore } from "../../store/store";

export const Level = () => {
    const level = useGameStateStore((state) => state.level);

    return <h2 id="level">Level: {level}</h2>;
}