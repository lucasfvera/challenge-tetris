import React from "react";
import { Group } from "three";
import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";

interface ZPieceProps {
  position?: [number, number, number];
  color?: string;
  rotationIndex: number;
}

const ZPiece = ({ position = [0, 0, 0], color = "red", rotationIndex }: ZPieceProps) => {
  const ref = React.useRef<Group>(null!);
  const shape = TETROMINOES[pieceTypeMap.Z].rotations[rotationIndex].shape;

  return (
    <group ref={ref} position={position}>
      {shape.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          cell ? (
            <mesh key={`${rowIndex}-${colIndex}`} position={[colIndex, shape.length - 1 - rowIndex, 0]}>
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ) : null
        )
      )}
    </group>
  );
};

export default ZPiece;
