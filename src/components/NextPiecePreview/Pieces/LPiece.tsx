import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock } from "./BaseBlock";

interface LPieceProps {
    rotationIndex?: number;
}

export const LPiece = ({ rotationIndex = 0 }: LPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.L].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.L].color;

    return (
        <div style={{ display: "inline-block" }}>
            {shape.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex", height: "20px" }}>
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
