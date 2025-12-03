import { Canvas } from "@react-three/fiber";
import GameScene from "./components/GameScene";
import "./App.css";

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <GameScene />
      </Canvas>
    </div>
  );
}

export default App;
