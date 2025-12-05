import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useTetris } from "../hooks/useTetris";
import { PieceRenderer } from "./pieces/PieceRenderer";
import type { Controls } from "../utils/controlsMap";
import { handleMoveLeft, handleMoveRight } from "../helpers/controlsBindings";
import { canMoveLeft, canMoveRight } from "../helpers/constraints";

const GameScene = () => {
  const { board, activePiece, tick, piecePosition, rotate: rotatePiece } = useTetris();
  const { clock } = useThree();
  const timeRef = useRef(0);
  const pieceRef = useRef<THREE.Group>(null!);
  const [sub, get] = useKeyboardControls<Controls>()
  const { bounds, shape } = activePiece.tetromino.rotations[activePiece.rotationIndex]

  useEffect(() => {
    return sub(
      (state) => state,
      (pressed) => {
        if (pressed.rotate) rotatePiece();
        if (pressed.pause) {
          clock.running ? clock.stop() : clock.start()
          lastMoveTime.current = 0;
        };
      }
    )
  }, [rotatePiece])

  const lastMoveTime = useRef(0);
  const MOVE_DELAY = 100; //ms

  useFrame((_, delta) => {
    const { moveLeft, moveRight, softDrop } = get()
    const currentTime = clock.getElapsedTime() * 1000;

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

    if (currentTime - lastMoveTime.current > MOVE_DELAY && clock.running) {
      if (moveRight && canMoveRight(piecePosition, bounds, shape, board)) {
        handleMoveRight(piecePosition);
        lastMoveTime.current = currentTime;
      }
      if (moveLeft && canMoveLeft(piecePosition, bounds, shape, board)) {
        handleMoveLeft(piecePosition);
        lastMoveTime.current = currentTime;
      }
    }

    if (softDrop) {
      timeRef.current += delta * 10000;
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
          <group ref={pieceRef}>
            <PieceRenderer type={activePiece.type} position={[0, 0, 0]} color={activePiece.tetromino.color} rotationIndex={activePiece.rotationIndex} />
          </group>
        )}
      </group>
    </>
  );
};

export default GameScene;