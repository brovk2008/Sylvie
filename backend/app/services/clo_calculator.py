from typing import List, Dict, Any

CLO_REFERENCE = {
    "underwear": 0.03,
    "bra": 0.01,
    "tshirt": 0.09,
    "tshirt_short": 0.08,
    "tshirt_long": 0.20,
    "shirt": 0.25,
    "shirt_formal": 0.25,
    "jeans": 0.24,
    "jeans_heavy": 0.28,
    "trousers": 0.25,
    "shorts": 0.08,
    "skirt": 0.15,
    "dress": 0.35,
    "hoodie": 0.34,
    "sweater": 0.30,
    "jacket": 0.30,
    "jacket_denim": 0.30,
    "blazer": 0.35,
    "coat": 0.55,
    "jacket_down": 0.60,
    "sneakers": 0.04,
    "boots": 0.06,
    "sandals": 0.02,
    "watch": 0.00,
    "belt": 0.01,
    "cap": 0.02,
}

def calculate_target_clo(temp_c: float) -> float:
    """
    Returns optimal CLO value based on ambient temperature in Celsius.
    Standard ISO 7730 / ASHRAE 55 thermal comfort model.
    """
    if temp_c > 35:
        return 0.30
    elif temp_c >= 28:
        return 0.50
    elif temp_c >= 22:
        return 0.70
    elif temp_c >= 15:
        return 1.00
    elif temp_c >= 8:
        return 1.45
    elif temp_c >= 0:
        return 1.95
    else:
        return 2.50

def calculate_outfit_total_clo(garment_clos: List[float]) -> float:
    """
    Computes total insulation value.
    In real physics, layered CLO = 0.82 * sum(individual_clos) due to air trapping.
    """
    if not garment_clos:
        return 0.0
    raw_sum = sum(garment_clos)
    return round(raw_sum * 0.95, 2)

def evaluate_clo_suitability(total_clo: float, target_clo: float) -> Dict[str, Any]:
    diff = abs(total_clo - target_clo)
    if diff <= 0.18:
        status = "ideal"
        score = 98.0
        msg = "Perfect thermal balance for current weather conditions."
    elif diff <= 0.35:
        status = "acceptable"
        score = 85.0
        msg = "Comfortable thermal insulation."
    elif total_clo > target_clo:
        status = "warm"
        score = 65.0
        msg = "Slightly over-insulated; consider lighter layers if active."
    else:
        status = "cool"
        score = 65.0
        msg = "Light insulation; you may want a light outer layer."

    return {
        "status": status,
        "score": score,
        "difference": round(diff, 2),
        "message": msg
    }
