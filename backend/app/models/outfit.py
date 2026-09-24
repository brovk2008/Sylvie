from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from .garment import GarmentAttributesModel
from .weather import WeatherResponse

class ColorHarmonyResultModel(BaseModel):
    harmony_type: str # 'analogous', 'complementary', 'monochromatic', 'triadic', 'neutral_accent'
    score: float # 0 - 100
    dominant_ratio: Dict[str, Any]
    secondary_ratio: Optional[Dict[str, Any]] = None
    accent_ratio: Optional[Dict[str, Any]] = None
    description: str

class GarmentRef(BaseModel):
    id: str
    garment_class: str
    category: str
    dominant_color_hex: str
    dominant_color_name: Optional[str] = None
    clo_value: float = 0.15
    formality_score: float = 4.0
    layering_role: str = "standalone"
    custom_name: Optional[str] = None
    photo_front: Optional[str] = None
    photo_thumb: Optional[str] = None

class OutfitLayerModel(BaseModel):
    layer_type: str
    garment: GarmentRef

class GeneratedOutfitModel(BaseModel):
    id: Optional[str] = None
    layers: List[OutfitLayerModel]
    styling_notes: str
    total_clo: float
    color_harmony: ColorHarmonyResultModel
    formality_score: float
    confidence: float = 0.92
    occasion: str
    weather_summary: Optional[str] = None

class OutfitGenerationContext(BaseModel):
    occasion: str = "College"
    query: Optional[str] = "college tomorrow"
    weather: Optional[WeatherResponse] = None
    available_garments: List[GarmentRef] = Field(default_factory=list)

class OutfitGenerationRequest(BaseModel):
    user_id: str
    context: OutfitGenerationContext

class CompatibilityCheckRequest(BaseModel):
    garments: List[GarmentRef]

class CompatibilityCheckResponse(BaseModel):
    score: float # 0 - 100
    color_score: float
    style_score: float
    formality_score: float
    clo_score: float
    issues: List[str] = Field(default_factory=list)
    suggestions: List[str] = Field(default_factory=list)
