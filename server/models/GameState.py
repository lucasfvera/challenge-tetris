from pydantic import BaseModel


class Position(BaseModel):
    x: int
    y: int



class TetrominoBounds(BaseModel):
    minCol: int
    maxCol: int
    bottomRow: int


class TetrominoState(BaseModel):
    shape: list[list[int]]
    bounds: TetrominoBounds


class Tetromino(BaseModel):
    rotations: list[TetrominoState]
    color: str



class ActivePiece(BaseModel):
    pos: Position
    tetromino: Tetromino
    type: str
    rotationIndex: int
    collided: bool


class GameState(BaseModel):
    activePiece: ActivePiece
    board: list[list[str | None]]
    level: int
    nextPieceType: str
    score: int