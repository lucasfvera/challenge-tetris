import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";
import { controlsMap, type Controls } from "./utils/controlsMap";
import { Score } from "./components/ScoreBoard/Score";
import { NextPiecePreview } from "./components/NextPiecePreview/NextPiecePreview";
import { Level } from "./components/ScoreBoard/Level";
import { GameMenu } from "./components/GameMenu/GameMenu";

function App() {

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: controlsMap.moveLeft, keys: ['ArrowLeft', 'KeyA'] },
    { name: controlsMap.moveRight, keys: ['ArrowRight', 'KeyD'] },
    { name: controlsMap.rotate, keys: ['ArrowUp', 'KeyW'] },
    { name: controlsMap.softDrop, keys: ['ArrowDown', 'KeyS'] },
    { name: controlsMap.hardDrop, keys: ['Space'] },
    { name: controlsMap.pause, keys: ['p'] },
  ], [])

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ position: "relative" }} id="canvas-container">
        <GameMenu />
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
