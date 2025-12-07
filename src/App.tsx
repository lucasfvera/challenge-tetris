import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import { Activity, useMemo } from "react";
import { controlsMap, type Controls } from "./utils/controlsMap";
import { useGameStateStore } from "./store/store";
import { Score } from "./components/ScoreBoard/Score";
import { NextPiecePreview } from "./components/NextPiecePreview/NextPiecePreview";
import { Level } from "./components/ScoreBoard/Level";

function App() {

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: controlsMap.moveLeft, keys: ['ArrowLeft', 'KeyA'] },
    { name: controlsMap.moveRight, keys: ['ArrowRight', 'KeyD'] },
    { name: controlsMap.rotate, keys: ['ArrowUp', 'KeyW'] },
    { name: controlsMap.softDrop, keys: ['ArrowDown', 'KeyS'] },
    { name: controlsMap.hardDrop, keys: ['Space'] },
    { name: controlsMap.pause, keys: ['p'] },
  ], [])

  const isGamePaused = useGameStateStore((state) => state.isGamePaused);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ position: "relative" }} id="canvas-container">
        <Activity mode={isGamePaused ? "visible" : "hidden"}>
          <h1 id="paused-title" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>Paused</h1>
        </Activity>
        <KeyboardControls map={map}>
          <Canvas style={{ backgroundColor: "black" }}>
            <GameScene />
          </Canvas>
        </KeyboardControls>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NextPiecePreview />
        <Level />
        <Score />
      </div>
    </div>
  );
}

export default App;
