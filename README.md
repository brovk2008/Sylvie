# 🌶️ SYLVIE — Your AI-Powered Personal Stylist

> **"Your wardrobe. Your rules."**  
> *A computational personal styling system that transforms your physical wardrobe into a living, intelligent digital stylist.*

---

## 🌟 Overview

Sylvie is an end-to-end multimodal fashion technology platform. Instead of recommending generic clothes from e-commerce catalogs or Pinterest boards, Sylvie works **exclusively with the physical garments you actually own**, taking into account:
1. **Real-time Local Weather**: ISO 7730 thermal CLO modeling to ensure you're never shivering or sweating.
2. **Body & Proportions**: Multi-silhouette adaptation based on height, weight, BMI dial, and torso ratios.
3. **40-Swatch Fitzpatrick Matrix**: Color harmony calibrated to cool, warm, neutral, and olive undertones.
4. **Color Science**: HSL angular difference calculations enforcing the classical 60-30-10 styling rule.
5. **Closet Economics**: Wear counters, cost-per-wear metrics, and rotation alerts for untouched pieces.

---

## 🏗️ Architecture & Repository Map

```
sylvie/
│
├── apps/
│   ├── mobile/                    # Expo React Native App (SDK 52, Expo Router v4)
│   │   ├── app/                   # File-based routes (Splash, Onboarding, Setup, Tabs)
│   │   ├── components/            # Design System (Chili Spice UI, Ribbon Reveal, Glow Cards)
│   │   ├── stores/                # Zustand state (Auth, User, Wardrobe, Outfits, Quiz)
│   │   └── assets/                # App icons, ribbons & logo.png
│   │
│   └── web/                       # Next.js 14 App Router Landing Portal
│       ├── app/                   # Editorial marketing pages & /download portal
│       ├── components/            # Hero, PhoneDemo, StyleSurveyPreview, Download
│       └── public/                # logo.png, sylvie.apk, SVGs
│
├── backend/                       # FastAPI Multimodal AI Backend (Python)
│   ├── app/
│   │   ├── main.py                # FastAPI entry point & CORS
│   │   ├── config.py              # Environment settings
│   │   ├── services/              # Color harmony, CLO calculator, weather, outfit engine
│   │   ├── models/                # Pydantic schemas (Garment, Outfit, Weather, Color)
│   │   └── routers/               # /health, /weather, /analyze-garment, /generate-outfit
│   ├── docker-compose.yml         # Qdrant & Redis containers
│   └── requirements.txt
│
├── packages/
│   └── fashion-ontology/          # Shared TypeScript types, constants & skin tones
│
├── supabase/
│   ├── schema.sql                 # DDL for profiles, garments, outfits, survey, skin_tones
│   └── seed.sql                   # 40-Swatch skin tone seed & reference data
│
└── docs/
    ├── SETUP.md                   # Complete installation manual
    ├── FASHION_ONTOLOGY.md        # Master ontology, CLO tables & color science
    └── API_REFERENCE.md           # REST API endpoints & Swagger docs
```

---

## 🚀 Quick Launch

### 1. Web Landing Portal (Next.js 14)
```bash
npm run dev:web
```
Open [http://localhost:3000](http://localhost:3000)

### 2. Mobile App (Expo)
```bash
npm run dev:mobile
```
Press `a` for Android Emulator or scan QR with Expo Go.

### 3. AI Backend (FastAPI)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows (or source venv/bin/activate on Mac/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🎨 Chili Spice Design System

The system runs on the curated **Chili Spice** palette:
- **Primary Brand**: `#E83B2E` (`--chili-500`)
- **Accent Glow**: `#FF6B47` (`--spice-ember`)
- **Premium Star/Gold**: `#C9A826` (`--spice-gold`)
- **Dark Canvas**: `#0E0504` (`--dark-bg`)
- **Surface Elevation**: `#1F0C0A` (`--dark-surface`)
- **Parchment Text**: `#FDF5E6` (`--spice-cream`)
- **Display Typography**: *Playfair Display* & *DM Sans*

---

*🌶️ Built for style. Powered by intelligence. Named Sylvie.*
