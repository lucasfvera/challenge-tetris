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
  const isGameOver = useGameStateStore((state) => state.isGameOver);
  const score = useGameStateStore((state) => state.score);
  const resetGame = useGameStateStore((state) => state.resetGame);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ position: "relative" }} id="canvas-container">
        <Activity mode={isGamePaused ? "visible" : "hidden"}>
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
            <h1>Paused</h1>
            <button
              onClick={resetGame}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1.2rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
            >
              Restart
            </button>
          </div>
        </Activity>
        <Activity mode={isGameOver ? "visible" : "hidden"}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "2rem",
            borderRadius: "10px",
            border: "2px solid #ff4444"
          }}>
            <h1 style={{ color: "#ff4444", marginBottom: "1rem" }}>Game Over</h1>
            <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Final Score: {score}</p>
            <button
              onClick={resetGame}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1.2rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
            >
              Restart
            </button>
          </div>
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
