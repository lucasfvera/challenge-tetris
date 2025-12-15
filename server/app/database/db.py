import os

from sqlmodel import Session, SQLModel, create_engine
from server.app.models import GameState
from fastapi import Depends
from typing import Annotated

# We should move the default database URL to an environment variable and load it
# only if we are running outside of docker
postgres_url = "postgresql+psycopg2://postgres:postgres@127.0.0.1:5433/postgres"
DATABASE_URL = os.getenv("DATABASE_URL", postgres_url)
engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]