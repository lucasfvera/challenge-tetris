from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.app.settings.cors_origins import cors_origins
from server.app.api import main

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# We could add a prefix to version the API like /v1
app.include_router(main.api_router)