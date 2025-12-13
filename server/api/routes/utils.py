from fastapi.routing import APIRouter

router = APIRouter(prefix="/utils", tags=["utils"])

@router.get("/health")
def health_check():
    return {"status": "ok"}