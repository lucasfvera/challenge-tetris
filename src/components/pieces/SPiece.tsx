import React from "react";
import { Group } from "three";

interface SPieceProps {
  position?: [number, number, number];
  color?: string;
}

const SPiece: React.FC<SPieceProps> = ({ position = [0, 0, 0], color = "green" }) => {
  const ref = React.useRef<Group>(null!);

  // 'S' tetromino shape
  const blockPositions: [number, number, number][] = [
    [1, 1, 0],
    [2, 1, 0],
    [0, 0, 0],
    [1, 0, 0],
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

export default SPiece;
