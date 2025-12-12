import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock, BLOCK_SIZE } from "./BaseBlock";

interface ZPieceProps {
    rotationIndex?: number;
}

export const ZPiece = ({ rotationIndex = 0 }: ZPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.Z].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.Z].color;

    return (
        <div style={{ display: "inline-block" }}>
            {shape.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", height: BLOCK_SIZE }}>
                    {row.map((cell, colIndex) => (
                        <BaseBlock
                            key={`${rowIndex}-${colIndex}`}
                            color={color}
                            filled={!!cell}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
