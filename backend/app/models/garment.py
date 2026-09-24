from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field

class GarmentAttributesModel(BaseModel):
    garment_class: str
    category: str
    subcategory: Optional[str] = None
    custom_name: Optional[str] = None
    brand: Optional[str] = None

    # Physical
    fit: str = "regular"
    length_torso: Optional[str] = None
    sleeve: Optional[str] = None
    neckline: Optional[str] = None
    closure: Optional[str] = None
    has_pockets: Optional[bool] = True
    waist_rise: Optional[str] = None
    silhouette: Optional[str] = None

    # Visual
    dominant_color_hex: str = "#1A1A1A"
    dominant_color_name: str = "Charcoal"
    dominant_hsl: Dict[str, float] = Field(default_factory=lambda: {"h": 0, "s": 0, "l": 10})
    secondary_color_hex: Optional[str] = None
    accent_color_hex: Optional[str] = None
    color_temperature: str = "neutral"
    pattern: str = "solid"
    pattern_scale: Optional[str] = None
    texture: str = "smooth"
    finish: Optional[str] = "matte"

    # Material
    primary_fiber: str = "cotton"
    weight: Optional[str] = "medium"
    stretch: Optional[str] = "low"
    opacity: Optional[str] = "opaque"
    water_resistant: bool = False

    # Semantic
    formality_score: float = 4.0
    aesthetic_weights: Dict[str, float] = Field(default_factory=dict)
    occasions: List[str] = Field(default_factory=list)
    seasons: List[str] = Field(default_factory=lambda: ["all"])
    weather_temp_range_c: List[int] = Field(default_factory=lambda: [15, 30])
    cultural_style: Optional[str] = "western"
    layering_role: str = "standalone"
    outfit_role: str = "foundation"
    clo_value: float = 0.15

    # AI Metadata
    ai_confidence: Dict[str, float] = Field(default_factory=dict)

class GarmentAnalysisRequest(BaseModel):
    image_base64: str
    garment_class_hint: Optional[str] = None
    filename: Optional[str] = None

class GarmentAnalysisTaskResponse(BaseModel):
    task_id: str
    status: str
    estimated_seconds: int
    result: Optional[GarmentAttributesModel] = None
    confidence_flags: List[Dict[str, str]] = Field(default_factory=list)
