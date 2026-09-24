from typing import Optional
from pydantic import BaseModel

class WeatherResponse(BaseModel):
    city: Optional[str] = "Delhi NCR"
    temp_c: float
    feels_like_c: float
    humidity_pct: int
    wind_kmh: float
    rain_probability: int
    description: str
    recommended_clo: float
    summary: str
