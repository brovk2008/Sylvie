# 🌶️ SYLVIE — Developer & Environment Setup Guide

Welcome to the **Sylvie** monorepo! This guide covers running the mobile app, web landing site, and FastAPI AI backend locally or on live hardware.

---

## 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18+ (tested on v24.x)
- **npm**: v9+ (tested on npm 11.x)
- **Python**: 3.10+ (tested on Python 3.14)
- **Docker**: (optional, for local Qdrant & Redis)
- **Expo Go** or an Android Device with USB Debugging enabled

---

## 2. Monorepo Structure

```
├── apps/
│   ├── mobile/         # Expo React Native App (SDK 52, Expo Router v4)
│   └── web/            # Next.js 14 Landing Website & APK Download Portal
├── backend/            # FastAPI Multimodal AI Backend (Python)
├── packages/
│   └── fashion-ontology/ # Shared TypeScript types, constants & skin tones
├── supabase/           # PostgreSQL Schema, RLS & 40-Skin Tone Seed
└── docs/               # Technical references & documentation
```

---

## 3. Fast Start

### Step 1: Install Dependencies
Run from the repository root:
```bash
npm install
```
This automatically links the workspaces: `@sylvie/fashion-ontology`, `apps/web`, and `apps/mobile`.

### Step 2: Build Shared Packages
```bash
npm run build:packages
```

---

## 4. Running the Web Landing Site (Next.js 14)

```bash
npm run dev:web
```
Visit [http://localhost:3000](http://localhost:3000) in your browser:
- Live editorial hero section with interactive phone mockup
- 6 feature cards with Chili glow hover effect
- Interactive **Style Discovery Game** with auto-expansion mechanics
- One-click APK download section with scan-ready QR code

---

## 5. Running the AI Backend (FastAPI)

Navigate to the backend directory:
```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive OpenAPI Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Docker Services (Optional):
To start local vector memory (Qdrant) and background cache (Redis):
```bash
cd backend
docker compose up -d
```

### Exposing Server via Cloudflare Tunnel:
```bash
cloudflared tunnel --url http://localhost:8000
```
Copy the provided `.trycloudflare.com` URL into `apps/mobile/.env` as `EXPO_PUBLIC_AI_SERVER_URL`.

---

## 6. Running the Mobile App (Expo)

Navigate to `apps/mobile`:
```bash
npm run dev:mobile
```
Press:
- `a` to open in Android Emulator / connected phone
- `w` to open in Web Browser
- Or scan the QR code with the **Expo Go** app on your phone!

---

## 7. Database (Supabase) Setup

1. Open your Supabase project dashboard.
2. Go to the **SQL Editor**.
3. Run `supabase/schema.sql` to generate all tables, RLS policies, and indexes.
4. Run `supabase/seed.sql` to populate the 40-swatch Fitzpatrick skin tone matrix and initial data.
