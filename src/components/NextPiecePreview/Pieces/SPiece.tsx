import { TETROMINOES, pieceTypeMap } from "../../../utils/tetrominoes";
import { BaseBlock, BLOCK_SIZE } from "./BaseBlock";

interface SPieceProps {
    rotationIndex?: number;
}

export const SPiece = ({ rotationIndex = 0 }: SPieceProps) => {
    const shape = TETROMINOES[pieceTypeMap.S].rotations[rotationIndex].shape;
    const color = TETROMINOES[pieceTypeMap.S].color;

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
