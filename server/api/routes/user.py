from fastapi import APIRouter
from server.models.GameState import GameState

router = APIRouter(prefix="/user", tags=["user"])

cache = {}


@router.put("/game-state")
async def game_state(state: GameState):
    cache["state"] = state
    return {"state": state}


@router.get("/game-state")
async def game_state():
    return {"state": cache["state"]}