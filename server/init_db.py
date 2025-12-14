from sqlmodel import SQLModel
from server.database.db import engine
from server.models.GameState import GameState

def init_db():
    # 1. Create Tables
    SQLModel.metadata.create_all(engine)
    
    
    print("✅ Database initialized!")

if __name__ == "__main__":
    init_db()