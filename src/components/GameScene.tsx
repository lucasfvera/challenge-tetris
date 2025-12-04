import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useTetris } from "../hooks/useTetris";
import { PieceRenderer } from "./pieces/PieceRenderer";
import type { Controls } from "../utils/controlsMap";
import { handleMoveLeft, handleMoveRight } from "../helpers/controlsBindings";
import { canMoveLeft, canMoveRight } from "../helpers/constraints";

const GameScene = () => {
  const { board, activePiece, tick, piecePosition } = useTetris();
  const timeRef = useRef(0);
  const pieceRef = useRef<THREE.Group>(null!);
  const [_, get] = useKeyboardControls<Controls>()

  useFrame((_, delta) => {
    const { moveLeft, moveRight, rotate, softDrop, hardDrop } = get()

    // Game Loop Tick
    timeRef.current += delta * 1000;
    if (timeRef.current > 200) {
      tick();
      timeRef.current = 0;
    }

    // Imperative Update of Piece Position
    if (pieceRef.current) {
      pieceRef.current.position.set(piecePosition.current.x, piecePosition.current.y, 0);
    }

    if (moveRight && canMoveRight(piecePosition, activePiece.tetromino.rotations[activePiece.rotationIndex].bounds, activePiece.tetromino.rotations[activePiece.rotationIndex].shape, board)) {
      handleMoveRight(piecePosition)
    }
    if (moveLeft && canMoveLeft(piecePosition, activePiece.tetromino.rotations[activePiece.rotationIndex].bounds, activePiece.tetromino.rotations[activePiece.rotationIndex].shape, board)) {
      handleMoveLeft(piecePosition)
    }
    // if (rotate) {
    //   handleRotate(piecePosition)
    // }
    // if (softDrop) {
    //   handleSoftDrop(piecePosition)
    // }
    // if (hardDrop) {
    //   handleHardDrop(piecePosition)
    // }

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
          <group ref={pieceRef}>
            <PieceRenderer type={activePiece.type} position={[0, 0, 0]} color={activePiece.tetromino.color} />
          </group>
        )}
      </group>
    </>
  );
};

export default GameScene;