import React from "react";
import { Group } from "three";

interface IPieceProps {
  position?: [number, number, number];
  color?: string;
}

const IPiece = ({ position = [0, 0, 0], color = "cyan" }: IPieceProps) => {
  const ref = React.useRef<Group>(null!);

  // 'I' tetromino shape
  const blockPositions: [number, number, number][] = [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
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

export default IPiece;
