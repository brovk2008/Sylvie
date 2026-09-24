from fastapi import APIRouter, Query
from ..models.weather import WeatherResponse
from ..services.weather_service import get_live_weather

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("", response_model=WeatherResponse)
async def fetch_weather(
    lat: float = Query(28.6139, description="Latitude"),
    lon: float = Query(77.2090, description="Longitude"),
    city: str = Query("Delhi NCR", description="City name")
):
    return await get_live_weather(lat=lat, lon=lon, city=city)
