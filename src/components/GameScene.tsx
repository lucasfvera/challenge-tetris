import { OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";


const GameScene = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);

  return (
    <>
      <gridHelper args={[20, 20]} position={[0, 0, 0]} rotation-x={Math.PI / 2} />

      {/* 
        OrthographicCamera configured to frame a 10x20 grid.
        - makeDefault: Sets this as the main camera.
        - zoom: Calibrated to 40. With a 400x800 canvas, this means 1 unit = 40px.
                So, 10 units width = 400px, 20 units height = 800px.
        - position: Places the camera in 3D space, looking towards the origin.
      */}
      <OrthographicCamera makeDefault zoom={40} position={[0, 0, 100]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* A single cube at the center of the scene to test our camera setup */}
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  );
};

export default GameScene;