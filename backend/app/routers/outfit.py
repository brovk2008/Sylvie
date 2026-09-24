from fastapi import APIRouter, HTTPException
from ..models.outfit import (
    OutfitGenerationRequest,
    GeneratedOutfitModel,
    CompatibilityCheckRequest,
    CompatibilityCheckResponse
)
from ..services.outfit_engine import (
    generate_outfit_from_garments,
    check_outfit_compatibility
)

router = APIRouter(prefix="", tags=["Outfit"])

@router.post("/generate-outfit", response_model=GeneratedOutfitModel)
async def generate_outfit(payload: OutfitGenerationRequest):
    try:
        ctx = payload.context
        target_clo = ctx.weather.recommended_clo if ctx.weather else 0.70
        return generate_outfit_from_garments(
            available_garments=ctx.available_garments,
            occasion=ctx.occasion,
            query=ctx.query or "",
            target_clo=target_clo
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Outfit generation failed: {str(e)}")

@router.post("/check-compatibility", response_model=CompatibilityCheckResponse)
async def check_compatibility(payload: CompatibilityCheckRequest):
    try:
        return check_outfit_compatibility(payload.garments)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compatibility check failed: {str(e)}")
