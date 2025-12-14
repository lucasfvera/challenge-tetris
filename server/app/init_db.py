from sqlmodel import SQLModel
from server.app.database.db import engine
from server.app.models.GameState import GameState

def init_db():
    # 1. Create Tables
    SQLModel.metadata.create_all(engine)
    
    
    print("✅ Database initialized!")

if __name__ == "__main__":
    init_db()