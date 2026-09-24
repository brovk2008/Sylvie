import uuid
from typing import Dict
from fastapi import APIRouter, HTTPException
from ..models.garment import (
    GarmentAnalysisRequest,
    GarmentAnalysisTaskResponse,
    GarmentAttributesModel
)
from ..services.attribute_extraction import analyze_garment_pipeline

router = APIRouter(prefix="", tags=["Garment"])

# In-memory task cache for async jobs
TASK_STORE: Dict[str, GarmentAnalysisTaskResponse] = {}

@router.post("/analyze-garment", response_model=GarmentAnalysisTaskResponse)
async def analyze_garment(payload: GarmentAnalysisRequest):
    if not payload.image_base64:
        raise HTTPException(status_code=400, detail="image_base64 is required")

    task_id = str(uuid.uuid4())
    try:
        attributes = analyze_garment_pipeline(
            payload.image_base64,
            class_hint=payload.garment_class_hint
        )
        task_response = GarmentAnalysisTaskResponse(
            task_id=task_id,
            status="done",
            estimated_seconds=0,
            result=attributes,
            confidence_flags=[
                {"field": "category", "confidence": "high"},
                {"field": "dominant_color", "confidence": "high"},
                {"field": "fit", "confidence": "high"},
                {"field": "material", "confidence": "medium"},
                {"field": "formality", "confidence": "medium"}
            ]
        )
        TASK_STORE[task_id] = task_response
        return task_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Garment analysis failed: {str(e)}")

@router.get("/task/{task_id}", response_model=GarmentAnalysisTaskResponse)
async def get_task_status(task_id: str):
    if task_id not in TASK_STORE:
        raise HTTPException(status_code=404, detail="Task not found")
    return TASK_STORE[task_id]
