import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";
import { controlsMap, type Controls } from "./utils/controlsMap";

function App() {

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: controlsMap.moveLeft, keys: ['ArrowLeft', 'KeyA'] },
    { name: controlsMap.moveRight, keys: ['ArrowRight', 'KeyD'] },
    { name: controlsMap.rotate, keys: ['ArrowUp', 'KeyW'] },
    { name: controlsMap.softDrop, keys: ['ArrowDown', 'KeyS'] },
    { name: controlsMap.hardDrop, keys: ['Space'] },
  ], [])

  return (
    <div id="canvas-container">
      <KeyboardControls map={map}>
        <Canvas>
          <GameScene />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
