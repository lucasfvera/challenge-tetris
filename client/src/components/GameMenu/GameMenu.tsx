import { Activity } from "react";
import { useGameStateStore } from "../../store/store";
import './styles/GameMenu.css'
import { GameOverMenu } from "./GameOverMenu";
import { PauseMenu } from "./PauseMenu";

export const GameMenu = () => {
    const isGamePaused = useGameStateStore((state) => state.isGamePaused);
    const isGameOver = useGameStateStore((state) => state.isGameOver);

    return <>
        <Activity mode={isGamePaused ? "visible" : "hidden"}>
            <PauseMenu />
        </Activity>
        <Activity mode={isGameOver ? "visible" : "hidden"}>
            <GameOverMenu />
        </Activity>
    </>;
}