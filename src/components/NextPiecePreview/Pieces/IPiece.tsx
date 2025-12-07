import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock } from "./BaseBlock";

interface IPieceProps {
    rotationIndex?: number;
}

export const IPiece = ({ rotationIndex = 0 }: IPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.I].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.I].color;

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
