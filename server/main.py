from fastapi import FastAPI
from .models.GameState import GameState


app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.put("/user/game-state")
async def game_state(state: GameState):
    return {"state": state}
