import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock } from "./BaseBlock";

interface TPieceProps {
    rotationIndex?: number;
}

export const TPiece = ({ rotationIndex = 0 }: TPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.T].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.T].color;

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
