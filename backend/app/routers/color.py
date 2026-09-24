from fastapi import APIRouter, HTTPException
from ..models.color import ColorAnalysisRequest, ColorAnalysisResponse, HSLColor
from ..services.color_harmony import hex_to_rgb, rgb_to_hsl, hsl_to_hex, get_color_temperature
from ..services.attribute_extraction import closest_color_name

router = APIRouter(prefix="/color", tags=["Color"])

@router.post("/analyze", response_model=ColorAnalysisResponse)
async def analyze_color(payload: ColorAnalysisRequest):
    hex_code = payload.hex_color or "#E83B2E"
    try:
        rgb = hex_to_rgb(hex_code)
        hsl = rgb_to_hsl(rgb[0], rgb[1], rgb[2])
        temp = get_color_temperature(hsl["h"], hsl["s"], hsl["l"])

        # Generate complementary (180 deg)
        comp_h = (hsl["h"] + 180.0) % 360.0
        comp_hex = hsl_to_hex(comp_h, hsl["s"], hsl["l"])

        # Generate analogous (+30, -30 deg)
        ana1_h = (hsl["h"] + 30.0) % 360.0
        ana2_h = (hsl["h"] - 30.0 + 360.0) % 360.0
        ana_hexes = [hsl_to_hex(ana1_h, hsl["s"], hsl["l"]), hsl_to_hex(ana2_h, hsl["s"], hsl["l"])]

        # Monochromatic variations (lightness +- 20%)
        mono1 = hsl_to_hex(hsl["h"], hsl["s"], max(15.0, hsl["l"] - 25.0))
        mono2 = hsl_to_hex(hsl["h"], hsl["s"], min(90.0, hsl["l"] + 25.0))

        return ColorAnalysisResponse(
            dominant_hex=hex_code.upper(),
            dominant_hsl=HSLColor(h=hsl["h"], s=hsl["s"], l=hsl["l"]),
            dominant_name=closest_color_name(hex_code),
            palette=[hex_code.upper(), comp_hex, ana_hexes[0], ana_hexes[1]],
            temperature=temp,
            complementary_colors=[comp_hex],
            analogous_colors=ana_hexes,
            monochromatic_range=[mono1, hex_code.upper(), mono2]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
