from fastapi.exceptions import HTTPException
from fastapi import APIRouter, Query
from sqlmodel import select
from server.app.models.GameState import BaseGameState, GameState, UpsertGameState
from server.app.database.db import SessionDep
from server.app.settings.game_settings import MAX_SAVE_SLOTS, SLOT_RANGE
from pydantic import BaseModel

router = APIRouter(prefix="/user", tags=["user"])


class SaveSlotInfo(BaseModel):
    """Summary info for a save slot."""
    slot_number: int
    is_empty: bool
    score: int | None = None
    level: int | None = None


@router.put("/game-state", response_model=GameState)
async def save_game_state(state: UpsertGameState, session: SessionDep):
    """Save game state to a specific slot. Creates or updates based on (user_id, slot_number)."""
    # Find existing save by user_id and slot_number
    statement = select(GameState).where(
        GameState.user_id == state.user_id,
        GameState.slot_number == state.slot_number
    )
    existing_game = session.exec(statement).first()

    if existing_game:
        # Update existing save
        game_data = state.model_dump(exclude_unset=True)
        existing_game.sqlmodel_update(game_data)
        session.add(existing_game)
        session.commit()
        session.refresh(existing_game)
        return existing_game
    else:
        # Create new save
        db_state = GameState.model_validate(state)
        session.add(db_state)
        session.commit()
        session.refresh(db_state)
        return db_state


@router.get("/game-slots", response_model=list[SaveSlotInfo])
async def get_save_slots(
    session: SessionDep,
    user_id: str = Query(default="default")
):
    """Get summary of all save slots for a user."""
    statement = select(GameState).where(GameState.user_id == user_id)
    saves = session.exec(statement).all()
    
    # Build slot info for all slots
    saves_by_slot = {save.slot_number: save for save in saves}
    slots = []
    for slot_num in SLOT_RANGE:
        if slot_num in saves_by_slot:
            save = saves_by_slot[slot_num]
            slots.append(SaveSlotInfo(
                slot_number=slot_num,
                is_empty=False,
                score=save.score,
                level=save.level
            ))
        else:
            slots.append(SaveSlotInfo(slot_number=slot_num, is_empty=True))
    
    return slots


@router.get("/game-state/{slot_number}", response_model=GameState)
async def get_game_state(
    slot_number: int,
    session: SessionDep,
    user_id: str = Query(default="default")
):
    """Get game state from a specific slot."""
    if slot_number < 1 or slot_number > MAX_SAVE_SLOTS:
        raise HTTPException(status_code=400, detail=f"Slot number must be between 1 and {MAX_SAVE_SLOTS}")
    
    statement = select(GameState).where(
        GameState.user_id == user_id,
        GameState.slot_number == slot_number
    )
    existing_game = session.exec(statement).first()
    
    if not existing_game:
        raise HTTPException(status_code=404, detail="Save slot is empty")
    
    return existing_game


@router.delete("/game-state/{slot_number}")
async def delete_game_state(
    slot_number: int,
    session: SessionDep,
    user_id: str = Query(default="default")
):
    """Delete game state from a specific slot."""
    if slot_number < 1 or slot_number > MAX_SAVE_SLOTS:
        raise HTTPException(status_code=400, detail=f"Slot number must be between 1 and {MAX_SAVE_SLOTS}")
    
    statement = select(GameState).where(
        GameState.user_id == user_id,
        GameState.slot_number == slot_number
    )
    existing_game = session.exec(statement).first()
    
    if not existing_game:
        raise HTTPException(status_code=404, detail="Save slot is empty")
    
    session.delete(existing_game)
    session.commit()
    return {"message": f"Slot {slot_number} deleted successfully"}