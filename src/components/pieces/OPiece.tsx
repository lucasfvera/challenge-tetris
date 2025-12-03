import React from "react";
import { Group } from "three";

interface OPieceProps {
  position?: [number, number, number];
  color?: string;
}

const OPiece = ({ position = [0, 0, 0], color = "yellow" }: OPieceProps) => {
  const ref = React.useRef<Group>(null!);

  const blockPositions: [number, number, number][] = [
    [-0.5, 0.5, 0], // Top-left
    [0.5, 0.5, 0],  // Top-right
    [-0.5, -0.5, 0], // Bottom-left
    [0.5, -0.5, 0],  // Bottom-right
  ];

  return (
    <group ref={ref} position={position}>
      {blockPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <planeGeometry args={[1, 1]} /> {/* Changed to planeGeometry */}
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export default OPiece;