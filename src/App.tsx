import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";
import { KeyboardControls } from "@react-three/drei";
import { controlsMap } from "./utils/controlsMap";
import { Score } from "./components/ScoreBoard/Score";
import { NextPiecePreview } from "./components/NextPiecePreview/NextPiecePreview";
import { Level } from "./components/ScoreBoard/Level";
import { GameMenu } from "./components/GameMenu/GameMenu";

function App() {

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ position: "relative" }} id="canvas-container">
        <GameMenu />
        <KeyboardControls map={controlsMap}>
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
