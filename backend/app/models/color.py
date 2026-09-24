from typing import List, Optional
from pydantic import BaseModel, Field

class HSLColor(BaseModel):
    h: float = Field(..., ge=0, le=360, description="Hue 0-360")
    s: float = Field(..., ge=0, le=100, description="Saturation 0-100")
    l: float = Field(..., ge=0, le=100, description="Lightness 0-100")

class ColorAnalysisRequest(BaseModel):
    image_base64: Optional[str] = None
    hex_color: Optional[str] = None

class ColorAnalysisResponse(BaseModel):
    dominant_hex: str
    dominant_hsl: HSLColor
    dominant_name: str
    palette: List[str]
    temperature: str # 'warm', 'cool', 'neutral'
    complementary_colors: List[str]
    analogous_colors: List[str]
    monochromatic_range: List[str]
