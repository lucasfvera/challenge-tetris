import React from "react";
import { Group } from "three";
import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock } from "./BaseBlock";

interface LPieceProps {
  position?: [number, number, number];
  color?: string;
  rotationIndex: number;
}

const LPiece = ({ position = [0, 0, 0], color = "orange", rotationIndex }: LPieceProps) => {
  const ref = React.useRef<Group>(null!);
  const shape = TETROMINOES[pieceTypeMap.L].rotations[rotationIndex].shape;

  return (
    <group ref={ref} position={position}>
      {shape.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          cell ? (
            <BaseBlock
              key={`${rowIndex}-${colIndex}`}
              position={[colIndex, shape.length - 1 - rowIndex, 0]}
              color={color}
            />
          ) : null
        )
      )}
    </group>
  );
};

export default LPiece;
