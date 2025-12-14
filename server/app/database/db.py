from sqlmodel import Session, SQLModel, create_engine
from server.app.models import GameState
from fastapi import Depends
from typing import Annotated


# This should be in an environment variable and a secret manager
postgres_url = "postgresql+psycopg2://postgres:postgres@127.0.0.1:5433/postgres"
engine = create_engine(postgres_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]