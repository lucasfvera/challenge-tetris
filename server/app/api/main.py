from fastapi import APIRouter

from server.app.api.routes import utils, user

api_router = APIRouter()
api_router.include_router(utils.router)
api_router.include_router(user.router)