import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useTetris } from "../hooks/useTetris";
import { PieceRenderer } from "./pieces/PieceRenderer";

const GameScene = () => {
  const { board, activePiece, drop } = useTetris();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    // We want to make the piece drop independent from the
    // users frame rate. This will make the piece drop at a
    // constant rate of 1 second.
    timeRef.current += delta * 1000;
    if (timeRef.current > 200) {
      drop();
      timeRef.current = 0;
    }
  });

  return (
    <>
      <gridHelper args={[20, 20]} position={[0.5, 0.5, 0]} rotation-x={Math.PI / 2} />
      <OrthographicCamera makeDefault zoom={40} position={[0.5, 0.5, 100]} />
      <ambientLight intensity={0.5} />

      <group position={[-4, -9, 0]}>
        {/* Render Board */}
        {board.map((row, y) =>
          row.map((color, x) =>
            color ? (
              <mesh key={`${x}-${y}`} position={[x, y, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial color={color} />
              </mesh>
            ) : null
          )
        )}

        {/* Render Active Piece */}
        {activePiece && (
          <PieceRenderer type={activePiece.type} position={[activePiece.pos.x, activePiece.pos.y, 0]} color={activePiece.tetromino.color} />
        )}
      </group>
    </>
  );
};

export default GameScene;