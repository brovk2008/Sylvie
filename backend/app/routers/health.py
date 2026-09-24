from fastapi import APIRouter
from ..config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "models_loaded": {
            "cv_segmentation": "ready",
            "attribute_extractor": "ready",
            "color_harmony": "ready",
            "clo_engine": "ready",
            "outfit_reasoner": "ready"
        },
        "gpu_available": False,
        "weather_service": "online"
    }
