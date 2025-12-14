import uuid
from sqlmodel import SQLModel, Field
from sqlalchemy import JSON, Column


class BaseGameState(SQLModel):
    """Base game state model for database."""
    # Game metrics
    score: int
    level: int
    next_piece_type: str
    # Flattened active piece data
    # Instead of storing the entire ActivePiece object, we store just the
    # essential data needed to reconstruct it from code constants
    active_piece_type: str  # e.g., "T", "L", "I", "O", "S", "Z", "J"
    active_piece_x: int
    active_piece_y: int
    active_piece_rotation: int
    # Board data (complex, variable size -> JSON)
    board: list[list[str | None]] = Field(sa_column=Column(JSON))


class UpsertGameState(BaseGameState):
    """Upsert game state model for database."""
    id: uuid.UUID | None = None


class GameState(BaseGameState, table=True):
    """
    Game state stored in the database.
    
    Active piece data is flattened into individual columns for efficiency.
    Board data is stored as JSON since it's complex and variable.
    Static Tetromino shape definitions are NOT stored in the database.
    """
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)

