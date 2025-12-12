import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";
import { KeyboardControls } from "@react-three/drei";
import { controlsMap } from "./utils/controlsMap";
import { Score } from "./components/ScoreBoard/Score";
import { NextPiecePreview } from "./components/NextPiecePreview/NextPiecePreview";
import { Level } from "./components/ScoreBoard/Level";
import { useState, lazy } from "react";

const GameMenu = lazy(() => import("./components/GameMenu/GameMenu").then((module) => ({ default: module.GameMenu })));

function App() {

  const [camera, setCamera] = useState<'orto' | 'pers'>('orto');

  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
      <div style={{ position: "relative" }} id="canvas-container">
        <GameMenu />
        <KeyboardControls map={controlsMap}>
          <Canvas style={{ backgroundColor: "#0A0A0A" }}>
            <GameScene camera={camera} />
          </Canvas>
        </KeyboardControls>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NextPiecePreview />
        <Level />
        <Score />
        <button className="primary-button" onClick={() => setCamera(prev => prev === 'orto' ? 'pers' : 'orto')}>Toggle camera</button>
      </div>
    </div>
  );
}

export default App;
