# 🌶️ SYLVIE AI Backend — API Reference

Base Local URL: `http://localhost:8000`  
Interactive Swagger UI: `http://localhost:8000/docs`

---

## 1. System Health

### `GET /health`
Returns runtime diagnostic status of the vision pipeline and services.

**Response:**
```json
{
  "status": "healthy",
  "app_name": "Sylvie AI Backend",
  "version": "1.0.0",
  "models_loaded": {
    "cv_segmentation": "ready",
    "attribute_extractor": "ready",
    "color_harmony": "ready",
    "clo_engine": "ready",
    "outfit_reasoner": "ready"
  },
  "gpu_available": false,
  "weather_service": "online"
}
```

---

## 2. Weather & Thermal Modeling

### `GET /weather`
Fetches real-time weather metrics from Open-Meteo and computes target CLO insulation.

**Query Parameters:**
- `lat` (float, default: `28.6139`)
- `lon` (float, default: `77.2090`)
- `city` (string, default: `"Delhi NCR"`)

**Response:**
```json
{
  "city": "Delhi NCR",
  "temp_c": 28.0,
  "feels_like_c": 29.2,
  "humidity_pct": 52,
  "wind_kmh": 11.2,
  "rain_probability": 0,
  "description": "Sunny & Warm",
  "recommended_clo": 0.68,
  "summary": "Sunny & Warm · 28°C (feels like 29.2°C) · CLO target 0.68"
}
```

---

## 3. Garment Analysis Pipeline

### `POST /analyze-garment`
Segments garment from photo, analyzes dominant HSL color palette, extracts fabric, and predicts formality & CLO values.

**Request Body:**
```json
{
  "image_base64": "data:image/jpeg;base64,...",
  "garment_class_hint": "top"
}
```

**Response:**
```json
{
  "task_id": "4b68db65-22d7-4950-8b17-7ca914bb896b",
  "status": "done",
  "estimated_seconds": 0,
  "result": {
    "garment_class": "top",
    "category": "tshirt",
    "fit": "relaxed",
    "dominant_color_hex": "#1C0A08",
    "dominant_color_name": "Chili Charcoal",
    "dominant_hsl": { "h": 0.0, "s": 0.0, "l": 10.0 },
    "color_temperature": "neutral",
    "primary_fiber": "cotton",
    "formality_score": 3.5,
    "clo_value": 0.12,
    "occasions": ["College", "Casual", "Weekend"],
    "ai_confidence": {
      "category": 0.96,
      "color": 0.99,
      "fit": 0.88,
      "formality": 0.84
    }
  }
}
```

---

## 4. Outfit Generation

### `POST /generate-outfit`
Assembles multi-layer outfit options calibrated to user context, available wardrobe pieces, and weather.

**Request Body:**
```json
{
  "user_id": "usr-demo",
  "context": {
    "occasion": "College",
    "query": "College lecture tomorrow",
    "available_garments": [
      {
        "id": "g-1",
        "garment_class": "top",
        "category": "Boxy Tee",
        "dominant_color_hex": "#1C0A08",
        "clo_value": 0.12,
        "formality_score": 3.5
      },
      {
        "id": "g-2",
        "garment_class": "bottom",
        "category": "Selvedge Jeans",
        "dominant_color_hex": "#1A365D",
        "clo_value": 0.28,
        "formality_score": 4.0
      },
      {
        "id": "g-4",
        "garment_class": "footwear",
        "category": "Leather Sneakers",
        "dominant_color_hex": "#FDF5E6",
        "clo_value": 0.04,
        "formality_score": 4.5
      }
    ]
  }
}
```

**Response:**
```json
{
  "id": "outfit-uuid",
  "occasion": "College",
  "total_clo": 0.44,
  "confidence": 0.94,
  "formality_score": 4.0,
  "color_harmony": {
    "harmony_type": "analogous",
    "score": 95.0,
    "description": "Smooth analogous color flow offering sophisticated visual continuity."
  },
  "styling_notes": "Anchored by your Boxy Tee and Selvedge Jeans, this ensemble strikes a confident 4.0/10 formality balance for College.",
  "layers": [
    { "layer_type": "base", "garment": { "id": "g-1", "category": "Boxy Tee", ... } },
    { "layer_type": "bottom", "garment": { "id": "g-2", "category": "Selvedge Jeans", ... } },
    { "layer_type": "footwear", "garment": { "id": "g-4", "category": "Leather Sneakers", ... } }
  ]
}
```
