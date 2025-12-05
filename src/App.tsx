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
    { name: controlsMap.pause, keys: ['p'] },
  ], [])

  return (<>
    <div style={{ position: "relative" }} id="canvas-container">
      <h1 id="paused-title" style={{ visibility: "hidden", position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>Paused</h1>
      <KeyboardControls map={map}>
        <Canvas>
          <GameScene />
        </Canvas>
      </KeyboardControls>
    </div>
  </>
  );
}

export default App;
