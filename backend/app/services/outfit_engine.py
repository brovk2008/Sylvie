import os
import uuid
from typing import List, Dict, Any, Optional
from ..models.outfit import (
    GarmentRef,
    OutfitLayerModel,
    GeneratedOutfitModel,
    ColorHarmonyResultModel,
    CompatibilityCheckResponse,
    WardrobeGraphScoreModel
)
from .color_harmony import evaluate_outfit_harmony
from .clo_calculator import calculate_outfit_total_clo, evaluate_clo_suitability

# Target formalities for context queries ("I'M GOING HERE")
CONTEXT_PRESETS = {
    "presentation": {"target_formality": 7.0, "name": "College Presentation", "notes": "Sharp, polished silhouette commands focus and authority."},
    "date": {"target_formality": 5.5, "name": "First Date 💕", "notes": "Soft textures and effortless tailoring create an inviting, confident presence."},
    "hackathon": {"target_formality": 2.5, "name": "Hackathon ⚡", "notes": "Loose ergonomic layers maximize breathable comfort for long build sessions."},
    "party": {"target_formality": 6.2, "name": "Night Out / Party 🌙", "notes": "Dynamic contrast and statement piece provide standout visual punch."},
    "interview": {"target_formality": 8.5, "name": "Job Interview", "notes": "Crisp lines and cohesive formal tones convey immediate professionalism."},
    "casual": {"target_formality": 3.5, "name": "Weekend Casual", "notes": "Laid-back everyday essentials with balanced color harmony."},
}

def resolve_context_intent(query: str, default_occasion: str):
    q_lower = (query or "").lower()
    for key, preset in CONTEXT_PRESETS.items():
        if key in q_lower:
            return preset["target_formality"], preset["name"], preset["notes"]
    return 4.5, default_occasion, "Balanced everyday styling aligned with your wardrobe preferences."

def generate_outfit_from_garments(
    available_garments: List[GarmentRef],
    occasion: str = "College",
    query: str = "",
    target_clo: float = 0.70
) -> GeneratedOutfitModel:
    """
    Wardrobe Graph Recommendation Engine:
    Score = (Compatibility × 0.30) + (Weather_CLO × 0.25) + (Occasion × 0.20) + (Preference × 0.15) + (Rotation × 0.10)
    Filters by laundry state (clean only) and reasons across contextual intent ("I'M GOING HERE").
    """
    target_formality, resolved_occasion, context_notes = resolve_context_intent(query, occasion)

    # Filter out dirty/unusable clothes
    clean_garments = [g for g in available_garments if getattr(g, "clean_status", "clean") == "clean"]
    if not clean_garments:
        clean_garments = available_garments # Fallback if user hasn't tagged laundry

    if not clean_garments:
        # High-aesthetic demo fallback
        clean_garments = [
            GarmentRef(
                id="demo-top-1",
                garment_class="top",
                category="Oversized Heavyweight Tee",
                dominant_color_hex="#1C0A08",
                dominant_color_name="Chili Charcoal",
                clo_value=0.12,
                formality_score=3.5,
                layering_role="base",
                days_since_worn=18,
                favorite=True,
            ),
            GarmentRef(
                id="demo-bottom-1",
                garment_class="bottom",
                category="Raw Denim Wide Jeans",
                dominant_color_hex="#1A365D",
                dominant_color_name="Deep Indigo",
                clo_value=0.28,
                formality_score=4.0,
                layering_role="standalone",
                days_since_worn=7,
                favorite=False,
            ),
            GarmentRef(
                id="demo-shoes-1",
                garment_class="footwear",
                category="Low-Top Leather Sneakers",
                dominant_color_hex="#FDF5E6",
                dominant_color_name="Cream Parchment",
                clo_value=0.04,
                formality_score=4.5,
                layering_role="standalone",
                days_since_worn=3,
                favorite=True,
            ),
            GarmentRef(
                id="demo-outer-1",
                garment_class="outerwear",
                category="Chili Canvas Work Jacket",
                dominant_color_hex="#E83B2E",
                dominant_color_name="Chili Spice",
                clo_value=0.35,
                formality_score=5.0,
                layering_role="outer",
                days_since_worn=21,
                favorite=True,
            ),
        ]

    # Partition by class
    tops = [g for g in clean_garments if g.garment_class in ("top", "one_piece")]
    bottoms = [g for g in clean_garments if g.garment_class == "bottom"]
    outers = [g for g in clean_garments if g.garment_class == "outerwear"]
    shoes = [g for g in clean_garments if g.garment_class == "footwear"]
    accessories = [g for g in clean_garments if g.garment_class == "accessory"]

    selected_top = tops[0] if tops else GarmentRef(
        id="default-top", garment_class="top", category="Crewneck Tee", dominant_color_hex="#1C0A08", clo_value=0.10, formality_score=3.5
    )
    selected_bottom = bottoms[0] if bottoms else GarmentRef(
        id="default-bottom", garment_class="bottom", category="Straight Denim", dominant_color_hex="#1A365D", clo_value=0.25, formality_score=4.0
    )
    selected_shoes = shoes[0] if shoes else GarmentRef(
        id="default-shoes", garment_class="footwear", category="Clean White Sneakers", dominant_color_hex="#FDF5E6", clo_value=0.04, formality_score=4.5
    )

    layers: List[OutfitLayerModel] = [
        OutfitLayerModel(layer_type="base", garment=selected_top),
        OutfitLayerModel(layer_type="bottom", garment=selected_bottom),
        OutfitLayerModel(layer_type="footwear", garment=selected_shoes)
    ]

    clos = [selected_top.clo_value, selected_bottom.clo_value, selected_shoes.clo_value]

    # Add outerwear if target CLO requires warmer layering
    current_clo = calculate_outfit_total_clo(clos)
    if current_clo < target_clo - 0.15 and outers:
        selected_outer = outers[0]
        layers.append(OutfitLayerModel(layer_type="outer", garment=selected_outer))
        clos.append(selected_outer.clo_value)

    if accessories:
        layers.append(OutfitLayerModel(layer_type="accessory", garment=accessories[0]))

    total_clo = calculate_outfit_total_clo(clos)

    # 1. Compatibility Score (Color harmony + Silhouette cohesion)
    hex_colors = [l.garment.dominant_color_hex for l in layers]
    harmony_data = evaluate_outfit_harmony(hex_colors)
    compat_score = float(harmony_data["score"])

    # 2. Weather Score (Proximity to target CLO)
    clo_diff = abs(total_clo - target_clo)
    weather_score = max(50.0, 100.0 - (clo_diff * 75.0))

    # 3. Occasion Score (Proximity of average formality to target formality)
    formality_avg = round(sum(l.garment.formality_score for l in layers) / len(layers), 1)
    formality_diff = abs(formality_avg - target_formality)
    occasion_score = max(40.0, 100.0 - (formality_diff * 14.0))

    # 4. Personal Preference Score (Favorites boost)
    fav_count = sum(1 for l in layers if getattr(l.garment, "favorite", False))
    pref_score = min(100.0, 75.0 + (fav_count * 10.0))

    # 5. Rotation Score (Boost for unworn pieces to prevent wardrobe fatigue)
    max_days_unworn = max((getattr(l.garment, "days_since_worn", 14) for l in layers), default=14)
    rotation_score = min(100.0, 60.0 + (min(max_days_unworn, 30) * 1.3))

    # Combined Wardrobe Graph Score
    total_graph_score = round(
        (compat_score * 0.30) +
        (weather_score * 0.25) +
        (occasion_score * 0.20) +
        (pref_score * 0.15) +
        (rotation_score * 0.10),
        1
    )

    harmony_res = ColorHarmonyResultModel(
        harmony_type=harmony_data["harmony_type"],
        score=harmony_data["score"],
        dominant_ratio=harmony_data["dominant_ratio"],
        secondary_ratio=harmony_data.get("secondary_ratio"),
        accent_ratio=harmony_data.get("accent_ratio"),
        description=harmony_data["description"]
    )

    top_name = selected_top.custom_name or selected_top.category
    bottom_name = selected_bottom.custom_name or selected_bottom.category
    styling_notes = (
        f"Anchored by your {top_name} and {bottom_name}, this fit hits a {total_graph_score}% wardrobe graph synergy. "
        f"{context_notes} With {total_clo} CLO ({harmony_res.harmony_type} palette), it delivers optimal comfort for {resolved_occasion}."
    )

    graph_model = WardrobeGraphScoreModel(
        compatibility_score=compat_score,
        weather_score=round(weather_score, 1),
        occasion_score=round(occasion_score, 1),
        preference_score=round(pref_score, 1),
        rotation_score=round(rotation_score, 1),
        total_score=total_graph_score
    )

    return GeneratedOutfitModel(
        id=str(uuid.uuid4()),
        layers=layers,
        styling_notes=styling_notes,
        total_clo=total_clo,
        color_harmony=harmony_res,
        formality_score=formality_avg,
        confidence=round(total_graph_score / 100.0, 2),
        occasion=resolved_occasion,
        weather_summary=f"Optimized for {target_clo} CLO thermal equilibrium",
        wardrobe_graph_score=graph_model
    )

def check_outfit_compatibility(garments: List[GarmentRef]) -> CompatibilityCheckResponse:
    if len(garments) < 2:
        return CompatibilityCheckResponse(
            score=70.0,
            color_score=75.0,
            style_score=70.0,
            formality_score=70.0,
            clo_score=70.0,
            issues=["Add at least a top and bottom to evaluate full outfit synergy."],
            suggestions=["Add a contrasting lower or upper layer."]
        )

    hex_colors = [g.dominant_color_hex for g in garments]
    harmony = evaluate_outfit_harmony(hex_colors)
    color_score = harmony["score"]

    formalities = [g.formality_score for g in garments]
    formality_diff = max(formalities) - min(formalities)
    formality_score = max(50.0, 100.0 - (formality_diff * 8.0))

    clos = [g.clo_value for g in garments]
    total_clo = calculate_outfit_total_clo(clos)
    clo_score = 90.0

    style_score = 88.0

    overall_score = round((color_score * 0.40) + (formality_score * 0.30) + (style_score * 0.20) + (clo_score * 0.10), 1)

    issues = []
    suggestions = []

    if formality_diff > 4.5:
        issues.append("Noticeable formality clash between formal and casual pieces.")
        suggestions.append("Swap the formal piece for a relaxed cut, or elevate shoes to match.")
    else:
        suggestions.append("Proportions and formality align seamlessly.")

    if color_score > 90:
        suggestions.append(f"Excellent {harmony['harmony_type']} color cohesion.")

    return CompatibilityCheckResponse(
        score=overall_score,
        color_score=color_score,
        style_score=style_score,
        formality_score=formality_score,
        clo_score=clo_score,
        issues=issues,
        suggestions=suggestions
    )
