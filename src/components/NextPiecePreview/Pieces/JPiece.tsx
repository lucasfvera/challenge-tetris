import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock, BLOCK_SIZE } from "./BaseBlock";

interface JPieceProps {
    rotationIndex?: number;
}

export const JPiece = ({ rotationIndex = 0 }: JPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.J].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.J].color;

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
