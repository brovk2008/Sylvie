import math
from typing import List, Dict, Tuple, Any

def hex_to_rgb(hex_str: str) -> Tuple[int, int, int]:
    hex_clean = hex_str.lstrip('#')
    if len(hex_clean) == 3:
        hex_clean = ''.join([c*2 for c in hex_clean])
    if len(hex_clean) != 6:
        return (30, 30, 30)
    return tuple(int(hex_clean[i:i+2], 16) for i in (0, 2, 4)) # type: ignore

def rgb_to_hsl(r: int, g: int, b: int) -> Dict[str, float]:
    r_norm, g_norm, b_norm = r / 255.0, g / 255.0, b / 255.0
    c_max = max(r_norm, g_norm, b_norm)
    c_min = min(r_norm, g_norm, b_norm)
    delta = c_max - c_min

    # Lightness
    l = (c_max + c_min) / 2.0

    # Saturation
    if delta == 0:
        s = 0.0
        h = 0.0
    else:
        s = delta / (1.0 - abs(2.0 * l - 1.0))
        # Hue
        if c_max == r_norm:
            h = 60.0 * (((g_norm - b_norm) / delta) % 6)
        elif c_max == g_norm:
            h = 60.0 * (((b_norm - r_norm) / delta) + 2)
        else:
            h = 60.0 * (((r_norm - g_norm) / delta) + 4)

    return {
        "h": round(h if h >= 0 else h + 360.0, 1),
        "s": round(s * 100.0, 1),
        "l": round(l * 100.0, 1)
    }

def hsl_to_hex(h: float, s: float, l: float) -> str:
    s_norm = s / 100.0
    l_norm = l / 100.0
    c = (1.0 - abs(2.0 * l_norm - 1.0)) * s_norm
    x = c * (1.0 - abs(((h / 60.0) % 2) - 1.0))
    m = l_norm - c / 2.0

    if 0 <= h < 60:
        r_p, g_p, b_p = c, x, 0
    elif 60 <= h < 120:
        r_p, g_p, b_p = x, c, 0
    elif 120 <= h < 180:
        r_p, g_p, b_p = 0, c, x
    elif 180 <= h < 240:
        r_p, g_p, b_p = 0, x, c
    elif 240 <= h < 300:
        r_p, g_p, b_p = x, 0, c
    else:
        r_p, g_p, b_p = c, 0, x

    r = int(round((r_p + m) * 255))
    g = int(round((g_p + m) * 255))
    b = int(round((b_p + m) * 255))
    return f"#{r:02x}{g:02x}{b:02x}".upper()

def get_color_temperature(h: float, s: float, l: float) -> str:
    if s < 15 or l < 15 or l > 88:
        return "neutral"
    # Warm hues: 0-60 (Reds, Oranges, Yellows) and 330-360 (Warm Pinks)
    # Cool hues: 150-280 (Greens, Blues, Purples)
    if (h <= 70 or h >= 320):
        return "warm"
    elif 140 <= h <= 280:
        return "cool"
    return "neutral"

def evaluate_outfit_harmony(hex_colors: List[str]) -> Dict[str, Any]:
    if not hex_colors:
        return {
            "harmony_type": "neutral_accent",
            "score": 85.0,
            "dominant_ratio": {"primary_hex": "#1C0A08", "pct": 100},
            "description": "Clean minimalist balance"
        }

    hsl_list = []
    for hx in hex_colors:
        rgb = hex_to_rgb(hx)
        hsl_list.append(rgb_to_hsl(rgb[0], rgb[1], rgb[2]))

    # Filter out pure neutrals (black, white, grey) when assessing chromatic harmony
    chromatic = [c for c in hsl_list if c["s"] > 15 and 15 < c["l"] < 88]

    if len(chromatic) <= 1:
        primary = hex_colors[0]
        secondary = hex_colors[1] if len(hex_colors) > 1 else None
        return {
            "harmony_type": "neutral_accent",
            "score": 92.0,
            "dominant_ratio": {"primary_hex": primary, "pct": 65},
            "secondary_ratio": {"secondary_hex": secondary or "#FDF5E6", "pct": 35},
            "description": "Timeless neutral foundation with sleek tonal contrast."
        }

    # Check hue differences between the chromatic elements
    hues = [c["h"] for c in chromatic]
    diffs = []
    for i in range(len(hues)):
        for j in range(i + 1, len(hues)):
            d = abs(hues[i] - hues[j])
            diffs.append(min(d, 360 - d))

    avg_diff = sum(diffs) / len(diffs) if diffs else 0

    # Analogous: within 45 degrees
    if all(d <= 50 for d in diffs):
        score = 95.0
        harmony = "analogous"
        desc = "Smooth analogous color flow offering sophisticated visual continuity."
    # Complementary: near 180 degrees (150 - 210)
    elif any(145 <= d <= 215 for d in diffs):
        score = 91.0
        harmony = "complementary"
        desc = "High-impact complementary contrast adhering to the 60-30-10 visual rule."
    # Monochromatic: all hues within 25 degrees with varying lightness
    elif all(d <= 25 for d in diffs):
        score = 96.0
        harmony = "monochromatic"
        desc = "Sleek monochromatic layering with rich textural depth."
    # Triadic: near 120 degrees
    elif any(100 <= d <= 140 for d in diffs):
        score = 88.0
        harmony = "triadic"
        desc = "Dynamic triadic color balance with vibrant energy."
    else:
        score = 82.0
        harmony = "neutral_accent"
        desc = "Balanced aesthetic using structured color blocking."

    return {
        "harmony_type": harmony,
        "score": score,
        "dominant_ratio": {"primary_hex": hex_colors[0], "pct": 60},
        "secondary_ratio": {"secondary_hex": hex_colors[1] if len(hex_colors) > 1 else "#1C0A08", "pct": 30},
        "accent_ratio": {"accent_hex": hex_colors[2] if len(hex_colors) > 2 else "#C9A826", "pct": 10},
        "description": desc
    }
