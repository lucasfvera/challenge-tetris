export type TetrominoShape = number[][];
export type TetrominoColor = string;

export interface Tetromino {
    shape: TetrominoShape;
    color: TetrominoColor;
}

export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export const pieceTypeMap = {
    I: "I",
    J: "J",
    L: "L",
    O: "O",
    S: "S",
    T: "T",
    Z: "Z",
} as const;

export const TETROMINOES: Record<PieceType, Tetromino> = {
    [pieceTypeMap.I]: {
        shape: [[1, 1, 1, 1]],
        color: "cyan",
    },
    [pieceTypeMap.J]: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
        ],
        color: "blue",
    },
    [pieceTypeMap.L]: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
        ],
        color: "orange",
    },
    [pieceTypeMap.O]: {
        shape: [
            [1, 1],
            [1, 1],
        ],
        color: "yellow",
    },
    [pieceTypeMap.S]: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        color: "green",
    },
    [pieceTypeMap.T]: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        color: "mediumpurple",
    },
    [pieceTypeMap.Z]: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        color: "red",
    },
} as const;

export const randomTetromino = () => {
    // The pieceType assertion is safe because the object was defined with the type and the keys are extracted from it
    const keys = Object.keys(TETROMINOES) as PieceType[];
    const randKey = keys[Math.floor(Math.random() * keys.length)];
    return { type: randKey, tetromino: TETROMINOES[randKey] };
};
