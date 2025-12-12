import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useTetris } from "../hooks/useTetris";
import { PieceRenderer } from "./PieceRenderer";
import type { Controls } from "../utils/controlsMap";
import { handleMoveLeft, handleMoveRight } from "../helpers/controlsBindings";
import { canMoveLeft, canMoveRight } from "../helpers/constraints";
import { useGameStateStore } from "../store/store";
import { BASE_SPEED, MOVE_DELAY, SOFT_DROP_SPEED } from "../settings/gameSettings";
import { BaseBlock } from "./models/pieces/BaseBlock";

const GameScene = ({ camera }: { camera: 'orto' | 'pers' }) => {
  const { board, tick, piecePosition, rotate: rotatePiece } = useTetris();
  const { clock } = useThree();
  const timeRef = useRef(0);
  const pieceRef = useRef<THREE.Group>(null!);
  const lastMoveTime = useRef(0);
  const [sub, get] = useKeyboardControls<Controls>()
  const isGamePaused = useGameStateStore((state) => (state.isGamePaused));
  const togglePause = useGameStateStore((state) => (state.togglePause));
  const level = useGameStateStore((state) => (state.level));
  const isGameOver = useGameStateStore((state) => (state.isGameOver));
  const activePiece = useGameStateStore((state) => (state.activePiece));

  const { bounds, shape } = activePiece.tetromino.rotations[activePiece.rotationIndex]

  useEffect(() => {

    // Check if we restarted the game and start the clock if so
    if (!clock.running && !isGamePaused && !isGameOver) {
      clock.start();
    }

    return sub(
      (state) => { return { rotate: state.rotate, pause: state.pause } },
      (pressed) => {
        if (pressed.rotate && !isGamePaused && !isGameOver) rotatePiece();
        if (pressed.pause && !isGameOver) {
          if (clock.running) {
            clock.stop()
            togglePause();
          } else {
            clock.start()
            togglePause();
          }
          lastMoveTime.current = 0;
        };
      }
    )
  }, [rotatePiece, isGamePaused, isGameOver, clock])

  // Stop clock when game is over
  useEffect(() => {
    if (isGameOver && clock.running) {
      clock.stop();
    }
  }, [isGameOver, clock]);

  useFrame((_, delta) => {
    if (isGameOver) return; // Prevent any game updates when game is over

    const { moveLeft, moveRight, softDrop } = get()
    const currentTime = clock.getElapsedTime() * 1000;

    // Game Loop Tick
    const speed = softDrop ? SOFT_DROP_SPEED : BASE_SPEED * level;
    timeRef.current += delta * speed;

    if (timeRef.current > 1000) {
      tick();
      timeRef.current -= 1000;
    }

    // Imperative Update of Piece Position
    if (pieceRef.current) {
      pieceRef.current.position.set(piecePosition.current.x, piecePosition.current.y, 0);
    }

    if (currentTime - lastMoveTime.current > MOVE_DELAY && !isGamePaused) {
      if (moveRight && canMoveRight(piecePosition, bounds, shape, board)) {
        handleMoveRight(piecePosition);
        lastMoveTime.current = currentTime;
      }
      if (moveLeft && canMoveLeft(piecePosition, bounds, shape, board)) {
        handleMoveLeft(piecePosition);
        lastMoveTime.current = currentTime;
      }
    }

  });

  return (
    <>
      {/* <gridHelper args={[20, 20]} position={[0.5, 0.5, 0]} rotation-x={Math.PI / 2} /> */}
      {camera === 'orto' && <OrthographicCamera makeDefault zoom={33} position={[0.5, 0.5, 100]} />}
      {camera === 'pers' && <PerspectiveCamera makeDefault aspect={400 / 800} fov={75} near={0.1} far={500} zoom={6} position={[-10, 45, 100]} />}
      <ambientLight intensity={1} />
      <directionalLight position={[0.5, 50, 100]} />
      <OrbitControls enabled={false} />

      <group position={[-5, -9, 0]}>
        {Array(20).fill("t").map((_, index) =>
          <BaseBlock key={`-1-${index}`} position={[-1, index, 0]} color={"whitesmoke"} />
        )}
        {Array(20).fill("t").map((_, index) =>
          <BaseBlock key={`10-${index}`} position={[10, index, 0]} color={"whitesmoke"} />
        )}
        {Array(12).fill("t").map((_, index) =>
          <BaseBlock key={`${index}-20`} position={[index - 1, -1, 0]} color={"whitesmoke"} />
        )}
        {/* Render Board */}
        {board.map((row, y) =>
          row.map((color, x) =>
            color ? (
              <BaseBlock key={`${x}-${y}`} position={[x, y, 0]} color={color} />
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