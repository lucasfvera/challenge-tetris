from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.GameState import GameState
from .settings.cors_origins import cors_origins

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.put("/user/game-state")
async def game_state(state: GameState):
    return {"state": state}
