import { INITIAL_PIECE_POSITION } from "../settings/gameSettings";

export type TetrominoColor = "cyan" | "blue" | "orange" | "yellow" | "green" | "mediumpurple" | "red";

export interface TetrominoBounds {
    minCol: number;
    maxCol: number;
    bottomRow: number;
}

export interface TetrominoState {
    shape: number[][];
    bounds: TetrominoBounds;
}

export interface Tetromino {
    rotations: TetrominoState[];
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

const getBounds = (shape: number[][]): TetrominoBounds => {
    let minCol = shape[0].length;
    let maxCol = 0;
    let bottomRow = 0;

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
                bottomRow = Math.max(bottomRow, row);
            }
        }
    }
    return { minCol, maxCol, bottomRow };
};

const rotateMatrix = (matrix: number[][]): number[][] => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const newMatrix: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            newMatrix[col][rows - 1 - row] = matrix[row][col];
        }
    }
    return newMatrix;
};

const createTetromino = (baseShape: number[][], color: TetrominoColor): Tetromino => {
    const rotations: TetrominoState[] = [];
    let currentShape = baseShape;

    // We pre-calculate all possible rotations of the piece to avoid calculating it every time
    for (let i = 0; i < 4; i++) {
        rotations.push({
            shape: currentShape,
            bounds: getBounds(currentShape),
        });
        currentShape = rotateMatrix(currentShape);
    }

    return { rotations, color };
};

export const TETROMINOES: Record<PieceType, Tetromino> = {
    [pieceTypeMap.I]: createTetromino([[1, 1, 1, 1]], "cyan"),
    [pieceTypeMap.J]: createTetromino([
        [1, 0, 0],
        [1, 1, 1],
    ], "blue"),
    [pieceTypeMap.L]: createTetromino([
        [0, 0, 1],
        [1, 1, 1],
    ], "orange"),
    [pieceTypeMap.O]: createTetromino([
        [1, 1],
        [1, 1],
    ], "yellow"),
    [pieceTypeMap.S]: createTetromino([
        [0, 1, 1],
        [1, 1, 0],
    ], "green"),
    [pieceTypeMap.T]: createTetromino([
        [0, 1, 0],
        [1, 1, 1],
    ], "mediumpurple"),
    [pieceTypeMap.Z]: createTetromino([
        [1, 1, 0],
        [0, 1, 1],
    ], "red"),
} as const;

export const randomTetromino = () => {
    // The pieceType assertion is safe because the object was defined with the type and the keys are extracted from it
    const keys = Object.keys(TETROMINOES) as PieceType[];
    const randKey = keys[Math.floor(Math.random() * keys.length)];
    return { type: randKey, tetromino: TETROMINOES[randKey] };
};

export const createActivePiece = (type: PieceType) => {
    return {
        pos: INITIAL_PIECE_POSITION,
        tetromino: TETROMINOES[type],
        type,
        rotationIndex: 0,
        collided: false,
    };
}