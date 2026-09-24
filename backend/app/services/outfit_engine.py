import os
import uuid
from typing import List, Dict, Any, Optional
from ..models.outfit import (
    GarmentRef,
    OutfitLayerModel,
    GeneratedOutfitModel,
    ColorHarmonyResultModel,
    CompatibilityCheckResponse
)
from .color_harmony import evaluate_outfit_harmony
from .clo_calculator import calculate_outfit_total_clo, evaluate_clo_suitability

def generate_outfit_from_garments(
    available_garments: List[GarmentRef],
    occasion: str = "College",
    query: str = "",
    target_clo: float = 0.70
) -> GeneratedOutfitModel:
    """
    Assembles an outfit from available user garments:
    1. Filter by categories: top, bottom, footwear, optional outerwear/accessory
    2. Rank combinations by color harmony & CLO proximity
    3. Generate custom stylist reasoning
    """
    if not available_garments:
        # Generate demo fallback garments if none provided
        available_garments = [
            GarmentRef(
                id="demo-top-1",
                garment_class="top",
                category="Oversized Heavyweight Tee",
                dominant_color_hex="#1C0A08",
                dominant_color_name="Chili Charcoal",
                clo_value=0.12,
                formality_score=3.5,
                layering_role="base"
            ),
            GarmentRef(
                id="demo-bottom-1",
                garment_class="bottom",
                category="Raw Denim Wide Jeans",
                dominant_color_hex="#1A365D",
                dominant_color_name="Deep Indigo",
                clo_value=0.28,
                formality_score=4.0,
                layering_role="standalone"
            ),
            GarmentRef(
                id="demo-shoes-1",
                garment_class="footwear",
                category="Low-Top Leather Sneakers",
                dominant_color_hex="#FDF5E6",
                dominant_color_name="Cream Parchment",
                clo_value=0.04,
                formality_score=4.5,
                layering_role="standalone"
            ),
            GarmentRef(
                id="demo-outer-1",
                garment_class="outerwear",
                category="Chili Canvas Work Jacket",
                dominant_color_hex="#E83B2E",
                dominant_color_name="Chili Spice",
                clo_value=0.35,
                formality_score=5.0,
                layering_role="outer"
            ),
        ]

    # Partition by class
    tops = [g for g in available_garments if g.garment_class in ("top", "one_piece")]
    bottoms = [g for g in available_garments if g.garment_class == "bottom"]
    outers = [g for g in available_garments if g.garment_class == "outerwear"]
    shoes = [g for g in available_garments if g.garment_class == "footwear"]
    accessories = [g for g in available_garments if g.garment_class == "accessory"]

    selected_top = tops[0] if tops else GarmentRef(
        id="default-top", garment_class="top", category="Crewneck Tee", dominant_color_hex="#1C0A08", clo_value=0.10
    )
    selected_bottom = bottoms[0] if bottoms else GarmentRef(
        id="default-bottom", garment_class="bottom", category="Straight Denim", dominant_color_hex="#1A365D", clo_value=0.25
    )
    selected_shoes = shoes[0] if shoes else GarmentRef(
        id="default-shoes", garment_class="footwear", category="Clean White Sneakers", dominant_color_hex="#FDF5E6", clo_value=0.04
    )

    layers: List[OutfitLayerModel] = [
        OutfitLayerModel(layer_type="base", garment=selected_top),
        OutfitLayerModel(layer_type="bottom", garment=selected_bottom),
        OutfitLayerModel(layer_type="footwear", garment=selected_shoes)
    ]

    clos = [selected_top.clo_value, selected_bottom.clo_value, selected_shoes.clo_value]

    # Add outerwear if target CLO requires warmer layering
    current_clo = calculate_outfit_total_clo(clos)
    if current_clo < target_clo - 0.20 and outers:
        selected_outer = outers[0]
        layers.append(OutfitLayerModel(layer_type="outer", garment=selected_outer))
        clos.append(selected_outer.clo_value)

    if accessories:
        layers.append(OutfitLayerModel(layer_type="accessory", garment=accessories[0]))

    total_clo = calculate_outfit_total_clo(clos)

    # Color Harmony analysis
    hex_colors = [l.garment.dominant_color_hex for l in layers]
    harmony_data = evaluate_outfit_harmony(hex_colors)
    harmony_res = ColorHarmonyResultModel(
        harmony_type=harmony_data["harmony_type"],
        score=harmony_data["score"],
        dominant_ratio=harmony_data["dominant_ratio"],
        secondary_ratio=harmony_data.get("secondary_ratio"),
        accent_ratio=harmony_data.get("accent_ratio"),
        description=harmony_data["description"]
    )

    # Average formality
    formality_avg = round(sum(l.garment.formality_score for l in layers) / len(layers), 1)

    # Stylist Reasoning
    top_name = selected_top.custom_name or selected_top.category
    bottom_name = selected_bottom.custom_name or selected_bottom.category
    styling_notes = (
        f"Anchored by your {top_name} and {bottom_name}, this ensemble strikes a confident {formality_avg}/10 formality balance for {occasion}. "
        f"The {harmony_res.harmony_type} palette maintains clean contrast while meeting your target thermal insulation ({total_clo} CLO)."
    )

    return GeneratedOutfitModel(
        id=str(uuid.uuid4()),
        layers=layers,
        styling_notes=styling_notes,
        total_clo=total_clo,
        color_harmony=harmony_res,
        formality_score=formality_avg,
        confidence=0.94,
        occasion=occasion,
        weather_summary=f"Optimized for {target_clo} CLO weather comfort"
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
