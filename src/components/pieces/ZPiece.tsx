import React from "react";
import { Group } from "three";

interface ZPieceProps {
  position?: [number, number, number];
  color?: string;
}

const ZPiece = ({ position = [0, 0, 0], color = "red" }: ZPieceProps) => {
  const ref = React.useRef<Group>(null!);

  // 'Z' tetromino shape
  const blockPositions: [number, number, number][] = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
  ];

  return (
    <group ref={ref} position={position}>
      {blockPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export default ZPiece;
