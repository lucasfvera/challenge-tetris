import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock, BLOCK_SIZE } from "./BaseBlock";

interface OPieceProps {
    rotationIndex?: number;
}

export const OPiece = ({ rotationIndex = 0 }: OPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.O].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.O].color;

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
