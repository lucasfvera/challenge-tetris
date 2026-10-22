import uuid
from sqlmodel import SQLModel, Field
from sqlalchemy import JSON, Column, UniqueConstraint
from server.app.settings.game_settings import MAX_SAVE_SLOTS


class BaseGameState(SQLModel):
    """Base game state model for database."""
    # Slot identification
    slot_number: int = Field(ge=1, le=MAX_SAVE_SLOTS)
    user_id: str = Field(default="default")  # UUID string to scope saves per browser
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
    pass


class GameState(BaseGameState, table=True):
    """
    Game state stored in the database.
    
    Active piece data is flattened into individual columns for efficiency.
    Board data is stored as JSON since it's complex and variable.
    Static Tetromino shape definitions are NOT stored in the database.
    Each user can have up to 3 save slots.
    """
    __table_args__ = (
        UniqueConstraint("user_id", "slot_number", name="uq_user_slot"),
    )
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)

