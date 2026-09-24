# 🌶️ SYLVIE — Full Implementation Plan
### *Your AI-Powered Personal Stylist*

---

> **Version:** 1.0 — September 2026  
> **Stack:** Expo (React Native) + Next.js + FastAPI + Supabase + Qdrant  
> **Target:** Android APK (via EAS Build) + Web (Vercel)  
> **Theme:** Chili Spice  
> **Logo Animation:** Ribbon Reveal  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Chili Spice Design System](#2-chili-spice-design-system)
3. [Full Technology Stack](#3-full-technology-stack)
4. [Repository Structure](#4-repository-structure)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [Backend API Architecture (Local Server)](#6-backend-api-architecture-local-server)
7. [AI Pipeline](#7-ai-pipeline)
8. [Mobile App — Screen-by-Screen Specification](#8-mobile-app--screen-by-screen-specification)
9. [Landing Website Specification](#9-landing-website-specification)
10. [Animation Catalogue](#10-animation-catalogue)
11. [Build & Deployment](#11-build--deployment)
12. [Phased Implementation Roadmap](#12-phased-implementation-roadmap)
13. [Environment Variables & Secrets](#13-environment-variables--secrets)
14. [Performance & Quality Checklist](#14-performance--quality-checklist)

---

## 1. Project Overview

**Sylvie** is a computational fashion system that transforms a user's physical wardrobe into a living, intelligent digital stylist. The user photographs every clothing item they own, builds a structured digital closet ("My Almirah"), and receives AI-generated outfit recommendations calibrated to the weather, occasion, body profile, and personal style.

### What makes Sylvie different from every other "outfit picker"

| Competitor Approach | Sylvie Approach |
|---|---|
| Generic suggestions from a library | Only uses clothes you actually own |
| Flat labels (e.g. "blue shirt") | Full fashion ontology (fit, pattern, formality score, aesthetic weights) |
| Ignores weather | CLO-value outfit assembly per real-time weather |
| No body context | Full body profile + skin tone + hair color for visual harmony |
| Western-only dataset | IndoFashion + DeepFashion2 — culturally aware |
| Generic AI wrapper | Multi-stage vision pipeline: YOLO → Florence-2 → FashionCLIP → Qdrant → Claude |
| Cold-start useless | Psychological style survey seeds preference vector before first use |

---

## 2. Chili Spice Design System

The entire app — mobile and web — runs on a single shared token set. Never use raw hex values anywhere in code; always reference tokens.

### 2.1 Color Tokens

```css
/* ── CORE CHILI SCALE ──────────────────────────── */
--chili-50:   #FEF2F1;   /* lightest tint, almost white */
--chili-100:  #FDDFDC;
--chili-200:  #FCC4BF;
--chili-300:  #F99892;
--chili-400:  #F56A60;
--chili-500:  #E83B2E;   /* ★ PRIMARY BRAND */
--chili-600:  #C0271B;   /* primary dark / hover */
--chili-700:  #9E1F15;
--chili-800:  #7B1810;
--chili-900:  #4A0E0A;
--chili-950:  #280706;   /* near black */

/* ── SPICE SUPPORTING PALETTE ───────────────────── */
--spice-cream:        #FDF5E6;  /* page background (light) */
--spice-parchment:    #F7E8D0;  /* card background (light) */
--spice-paprika:      #D35400;  /* secondary CTA, highlights */
--spice-terracotta:   #CB4335;  /* warning, accent */
--spice-gold:         #C9A826;  /* premium, rating stars, badge */
--spice-charcoal:     #1C0A08;  /* primary text (light mode) */
--spice-ember:        #FF6B47;  /* interactive hover glow */

/* ── DARK MODE SURFACES ──────────────────────────── */
--dark-bg:        #0E0504;   /* page background (dark) */
--dark-surface:   #1F0C0A;   /* card / sheet (dark) */
--dark-elevated:  #2E1410;   /* modal / bottom sheet (dark) */
--dark-border:    #4A1C18;   /* border, divider (dark) */
--dark-muted:     #B87E78;   /* muted text (dark) */

/* ── SEMANTIC ────────────────────────────────────── */
--color-success:  #2E7D32;
--color-warning:  #E65100;
--color-error:    #B71C1C;
--color-info:     #1565C0;
```

### 2.2 Typography

```
Font Families:
  Display:   "Playfair Display"  (fashion magazine editorial — Google Fonts)
  Body:      "DM Sans"           (clean, modern, readable)
  Mono/Code: "JetBrains Mono"    (labels, stats, codes)
  Accent:    "Cormorant Garamond" (thin decorative flourishes)

Scale (sp / rem units):
  xs:   11px
  sm:   13px
  base: 15px
  md:   17px
  lg:   20px
  xl:   24px
  2xl:  30px
  3xl:  38px
  4xl:  48px
  hero: 64px
```

### 2.3 Motion Tokens

```
Durations:
  fast:     150ms   (micro interactions: toggle, checkbox)
  normal:   300ms   (standard transitions)
  slow:     500ms   (page transitions, modal entry)
  cinematic: 800ms  (splash, hero entrances)
  logo:    1800ms   (ribbon reveal)

Easings:
  spring:   cubic-bezier(0.34, 1.56, 0.64, 1)    /* bouncy */
  smooth:   cubic-bezier(0.4, 0.0, 0.2, 1)        /* material */
  sharp:    cubic-bezier(0.4, 0.0, 0.6, 1)        /* snappy exit */
  reveal:   cubic-bezier(0.16, 1, 0.3, 1)         /* ease-out-expo */
```

### 2.4 Spacing & Radius

```
Spacing:   4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (pt/px)
Radius:
  xs:  4px    (chips, tags)
  sm:  8px    (buttons, inputs)
  md:  12px   (cards)
  lg:  20px   (sheets, drawers)
  xl:  28px   (hero cards)
  full: 9999px (pills, avatar)
```

### 2.5 Elevation / Shadow

```
1 (ambient): 0 1px 3px rgba(28,10,8,0.12), 0 1px 2px rgba(28,10,8,0.08)
2 (card):    0 4px 12px rgba(28,10,8,0.14), 0 2px 4px rgba(28,10,8,0.10)
3 (raised):  0 8px 24px rgba(28,10,8,0.16), 0 4px 8px rgba(28,10,8,0.12)
4 (modal):   0 20px 48px rgba(28,10,8,0.22), 0 8px 16px rgba(28,10,8,0.15)
5 (chili):   0 8px 32px rgba(232,59,46,0.35)   /* brand glow */
```

---

## 3. Full Technology Stack

### 3.1 Mobile App (Primary Product)

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Expo SDK | 52 | Managed workflow, EAS Build |
| Navigation | Expo Router | v4 | File-based, type-safe routing |
| Language | TypeScript | 5.5 | Full strict mode |
| Styling | NativeWind | v4 | Tailwind in React Native |
| Animations | React Native Reanimated | v3 | Layout, gesture, spring animations |
| Gestures | React Native Gesture Handler | v2 | Swipe, drag, pinch |
| Lottie | lottie-react-native | 7.x | Onboarding, loading, empty states |
| Canvas | React Native Skia | 1.x | Custom ribbon reveal, glow effects |
| Lists | @shopify/flash-list | 1.7 | Wardrobe grid, outfit cards |
| Images | expo-image | 2.x | Fast load, blurhash placeholder |
| Camera | expo-camera | 15.x | In-app garment photography |
| Image Picker | expo-image-picker | 15.x | Gallery selection |
| State | Zustand | 5.x | Global store (user, wardrobe, session) |
| Server State | TanStack Query v5 | 5.x | API cache, background refetch |
| Auth/DB | @supabase/supabase-js | 2.x | Auth, DB, Storage, Realtime |
| Secure Storage | expo-secure-store | 14.x | Token storage |
| Haptics | expo-haptics | 14.x | Tactile feedback on interactions |
| Linear Gradient | expo-linear-gradient | 14.x | Header gradients, card overlays |
| Icons | @expo/vector-icons + lucide-rn | latest | Icon system |
| Charts | victory-native | 40.x | Analytics charts |
| Form | react-hook-form + zod | latest | Profile forms with validation |
| Date | date-fns | 4.x | Date formatting |
| HTTP | axios + TanStack Query | latest | Backend calls with retry |
| Analytics | expo-tracking-transparency | — | Opt-in analytics prep |

### 3.2 Landing Website

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 14 (App Router) | SSG/SSR, Vercel-native |
| Language | TypeScript | 5.5 | Strict mode |
| Styling | Tailwind CSS | 3.4 | Utility-first |
| Motion | Framer Motion | 11 | Page animations, scroll effects |
| 3D | React Three Fiber + Drei | 8 | 3D phone mockup on hero |
| Lottie (Web) | @lottiefiles/react-lottie | latest | Hero animations |
| Scroll | GSAP ScrollTrigger | 3.x | Pinned sections, reveal on scroll |
| Icons | lucide-react | latest | Icon system |
| Fonts | next/font (Google) | — | Playfair Display, DM Sans |
| Deploy | Vercel | — | Automatic from GitHub |

### 3.3 AI Backend (Your Laptop)

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| API | FastAPI | 0.115 | Async REST API |
| ASGI | Uvicorn | 0.32 | ASGI server |
| Tunnel | Cloudflare Tunnel | cloudflared | Expose local server permanently |
| CV — Detection | YOLOv8-seg | ultralytics 8.3 | Garment instance segmentation |
| CV — Zero-shot | Segment Anything 2 | SAM2 | Complex garment masking |
| VLM | Florence-2 (fine-tuned) | microsoft/Florence-2-large | Structured attribute JSON extraction |
| VLM alt | Qwen2.5-VL-7B | Qwen2.5-VL | Zero-shot fashion attribute tagging |
| Embeddings | FashionCLIP | patrickjohncyh/fashion-clip | Wardrobe vector representation |
| Vector DB | Qdrant | 1.12 (local Docker) | Semantic wardrobe search |
| LLM Reasoning | Claude claude-sonnet-4-6 (API) | — | Outfit reasoning, styling advice |
| Color | colorthief + colormath | — | HSL extraction, color harmony |
| Weather | Open-Meteo API | — | Free, no-key weather data |
| Cache | Redis | 7.x | Inference result caching |
| Validation | pydantic | v2 | Schema validation |
| Image ops | Pillow + OpenCV | latest | Pre/post processing |
| Background jobs | Celery + Redis | 5.4 | Async image processing queue |

### 3.4 Database & Cloud Services

| Service | Purpose |
|---|---|
| Supabase PostgreSQL | User profiles, garment metadata, outfit history, preferences |
| Supabase Storage | Garment photos, user photos (face, body), avatar |
| Supabase Auth | Google OAuth, session management |
| Supabase Realtime | Live notifications (e.g. AI processing complete) |
| Supabase Edge Functions | Lightweight server-side logic, webhook handlers |
| Qdrant (local) | Garment embedding vectors per user |
| Cloudflare Tunnel | Permanent public URL for local AI server |

---

## 4. Repository Structure

```
sylvie/
│
├── apps/
│   ├── mobile/                    # Expo React Native app
│   │   ├── app/                   # Expo Router file-based routes
│   │   │   ├── (auth)/
│   │   │   │   ├── index.tsx          # Splash / logo animation
│   │   │   │   ├── onboarding/
│   │   │   │   │   ├── index.tsx      # Welcome carousel
│   │   │   │   │   ├── survey.tsx     # Fashion knowledge survey
│   │   │   │   │   └── style-picker.tsx # Psychological style game
│   │   │   │   └── login.tsx          # Google auth screen
│   │   │   │
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx        # Tab bar layout (4 tabs)
│   │   │   │   ├── home.tsx           # Dashboard / Home
│   │   │   │   ├── almirah/
│   │   │   │   │   ├── index.tsx      # Wardrobe grid
│   │   │   │   │   ├── [id].tsx       # Garment detail
│   │   │   │   │   └── add.tsx        # Add garment flow
│   │   │   │   ├── outfit.tsx         # Outfit generator
│   │   │   │   └── profile.tsx        # User profile
│   │   │   │
│   │   │   ├── setup/
│   │   │   │   ├── face-scan.tsx      # Multi-angle face capture
│   │   │   │   ├── body-scan.tsx      # Body photo
│   │   │   │   ├── skin-tone.tsx      # Skin tone selector
│   │   │   │   ├── measurements.tsx   # Height, weight, BMI
│   │   │   │   └── preferences.tsx    # Style & color prefs
│   │   │   │
│   │   │   └── _layout.tsx            # Root layout (auth gate)
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                    # Design system atoms
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Chip.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── ProgressRing.tsx
│   │   │   │   ├── GlowCard.tsx        # Chili glow card
│   │   │   │   └── SpiceGradient.tsx   # Reusable gradient
│   │   │   │
│   │   │   ├── animations/
│   │   │   │   ├── RibbonReveal.tsx    # Logo intro animation
│   │   │   │   ├── StyleBurst.tsx      # Style card selection burst
│   │   │   │   ├── OutfitReveal.tsx    # Outfit slide-in reveal
│   │   │   │   └── ConfettiEffect.tsx  # Completion celebration
│   │   │   │
│   │   │   ├── wardrobe/
│   │   │   │   ├── GarmentCard.tsx     # Wardrobe item tile
│   │   │   │   ├── GarmentDetail.tsx   # Full garment view
│   │   │   │   ├── AddGarmentFlow.tsx  # Multi-step garment add
│   │   │   │   └── WardrobeGrid.tsx    # Masonry/grid layout
│   │   │   │
│   │   │   ├── outfit/
│   │   │   │   ├── OutfitCard.tsx      # Today's fit card
│   │   │   │   ├── OutfitLayer.tsx     # Individual layer in outfit
│   │   │   │   └── WeatherBadge.tsx    # Weather + CLO display
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── ProfileCompletionBanner.tsx
│   │   │   │   ├── DailyOutfitHero.tsx
│   │   │   │   ├── WeatherWidget.tsx
│   │   │   │   └── QuickStats.tsx
│   │   │   │
│   │   │   └── survey/
│   │   │       ├── StyleCard.tsx       # Style type card with image
│   │   │       ├── SurveyProgress.tsx
│   │   │       └── StyleSearchBar.tsx
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   ├── userStore.ts
│   │   │   ├── wardrobeStore.ts
│   │   │   ├── outfitStore.ts
│   │   │   └── onboardingStore.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── supabase.ts            # Supabase client
│   │   │   ├── api.ts                 # Axios client for AI server
│   │   │   ├── colorHarmony.ts        # HSL math, 60-30-10
│   │   │   ├── cloCalculator.ts       # CLO value math
│   │   │   └── fashionOntology.ts     # Ontology constants
│   │   │
│   │   ├── constants/
│   │   │   ├── colors.ts              # Full token map
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── animations.ts          # Duration/easing constants
│   │   │   └── fashionTypes.ts        # All ontology enums
│   │   │
│   │   ├── hooks/
│   │   │   ├── useWardrobe.ts
│   │   │   ├── useOutfitGen.ts
│   │   │   ├── useWeather.ts
│   │   │   ├── useGarmentCamera.ts
│   │   │   └── useProfileCompletion.ts
│   │   │
│   │   ├── assets/
│   │   │   ├── logo.png               # You provide this
│   │   │   ├── lottie/
│   │   │   │   ├── welcome-fashion.json
│   │   │   │   ├── wardrobe-scan.json
│   │   │   │   ├── ai-thinking.json
│   │   │   │   ├── outfit-revealed.json
│   │   │   │   ├── style-burst-*.json  # 15 style type animations
│   │   │   │   ├── empty-wardrobe.json
│   │   │   │   └── profile-complete.json
│   │   │   └── images/
│   │   │       ├── style-types/        # 15+ style reference images
│   │   │       └── onboarding/
│   │   │
│   │   ├── app.json                   # Expo config
│   │   ├── eas.json                   # EAS build profiles
│   │   ├── tailwind.config.js         # NativeWind config + Chili tokens
│   │   └── tsconfig.json
│   │
│   └── web/                           # Next.js landing site
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx               # Landing home
│       │   ├── download/page.tsx      # APK download page
│       │   └── globals.css
│       ├── components/
│       │   ├── sections/
│       │   │   ├── Hero.tsx
│       │   │   ├── Features.tsx
│       │   │   ├── PhoneDemo.tsx
│       │   │   ├── HowItWorks.tsx
│       │   │   ├── StyleSurveyPreview.tsx
│       │   │   └── Download.tsx
│       │   ├── PhoneMockup3D.tsx      # React Three Fiber phone
│       │   └── AnimatedCounter.tsx
│       ├── public/
│       │   ├── sylvie.apk             # Latest build
│       │   └── assets/
│       ├── tailwind.config.ts         # Web Chili tokens
│       └── next.config.ts
│
├── packages/
│   └── fashion-ontology/              # Shared TS types for garment schema
│       ├── src/
│       │   ├── types.ts               # All garment attribute types
│       │   └── constants.ts           # CLO values, style enums
│       └── package.json
│
├── backend/                           # FastAPI AI server (runs on your laptop)
│   ├── app/
│   │   ├── main.py                    # FastAPI entry point
│   │   ├── config.py                  # Settings (env, model paths)
│   │   ├── routers/
│   │   │   ├── garment.py             # POST /analyze-garment
│   │   │   ├── outfit.py              # POST /generate-outfit
│   │   │   ├── color.py               # POST /analyze-color
│   │   │   ├── weather.py             # GET /weather
│   │   │   └── health.py              # GET /health
│   │   ├── services/
│   │   │   ├── segmentation.py        # YOLO + SAM2
│   │   │   ├── attribute_extraction.py # Florence-2 / Qwen2.5-VL
│   │   │   ├── embedding.py           # FashionCLIP
│   │   │   ├── color_harmony.py       # HSL math
│   │   │   ├── clo_calculator.py      # CLO outfit assembly
│   │   │   ├── outfit_engine.py       # Qdrant search + Claude reasoning
│   │   │   └── weather_service.py     # Open-Meteo integration
│   │   ├── models/
│   │   │   ├── garment.py             # Pydantic schemas
│   │   │   ├── outfit.py
│   │   │   └── user.py
│   │   ├── ml/
│   │   │   ├── yolo_wrapper.py
│   │   │   ├── sam2_wrapper.py
│   │   │   ├── florence2_wrapper.py
│   │   │   └── fashion_clip.py
│   │   └── utils/
│   │       ├── image_utils.py
│   │       └── ontology.py
│   ├── workers/
│   │   └── celery_app.py              # Async processing queue
│   ├── scripts/
│   │   ├── start_tunnel.sh            # Start Cloudflare tunnel
│   │   ├── start_server.sh            # Start FastAPI + Redis + Qdrant
│   │   └── download_models.py         # Pull all model weights
│   ├── requirements.txt
│   ├── docker-compose.yml             # Redis + Qdrant containers
│   └── .env.example
│
└── docs/
    ├── SETUP.md                       # How to start the backend
    ├── FASHION_ONTOLOGY.md            # Master ontology reference
    └── API_REFERENCE.md               # Full API docs
```

---

## 5. Database Schema (Supabase)

All tables use Row Level Security (RLS) — users can only read/write their own data.

### 5.1 `profiles` — User profile

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Identity
  display_name TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,                          -- 'male','female','nonbinary','prefer_not'

  -- Body measurements
  height_cm NUMERIC(5,1),
  weight_kg NUMERIC(5,1),
  bmi NUMERIC(4,1) GENERATED ALWAYS AS (
    ROUND((weight_kg / ((height_cm/100)^2))::NUMERIC, 1)
  ) STORED,
  body_type TEXT,                       -- 'ectomorph','mesomorph','endomorph','hourglass', etc.
  chest_cm NUMERIC(5,1),
  waist_cm NUMERIC(5,1),
  hips_cm NUMERIC(5,1),
  shoulder_cm NUMERIC(5,1),
  inseam_cm NUMERIC(5,1),
  shoe_size_eu NUMERIC(4,1),

  -- Appearance
  skin_tone_code TEXT,                  -- see skin tone schema below
  skin_undertone TEXT,                  -- 'warm','cool','neutral'
  hair_color TEXT,
  hair_length TEXT,                     -- 'bald','short','medium','long'
  eye_color TEXT,

  -- Face scan photos (Supabase Storage paths)
  face_photo_front TEXT,
  face_photo_left TEXT,
  face_photo_right TEXT,
  face_photo_back TEXT,
  body_photo_front TEXT,
  body_photo_side TEXT,

  -- Style profile (from survey + continued learning)
  primary_style_vector JSONB,           -- { streetwear: 0.82, minimal: 0.41, ... }
  style_archetypes TEXT[],              -- ['streetwear','minimalist'] top 3
  preferred_colors TEXT[],
  disliked_colors TEXT[],
  preferred_occasions TEXT[],
  formality_range NUMRANGE,             -- e.g. [2,6] — casual to business casual

  -- Fashion knowledge from survey
  fashion_knowledge_level TEXT,         -- 'beginner','intermediate','advanced'
  survey_completed_at TIMESTAMPTZ,

  -- Completion state
  profile_completion_pct INTEGER DEFAULT 0,
  onboarding_done BOOLEAN DEFAULT FALSE,
  almirah_photo_count INTEGER DEFAULT 0,

  -- Location for weather
  city TEXT,
  country_code CHAR(2),
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6)
);
```

### 5.2 `garments` — Every item in the wardrobe

```sql
CREATE TABLE garments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Photo references (Supabase Storage)
  photo_front TEXT NOT NULL,
  photo_back TEXT,                      -- required for clothes, null for accessories
  photo_left TEXT,                      -- for shoes
  photo_right TEXT,                     -- for shoes
  photo_thumb TEXT,                     -- auto-generated 256x256

  -- Garment identity (from AI + user confirmation)
  garment_class TEXT NOT NULL,          -- 'top','bottom','one_piece','outerwear','footwear','accessory'
  category TEXT NOT NULL,               -- 'tshirt','jeans','sneaker','watch', etc.
  subcategory TEXT,
  custom_name TEXT,                     -- user's own name for item (optional)
  brand TEXT,

  -- Physical attributes (AI extracted)
  fit TEXT,                             -- 'slim','regular','oversized','loose','bodycon',...
  length TEXT,                          -- 'cropped','hip','midi','maxi', etc.
  sleeve TEXT,                          -- 'sleeveless','short','3/4','long'
  neckline TEXT,
  closure TEXT,                         -- 'buttons','zipper','pullover',...
  has_pockets BOOLEAN,
  rise TEXT,                            -- 'low','mid','high' (for bottoms)
  silhouette TEXT,                      -- 'straight','flared','tapered','boxy'

  -- Visual attributes (AI extracted)
  dominant_color_hex CHAR(7),
  dominant_color_hsl JSONB,             -- {h:220, s:45, l:30}
  secondary_color_hex CHAR(7),
  accent_color_hex CHAR(7),
  color_temperature TEXT,               -- 'warm','cool','neutral'
  pattern TEXT,                         -- 'solid','striped','floral','check',...
  pattern_scale TEXT,                   -- 'micro','small','medium','large'
  pattern_contrast TEXT,                -- 'low','medium','high'
  texture TEXT,                         -- 'smooth','ribbed','knit','rough',...
  finish TEXT,                          -- 'matte','glossy','satin','washed'

  -- Material
  primary_fabric TEXT,                  -- 'cotton','denim','wool','polyester',...
  stretch_level TEXT,                   -- 'none','low','medium','high'
  weight TEXT,                          -- 'lightweight','medium','heavy'
  opacity TEXT,                         -- 'opaque','semi-sheer','sheer'

  -- Semantic attributes (inferred from lower-level features)
  formality_score NUMERIC(3,1),         -- 0.0-10.0 continuous scale
  aesthetic_weights JSONB,              -- {streetwear:0.82, minimalist:0.41,...}
  occasions TEXT[],                     -- ['college','casual','party']
  seasons TEXT[],                       -- ['spring','summer','all']
  cultural_style TEXT,                  -- 'western','indian_ethnic','korean',...
  layering_role TEXT,                   -- 'base','mid','outer','standalone'
  outfit_role TEXT,                     -- 'foundation','statement','accent','neutral'

  -- Weather / CLO
  clo_value NUMERIC(3,2),              -- thermal insulation value
  weather_min_temp_c INTEGER,
  weather_max_temp_c INTEGER,
  water_resistant BOOLEAN DEFAULT FALSE,

  -- User overrides & ratings
  user_confirmed BOOLEAN DEFAULT FALSE,
  user_custom_tags TEXT[],
  user_rating INTEGER,                  -- 1-5
  never_wear BOOLEAN DEFAULT FALSE,
  favorite BOOLEAN DEFAULT FALSE,

  -- Wardrobe state
  clean_status TEXT DEFAULT 'clean',    -- 'clean','dirty','washing','drying','ironed'
  is_available BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,       -- false = soft deleted

  -- Wear tracking
  wear_count INTEGER DEFAULT 0,
  last_worn_at DATE,
  days_since_worn INTEGER GENERATED ALWAYS AS (
    CURRENT_DATE - last_worn_at
  ) STORED,

  -- Commercial
  purchase_price NUMERIC(10,2),
  purchase_currency CHAR(3) DEFAULT 'INR',
  purchased_at DATE,
  cost_per_wear NUMERIC(10,2) GENERATED ALWAYS AS (
    CASE WHEN wear_count > 0 THEN ROUND(purchase_price / wear_count, 2) ELSE purchase_price END
  ) STORED,

  -- AI metadata (confidence scores)
  ai_confidence JSONB,                  -- {category:0.97, color:0.99, fit:0.71,...}
  ai_model_version TEXT,
  ai_processed_at TIMESTAMPTZ,
  embedding_id TEXT,                    -- Qdrant point ID

  -- FTS index
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(category,'') || ' ' || coalesce(custom_name,'') || ' ' || coalesce(primary_fabric,''))
  ) STORED
);

CREATE INDEX ON garments (user_id);
CREATE INDEX ON garments (garment_class);
CREATE INDEX ON garments (never_wear) WHERE never_wear = FALSE;
CREATE INDEX ON garments USING GIN (search_vector);
CREATE INDEX ON garments USING GIN (occasions);
```

### 5.3 `outfits` — Generated outfit records

```sql
CREATE TABLE outfits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Outfit composition
  garment_ids UUID[] NOT NULL,           -- ordered: base → outer
  occasion TEXT,
  context_query TEXT,                    -- "college tomorrow"
  weather_at_gen JSONB,                  -- temp, humidity, wind at generation time
  total_clo NUMERIC(3,2),
  color_harmony_type TEXT,               -- 'analogous','complementary','monochromatic'
  color_harmony_score NUMERIC(4,1),
  formality_score NUMERIC(3,1),

  -- AI styling notes
  styling_notes TEXT,                    -- Claude's explanation
  color_breakdown JSONB,                 -- 60-30-10 breakdown

  -- User actions
  was_worn BOOLEAN DEFAULT FALSE,
  worn_at DATE,
  user_rating INTEGER,
  user_feedback TEXT,
  saved_as_favorite BOOLEAN DEFAULT FALSE,

  -- Generation metadata
  generation_time_ms INTEGER,
  model_version TEXT
);
```

### 5.4 `style_survey` — Onboarding survey results

```sql
CREATE TABLE style_survey (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),

  -- Knowledge level questions
  knows_color_theory BOOLEAN,
  describes_own_style BOOLEAN,
  shops_by_trend BOOLEAN,
  fashion_knowledge_level TEXT,          -- computed: 'beginner','intermediate','advanced'

  -- Style preferences (selected from visual cards)
  selected_style_ids TEXT[],            -- up to 15 style type IDs
  expanded_style_ids TEXT[],            -- from auto-expansion clicks
  rejected_style_ids TEXT[],           -- styles they swiped past without selecting

  -- Derived preference vector
  derived_style_vector JSONB,

  -- Psychological scores (from selection sequence analysis)
  boldness_score NUMERIC(3,1),           -- 1-10
  formality_preference NUMERIC(3,1),
  pattern_tolerance NUMERIC(3,1),
  color_bravery NUMERIC(3,1)
);
```

### 5.5 `skin_tones` — Reference table

```sql
CREATE TABLE skin_tones (
  code TEXT PRIMARY KEY,                 -- 'ITA01', 'ITA02', ... 'ITA40'
  display_name TEXT,                     -- "Warm Ivory", "Golden Olive", etc.
  hex_value CHAR(7) NOT NULL,
  fitzpatrick_scale INTEGER,             -- I-VI (1-6)
  undertone TEXT,                        -- 'warm','cool','neutral','olive'
  season TEXT,                           -- 'spring','summer','autumn','winter' (color analysis)
  complementary_colors TEXT[],           -- colors that pair well with this skin tone
  avoid_colors TEXT[]
);
```

---

## 6. Backend API Architecture (Local Server)

### 6.1 FastAPI Application Structure

```
Base URL (via Cloudflare Tunnel): https://sylvie-ai.cfargotunnel.com
                  (set your own tunnel domain in cloudflared config)

Rate limiting:     100 req/min per user (Redis-backed)
Auth:              Bearer token (Supabase JWT verified server-side)
Image upload:      max 10MB, JPEG/PNG/WEBP
Async processing:  Celery tasks for heavy ML inference (returns task_id → poll)
```

### 6.2 Endpoints

```
HEALTH
  GET  /health                  → { status, models_loaded, gpu_available }

GARMENT ANALYSIS
  POST /analyze-garment
    Body: { image_base64: str, garment_class_hint?: str }
    Response: {
      task_id: str,              ← poll with task_id
      estimated_seconds: int
    }

  GET  /task/{task_id}
    Response: {
      status: 'pending'|'processing'|'done'|'failed',
      result?: GarmentAttributes,
      confidence_flags?: { field: 'low'|'medium'|'high' }[]
    }

OUTFIT GENERATION
  POST /generate-outfit
    Body: {
      user_id: str,
      context: {
        occasion: str,
        query: str,               ← "college tomorrow"
        weather: WeatherData,
        available_garment_ids: str[]
      }
    }
    Response: {
      outfit: {
        layers: GarmentRef[],
        styling_notes: str,
        total_clo: float,
        color_harmony: ColorHarmonyResult,
        formality_score: float,
        confidence: float
      }
    }

COLOR ANALYSIS
  POST /analyze-color
    Body: { image_base64: str }
    Response: {
      dominant_hex: str,
      dominant_hsl: HSLColor,
      palette: HSLColor[],
      temperature: 'warm'|'cool'|'neutral',
      complementary_colors: HSLColor[],
      monochromatic_range: HSLColor[]
    }

WEATHER
  GET  /weather?lat={lat}&lon={lon}
    Response: {
      temp_c: float,
      feels_like_c: float,
      humidity_pct: int,
      wind_kmh: float,
      rain_probability: int,
      description: str,
      recommended_clo: float
    }

WARDROBE SEARCH
  POST /search-wardrobe
    Body: { user_id: str, query: str, limit: int }
    Response: { results: GarmentRef[], scores: float[] }

COMPATIBILITY CHECK
  POST /check-compatibility
    Body: { garment_ids: str[] }
    Response: {
      score: float,              ← 0-100
      color_score: float,
      style_score: float,
      formality_score: float,
      issues: string[],
      suggestions: string[]
    }
```

### 6.3 Local Server Startup (Your Laptop)

```bash
# backend/scripts/start_server.sh
#!/bin/bash

echo "🌶️ Starting Sylvie AI Backend..."

# 1. Start Qdrant vector DB
docker run -d -p 6333:6333 -v ./qdrant_data:/qdrant/storage qdrant/qdrant

# 2. Start Redis (for Celery)
docker run -d -p 6379:6379 redis:7-alpine

# 3. Start Celery worker
cd backend
source venv/bin/activate
celery -A workers.celery_app worker --loglevel=info --concurrency=2 &

# 4. Start FastAPI
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &

# 5. Start Cloudflare tunnel (persistent public URL)
cloudflared tunnel --url http://localhost:8000

echo "✅ Sylvie AI server running!"
echo "📡 Public URL shown above — paste it in mobile app .env"
```

**One-time setup:**
```bash
pip install cloudflared    # or brew install cloudflare/cloudflare/cloudflared
cloudflared tunnel create sylvie-ai   # creates a named tunnel → same URL always
```

---

## 7. AI Pipeline

### 7.1 Garment Analysis Pipeline

```
User Photos Garment
       │
       ▼
┌──────────────────┐
│ 1. Preprocessing  │  Resize to 1024px longest side, EXIF strip, normalize
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Segmentation  │  YOLOv8-seg → bounding box + mask
│    (YOLOv8-seg)  │  fallback: SAM2 for complex/sheer fabrics
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 3. Attribute Extraction          │
│    Florence-2 (fine-tuned)       │  Primary: structured JSON output
│    Qwen2.5-VL (zero-shot)        │  Secondary: validation / cross-check
│                                  │
│  Extracts: category, fit,        │
│  sleeve, neckline, pattern,      │
│  material, formality_hint,       │
│  aesthetic_hints, occasions      │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────┐
│ 4. Color Analysis│  Extract dominant hex → convert to HSL
│    (colorthief)  │  Compute: temperature, complementary, monochromatic
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 5. Ontology Mapping              │
│    Raw AI output → canonical     │
│    fashion ontology schema       │
│    Apply confidence thresholds:  │
│      >0.90 → auto-accept         │
│      0.60–0.90 → show to user    │
│      <0.60 → ask user manually   │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────┐
│ 6. Embedding     │  FashionCLIP → 512-dim vector
│    (FashionCLIP) │  Store in Qdrant with metadata filter
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 7. Persist                       │
│    Save to Supabase (metadata)   │
│    Save to Qdrant (embedding)    │
│    Generate thumbnail            │
│    Notify app via Supabase RT    │
└──────────────────────────────────┘
```

### 7.2 Outfit Generation Pipeline

```
User Request: "What do I wear to college tomorrow?"
         │
         ▼
┌──────────────────────────────────┐
│ 1. Context Parsing               │
│    • Parse occasion from query   │
│    • Fetch weather via API       │
│    • Calculate target CLO        │
│    • Get available garments      │
│      (clean + not excluded)      │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 2. Candidate Retrieval           │
│    Qdrant ANN search per layer:  │
│    - Base layer candidates       │
│    - Mid layer candidates        │
│    - Outer layer candidates      │
│    - Footwear candidates         │
│    Filter by: occasion, season,  │
│    CLO range, user exclusions    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 3. Color Harmony Filter          │
│    HSL-based compatibility:      │
│    • Score each combo 0-100      │
│    • Apply 60-30-10 rule         │
│    • Filter combos < 60 score    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 4. CLO Assembly                  │
│    Verify total CLO matches      │
│    target ± 0.15 tolerance       │
│    Adjust by adding/removing     │
│    layers as needed              │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 5. Claude Reasoning              │
│    Top 3 candidates → Claude     │
│    System: fashion ontology,     │
│    user profile, occasion        │
│    Output: ranked choices +      │
│    styling notes per outfit      │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ 6. Personalization Boost         │
│    • Boost items not worn 14+ d  │
│    • Boost favorites             │
│    • Penalize recently worn      │
│    • Apply user style vector     │
└────────┬─────────────────────────┘
         │
         ▼
              Today's Outfit 🌶️
```

### 7.3 Fashion Ontology — Master Attribute Schema (JSON)

```jsonc
{
  "garment": {
    "identity": {
      "garment_class": "top|bottom|one_piece|outerwear|footwear|accessory|...",
      "category": "tshirt|shirt|jeans|dress|sneaker|watch|...",
      "subcategory": "oversized_tshirt|straight_jeans|...",
      "gender_coding": "masculine|feminine|unisex"
    },
    "physical": {
      "fit": "ultra_slim|slim|fitted|regular|relaxed|loose|oversized|boxy|draped",
      "length_torso": "cropped|waist|hip|mid_thigh|knee|midi|maxi",
      "sleeve": "sleeveless|cap|short|elbow|three_quarter|long",
      "neckline": "crew|v_neck|scoop|boat|square|turtleneck|hooded|mandarin|...",
      "closure": "buttons|zipper|pullover|drawstring|wrap|tie|snap",
      "has_pockets": "true|false",
      "waist_rise": "low|mid|high|ultra_high",
      "silhouette": "straight|tapered|flared|boxy|relaxed|fitted",
      "construction": "tailored|casual|athletic|structured|unstructured"
    },
    "visual": {
      "dominant_color_hex": "#1A237E",
      "dominant_color_name": "navy",
      "dominant_hsl": { "h": 232, "s": 68, "l": 29 },
      "secondary_color_hex": null,
      "accent_color_hex": null,
      "color_temperature": "cool|warm|neutral",
      "color_distribution": "solid|bicolor|multicolor|gradient|color_blocked",
      "pattern": "solid|horizontal_stripe|vertical_stripe|plaid|floral|geometric|...",
      "pattern_scale": "micro|small|medium|large",
      "pattern_density": "sparse|medium|dense",
      "pattern_contrast": "low|medium|high",
      "texture": "smooth|ribbed|knit|rough|fuzzy|crinkled|quilted|...",
      "finish": "matte|gloss|satin|washed|distressed|coated"
    },
    "material": {
      "primary_fiber": "cotton|linen|wool|silk|denim|polyester|leather|...",
      "fabric_construction": "jersey|denim|corduroy|flannel|canvas|mesh|lace|...",
      "weight": "lightweight|medium|heavy",
      "stretch": "none|low|medium|high",
      "opacity": "opaque|semi_sheer|sheer",
      "breathability": "low|medium|high",
      "water_resistant": false,
      "insulation": "none|light|medium|heavy"
    },
    "semantic": {
      "formality_score": 3.5,
      "aesthetic_weights": {
        "streetwear": 0.82, "minimalist": 0.41, "preppy": 0.10
      },
      "occasions": ["college", "casual", "hangout"],
      "seasons": ["summer", "spring"],
      "weather_temp_range_c": [18, 35],
      "cultural_style": "western",
      "layering_role": "base|mid|outer|standalone",
      "outfit_role": "foundation|statement|accent|neutralizer",
      "clo_value": 0.09
    },
    "user": {
      "clean_status": "clean|dirty|washing|drying",
      "is_available": true,
      "favorite": false,
      "never_wear": false,
      "wear_count": 7,
      "last_worn_at": "2026-09-10",
      "user_rating": 4,
      "custom_tags": ["everyday", "comfy"]
    },
    "ai_meta": {
      "confidence": {
        "category": 0.97, "color": 0.99,
        "fit": 0.71, "material": 0.63,
        "formality": 0.58
      },
      "model_version": "florence2-fashion-v1.2",
      "processed_at": "2026-09-24T10:30:00Z",
      "review_required_fields": ["material", "formality"]
    }
  }
}
```

---

## 8. Mobile App — Screen-by-Screen Specification

### 8.1 Splash Screen — Ribbon Reveal

**Duration:** 1800ms total  
**Implementation:** React Native Skia + Reanimated

```
Timeline:
  0ms    → Logo.png hidden, black screen
  100ms  → Two ribbons enter from left/right edges (Chili Red, width: 8px)
  400ms  → Ribbons cross center horizontally, forming an X
  600ms  → Ribbons unfurl vertically — top ribbon shoots UP, bottom DOWN
  800ms  → Logo fades in at center (scale 0.3 → 1.0, spring easing)
  1100ms → "SYLVIE" text drops in letter by letter (stagger 40ms each)
  1400ms → Tagline fades in: "Your wardrobe. Your rules."
  1700ms → Whole screen does a quick scale-out + fade to onboarding
```

```tsx
// components/animations/RibbonReveal.tsx
// Uses react-native-skia for the ribbon path animation
// Ribbon path: starts as horizontal line → transforms to vertical → reveals logo

import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useSharedValue, withTiming, withSpring } from 'react-native-reanimated';

// Ribbon uses a Path interpolation between:
// Stage 1: horizontal line at center y
// Stage 2: vertical split (two separate paths, one going up, one down)
// Each path has strokeWidth: 10, color: chili-500, ends with rounded cap
```

---

### 8.2 Onboarding — Welcome Carousel

**Screens:** 3 slides, swipeable  
**Animations:** Lottie for each feature illustration

```
Slide 1: "Snap your wardrobe"
  Lottie: camera scanning clothes, items appearing as digital cards
  Heading (Playfair Display 38px): "Your clothes, digitized."
  Body: "Photograph everything. Sylvie handles the rest."

Slide 2: "AI that actually dresses you"
  Lottie: AI brain → outfit assembly animation
  Heading: "Smart outfits. Every day."
  Body: "Weather-aware, occasion-perfect, color-harmonious."

Slide 3: "Built around you"
  Lottie: person silhouette being styled
  Heading: "Personalized to your soul."
  Body: "The more you use Sylvie, the more she knows you."

Navigation:
  - Swipe OR dot indicators
  - "Skip" top-right (ghost button)
  - "Next" bottom CTA (Chili filled button with arrow icon)
  - Last slide: "Let's Go →" (triggers survey)
```

**Bottom sheet progress indicator:** 3 pill-shaped dots, active = Chili-500, width animates on active.

---

### 8.3 Onboarding — Fashion Survey

**Goal:** Calibrate fashion knowledge and surface style archetypes.  
**Tone:** Fun, quiz-like. Like a BuzzFeed quiz, not a form.

#### Part A — Knowledge Level (4 Quick Questions)

```
Q1: "When you open your wardrobe in the morning, you..."
    [A] Grab whatever's there — it's fine
    [B] Think about what you're doing today
    [C] Plan a whole visual concept for the day

Q2: "Do you know what 'color temperature' means in fashion?"
    [A] Nope — sounds like a thermostat
    [B] Vaguely — warm vs cool tones?
    [C] Yes — cool undertones vs warm undertones

Q3: "You're going on a first date. You..."
    [A] Wear your cleanest clothes
    [B] Think about the venue and outfit vibe
    [C] Build a full outfit concept around a single statement piece

Q4: "How would you describe your current style?"
    [A] "I don't really have a style"
    [B] "I have a general vibe"
    [C] "I can name 3 specific aesthetic categories I dress in"
```

Scoring: mostly A = beginner, B = intermediate, C = advanced.

#### Part B — Style Discovery Game 🎮

This is the psychological game. The UX goal: make it feel like a slot machine that keeps revealing your style.

**Layout:**
```
┌─────────────────────────────────────┐
│  [🔍 Search a style...]              │  ← search bar (top, always visible)
│                                       │
│  Select styles you vibe with ✨       │
│  Pick 3 or more                       │
│                                       │
│  ┌───────┐ ┌───────┐ ┌───────┐       │
│  │ img   │ │ img   │ │ img   │       │
│  │       │ │       │ │       │       │
│  │Minimal│ │Street │ │Preppy │       │
│  └───────┘ └───────┘ └───────┘       │
│  ┌───────┐ ┌───────┐ ┌───────┐       │
│  │ img   │ │ img   │ │  +5   │       │ ← "more similar to your pick"
│  │       │ │       │ │  more │       │
│  │OldMon │ │Bohemn │ │ ...   │       │
│  └───────┘ └───────┘ └───────┘       │
│                                       │
│  3 selected ✓   [Continue →]          │
└─────────────────────────────────────┘
```

**Style Cards Available (15 initial, expandable to 40+):**

| ID | Style Name | Cover Concept |
|---|---|---|
| minimalist | Minimalist | Clean neutrals, structured silhouettes |
| streetwear | Streetwear | Oversized, graphic tees, sneaker culture |
| old_money | Old Money | Quiet luxury, earth tones, tailored |
| bohemian | Bohemian | Flowy fabrics, earthy tones, layering |
| preppy | Preppy | Polo, chinos, classic American |
| dark_academia | Dark Academia | Plaid, tweed, deep tones, scholarly |
| techwear | Techwear | Functional, modular, dark, utility pockets |
| cottagecore | Cottagecore | Florals, linen, pastoral, soft |
| y2k | Y2K | Low rise, metallics, butterfly clips |
| athleisure | Athleisure | Performance wear as fashion |
| smart_casual | Smart Casual | Office-to-evening transitional |
| avant_garde | Avant-Garde | Experimental, sculptural, unexpected |
| gorpcore | Gorpcore | Outdoor gear as everyday wear |
| indian_ethnic | Indian Ethnic | Kurtas, dupattas, traditional pieces |
| maximalist | Maximalist | Bold prints, layering, accessories |

**Selection animation (per card):**
```
User taps card →
  0ms:   Card scales to 1.08 (spring)
  80ms:  Burst rings emit from card center (4 rings, chili-400, opacity 0→0)
  120ms: Card gets a chili border (2px, animated border-radius pulse)
  160ms: Checkmark icon drops in from top (scale 0→1, spring)
  200ms: 5 similar style cards slide in from bottom in 3D perspective
         (translateY: 200→0, each staggered 60ms)
```

**Search bar behavior:**
- Fuzzy search across all 40+ style names + keywords
- Debounce 200ms
- No results → shows "We don't have that yet — closest match is X"
- Results animate in with stagger fade-up

---

### 8.4 Authentication — Google Sign In

```
Screen layout:
  Top half:   Chili gradient (chili-500 → chili-900)
  Logo:       Sylvie wordmark, Playfair Display
  Center:     "Welcome to Sylvie" subtitle
  Bottom card: Rounded white card that slides up
               - "Continue with Google" button (standard Google branding)
               - Privacy note in small text
               - Terms of service link

After auth:
  If new user → Profile Setup flow
  If returning user → Home tab
  If returning user, profile incomplete → Home tab + completion banner
```

---

### 8.5 Profile Setup Flow

This is a **multi-step wizard** split into 5 screens. Progress shown as a segmented bar at top.

#### Step 1 — Face Scan (`/setup/face-scan`)

```
Purpose: Multi-angle face capture for future virtual try-on color matching
Non-technical framing: "Help Sylvie learn your features"

UI:
  - Camera view occupying 65% of screen
  - Face silhouette overlay (SVG ghost of a head)
  - 4 capture buttons arranged in compass: Front, Left, Right, Back
  - Captured = checkmark badge on each button
  - Lottie animation on first open: face scanning effect

Instructions (not technical):
  ✦ Front: Look straight at the camera, neutral expression
  ✦ Left: Turn your head to the left
  ✦ Right: Turn your head to the right
  ✦ Back: Turn around — we'll capture your hair!

Skip option: "I'll do this later" (face scan is optional for V1)
```

#### Step 2 — Body Photo (`/setup/body-scan`)

```
Purpose: Full-body reference for proportions

UI:
  - Camera view
  - Body silhouette overlay (full-length ghost)
  - Instructions: "Stand 1.5m from camera, arms slightly out"
  - Accept or Retake

Framing: "For the best outfit suggestions, Sylvie needs to see your proportions"
```

#### Step 3 — Skin Tone (`/setup/skin-tone`)

```
Purpose: Color analysis for outfit recommendations

UI:
  - Grid of 40 skin tone swatches (circular, 56px each)
  - Grouped by undertone: Warm / Cool / Neutral / Olive
  - Each swatch has a display name on hover/tap
  - Selected state: swatch scales 1.2x, ring of chili-500 appears
  - Auto-detect button: "Scan from selfie" → uses face photo if taken

Groups:
  Cool tones (12): fair pink → deep blue-black
  Warm tones (14): ivory → dark mahogany
  Neutral tones (8): balanced mix
  Olive tones (6): yellow-green undertone

Special note: Indian skin tones prominently represented across scales I-VI

After selection: Shows complementary outfit color palette for their tone
```

#### Step 4 — Measurements (`/setup/measurements`)

```
Fields: (All optional, but shown with progress incentive)
  Height (cm or ft/in toggle)
  Weight (kg or lbs toggle)
  BMI: auto-calculated, shown as a dial (not judgmental, just data)

  Advanced (tap "More details" to expand):
  Chest / Bust (cm)
  Waist (cm)
  Hips (cm)
  Shoulders (cm)
  Inseam (cm)
  Shoe size (EU/IN/US toggle)

UI Notes:
  - Numeric inputs with +/- stepper for easy mobile entry
  - Height: ruler slider visual
  - Body type selector (6 illustrated silhouettes, tap to select)
  - All fields are hidden by default with a gentle progress bar showing "Profile strength"

Non-technical language:
  "Helps Sylvie suggest the right fits for your body"
  "Your data stays private — only used for your recommendations"
```

#### Step 5 — Style Preferences (`/setup/preferences`)

```
Sections:

1. HAIR COLOR
   - Grid of 20 color swatches (natural + dyed options)
   - Custom: Color picker wheel for unique colors

2. EYE COLOR
   - 12 eye color options with illustrated eye icons

3. FAVORITE COLORS
   - Tap to select up to 6 favorite colors (from broad palette)
   - These get used as outfit accent boosters

4. COLORS YOU AVOID
   - Same palette, tap to flag 0-6 colors to exclude from recommendations

5. OCCASIONS YOU DRESS FOR
   - Multi-select chips: College, Office, Dates, Parties, Gym,
     Festivals, Travel, Weddings, Casual, Religious Events

6. HOW DRESSY DO YOU GO?
   - Horizontal slider: Sweatpants Gang ←→ Always Dressed Up
   - Maps to formality_range in profile

7. PREFERRED FIT VIBE
   - 3 illustrated options: "Fitted", "Regular", "Loose/Oversized"

Final CTA: "Take me to my wardrobe →"
```

---

### 8.6 Home / Dashboard Tab

**The heart of the app. Two states:**

**State A — Profile incomplete:**
```
┌──────────────────────────────────────┐
│  🌶️ SYLVIE        [bell] [avatar]    │
│                                       │
│ ╔═══════════════════════════════╗     │
│ ║  Complete your profile        ║     │
│ ║  [████████░░░░░░░░] 45%        ║     │
│ ║  Add clothes to get started   ║     │
│ ║  [Go to Dashboard →]          ║     │
│ ╚═══════════════════════════════╝     │
│                                       │
│  Hey Vaibhav 👋                       │
│  Your wardrobe is waiting...          │
│                                       │
│  [Add your first garment +]           │
│  Lottie: empty wardrobe animation     │
└──────────────────────────────────────┘
```

**State B — Profile complete:**
```
┌──────────────────────────────────────┐
│  Good morning 🌶️       Tue, Sep 24   │
│  Hey Vaibhav ✨                       │
│                                       │
│  ╔════════════════════════════════╗   │
│  ║  TODAY'S FIT                   ║   │
│  ║                                ║   │
│  ║  ☀️ 28°C · College             ║   │
│  ║                                ║   │
│  ║  [garment stack visual]        ║   │
│  ║                                ║   │
│  ║  94% match · CLO 0.7 · Casual  ║   │
│  ║                                ║   │
│  ║  [✦ Wear This]  [Shuffle ↺]    ║   │
│  ╚════════════════════════════════╝   │
│                                       │
│  WEATHER                              │
│  28°C · Sunny · Delhi NCR             │
│                                       │
│  YOUR WARDROBE                        │
│  [recent 6 garment thumbs in a row]   │
│                                       │
│  ANALYTICS PEEK                       │
│  [3 stat cards: items, CPW, unused]   │
└──────────────────────────────────────┘
```

**Daily Fit Card design:**
- Dark chili gradient background (chili-900 → chili-800)
- Garment items displayed as stacked cards (slight rotation, 3D effect)
- Gold accent for compatibility score
- Haptic feedback on "Wear This" tap
- "Shuffle" triggers outfit engine re-run with Reanimated slide-out + slide-in

---

### 8.7 My Almirah Tab

**Layout: Masonry grid with filter bar**

```
Header:
  "My Almirah"  (68 items)
  [+ Add]  [Search 🔍]  [Filter ≡]

Filter bar (horizontal scroll):
  [All] [Tops] [Bottoms] [Shoes] [Outerwear] [Accessories]
  (chips with garment count badge)

Sort options (bottom sheet):
  • Recently added
  • Most worn
  • Least worn
  • Color (hue sort)
  • Formality (low → high)

Grid:
  2-column masonry
  Each tile:
    - Garment photo (full bleed)
    - Color accent strip (dominant color) at bottom
    - Category label (small, on dark overlay)
    - Worn count badge (top-right, if worn > 5)
    - Favorite heart (top-left, if favorited)

Tile interactions:
  - Tap → opens GarmentDetail
  - Long-press → quick menu (Mark dirty, Remove, Favorite)
  - Swipe right → Mark as worn today

Empty state:
  Lottie: empty wardrobe → floating clothes appearing
  "Your almirah is empty 🌶️
   Time to digitize your wardrobe."
  [+ Add your first item]
```

#### Add Garment Flow

**Multi-step bottom sheet:**

```
Step 1: Choose item type
  Large icon buttons arranged in grid:
  [👕 Clothes]  [👟 Shoes]  [💎 Accessories]  [🧥 Outerwear]

Step 2: Take photos
  FOR CLOTHES:
    Two camera targets: [FRONT] and [BACK]
    "Front: Lay flat or hang the item facing you"
    "Back: Flip it over — we need both sides!"
    Green checkmark per captured photo

  FOR SHOES:
    Two camera targets: [LEFT SIDE] and [RIGHT SIDE]
    "Place shoe on a flat surface with good lighting"

  FOR ACCESSORIES:
    One photo: [FRONT]
    "Lay flat on a plain background"

Step 3: AI Processing screen
  Lottie: AI scan animation (tags floating out of garment photo)
  "Sylvie is reading your garment..."
  Progress steps:
    ✓ Detecting garment type
    ✓ Analyzing colors
    ⟳ Reading fabric & fit...
    ○ Classifying occasions

Step 4: Review & Confirm
  Shows all extracted attributes as editable chips/selectors
  Low-confidence fields are highlighted with amber border
  "Does this look right?" → user taps to confirm or correct
  Fields to review: category, fit, material, colors, occasions

Step 5: Complete
  Lottie: item flies into wardrobe grid
  "Added to your Almirah! ✦"
  [Add another] or [View wardrobe]
```

---

### 8.8 Outfit Generator Tab

```
Header: "What should I wear?"

Context input (primary):
  Large text input card:
  "Tell Sylvie where you're going..."
  Placeholder: "College presentation", "First date 💕", "Gym", "Wedding"

Quick context chips (below input):
  [Today ✦] [Work] [Date] [Party] [Travel] [Gym] [Casual]

Weather card (auto-fetched):
  "Delhi NCR · 28°C ☀️"
  CLO target: 0.7

[Generate My Outfit →] — Chili filled button

Results section:
  Shows top 3 outfit options
  Each outfit card:
    - Garment stack (visual layers)
    - Color palette bar (dominant colors)
    - Harmony type badge ("Analogous · 94%")
    - CLO score badge
    - Formality level
    - Claude's styling note (1 sentence)
  Actions: [✦ Wear This] [💾 Save] [↺ Regenerate]

Shuffle animation between outfits:
  Cards slide left + new cards slide in from right
  Spring animation with slight bounce
```

---

### 8.9 Profile / Settings Tab

```
Profile Header:
  Avatar (from face photo or upload)
  Name, style archetypes (3 chips)
  [Edit Profile]

Sections:
  MY STYLE  → edit style vector, retake survey
  BODY PROFILE → measurements, photos
  PREFERENCES → colors, occasions, formality range
  MY ALMIRAH → stats, unused items, cost-per-wear
  APPEARANCE → skin tone, hair, eye color

Stats card:
  ┌──────────────────────────────┐
  │ WARDROBE STATS               │
  │ 68 items    ₹82,400 value     │
  │ Avg CPW: ₹34  |  Unused: 12  │
  │ Most worn: Black Oversized Tee│
  │ Least used: Green Hoodie (32d)│
  └──────────────────────────────┘

Color distribution chart (donut):
  Black 32%, White 18%, Blue 24%, Other 26%

Settings:
  Notifications (daily outfit push at 7AM)
  Location for weather
  Server URL (AI backend URL from Cloudflare tunnel)
  Logout
```

---

### 8.10 Tab Bar Design

```
4 tabs, no labels — icon only (labels appear on long-press tooltip):

  🏠 Home       (house icon, chili-500 active)
  👔 Almirah    (hanger icon)
  ✨ Outfits    (sparkle/wand icon)
  👤 Profile    (person icon)

Tab bar background: Dark chili (#1F0C0A)
Active icon: Chili-500 with subtle glow (box-shadow radial)
Inactive: dark-muted (#B87E78)
Active indicator: small pill underneath icon (chili-500, 24px wide, 3px tall)

Transition: shared element transition where tab icon scales 1→1.15→1
```

---

## 9. Landing Website Specification

### 9.1 Page Structure

```
/ (root)
  ├── SECTION 1: Hero
  ├── SECTION 2: Features Row
  ├── SECTION 3: How It Works
  ├── SECTION 4: Phone Demo (interactive)
  ├── SECTION 5: Style Survey Preview
  ├── SECTION 6: Testimonials (placeholder with mock cards)
  └── SECTION 7: Download (APK + future Play Store)

/download
  → Full download page with QR code + direct APK link
```

### 9.2 Hero Section

```
Background: Chili radial gradient — dark charcoal center, chili-900 edges
Layout: Split — left text, right 3D phone mockup

Left:
  Eyebrow: "Powered by AI · Built for Fashion" (small uppercase)
  Heading: "Your wardrobe.
            Your rules." (Playfair Display 64px, white)
  Sub: "Sylvie learns your closet, your body, and your life — then dresses you."
  CTA1: [Download APK →] (chili-500 filled, large)
  CTA2: [See it in action ↓] (ghost, gold outline)

Right:
  React Three Fiber phone mockup
    - Floating phone (slow idle bob animation — translateY sin wave)
    - Phone screen shows live-updating outfit cards
    - Ambient chili glow emanates from phone edges
    - Rotating particle orbs in background (Three.js)
    - Phone tilts slightly on mouse move (parallax)

Scroll indicator: Animated chevron + "Scroll to explore" text
```

### 9.3 Features Row

```
6 Feature Cards in 2 rows of 3:
  Each card: dark surface, chili icon, bold heading, 2-line description

  1. 🧥 Full Wardrobe Scan
     "Photograph every item. AI tags them automatically."

  2. 🎨 Color Harmony AI
     "HSL-based algorithms ensure every outfit is visually cohesive."

  3. 🌤️ Weather-Aware Dressing
     "CLO thermal modeling picks the right outfit for any temperature."

  4. 🪞 Body Profile
     "Built around your measurements, skin tone, and proportions."

  5. 🧠 Style Psychology
     "A personality quiz that seeds your AI stylist before day one."

  6. 🌶️ My Almirah
     "Never buy a duplicate. Know every item you own."

Card hover effect:
  - translateY: -8px (smooth, 300ms ease-out)
  - Border glow: chili-500 at 40% opacity
  - Icon scales 1.15x
  - NOT a boring box-shadow lift — use outline + glow, not shadow
```

### 9.4 Phone Demo Section

```
Pinned scroll section (GSAP ScrollTrigger):
  Phone stays fixed in center while content scrolls beside it

Left panel scrolls through 4 feature highlights:
  As user scrolls down, the phone screen changes to show each feature:

  Feature 1 (0% scroll): Ribbon Reveal animation playing
  Feature 2 (33% scroll): Almirah grid with garment cards
  Feature 3 (66% scroll): Outfit generator result card
  Feature 4 (100% scroll): Analytics / wardrobe stats

Each transition: Phone screen fades with a horizontal wipe (chili-500 ribbon)
```

### 9.5 Download Section

```
Background: Chili gradient (chili-950 → chili-800)
Centered layout:

  Heading: "Download Sylvie"
  Subhead: "Currently available as Android APK. iOS coming soon."

  Primary CTA:
  ┌──────────────────────────────────────┐
  │  📱 Download APK (v1.0.0)            │
  │  Android 8.0+  ·  48MB               │
  │  [⬇ Download Now]                    │
  └──────────────────────────────────────┘

  QR Code below button (for easy phone scan)

  Fine print:
  "⚠️ Enable 'Install from unknown sources' in Android settings"
  "Your AI server needs to be running for full features"

  Social links: GitHub, Instagram (for updates)
```

---

## 10. Animation Catalogue

### 10.1 Lottie Files Needed (Source from LottieFiles.com)

| File | Screen | Search Term | License |
|---|---|---|---|
| `welcome-fashion.json` | Onboarding slide 1 | "wardrobe scan", "clothes flying" | Free |
| `ai-brain.json` | Onboarding slide 2 | "AI neural network", "brain pulse" | Free |
| `person-style.json` | Onboarding slide 3 | "person getting dressed", "fashion" | Free |
| `wardrobe-scan.json` | Add garment — AI processing | "scanning", "AI analysis" | Free |
| `outfit-reveal.json` | Outfit generated | "sparkle reveal", "tada" | Free |
| `empty-wardrobe.json` | Almirah empty state | "empty box", "wardrobe" | Free |
| `profile-complete.json` | Profile done | "confetti", "celebration check" | Free |
| `style-burst-*.json` | Survey style selection | "burst", "ripple click" | Free |
| `ai-thinking.json` | Outfit generation loading | "thinking dots", "loading AI" | Free |
| `camera-scan.json` | Camera screens | "scan", "camera" | Free |

**LottieFiles search URL:** `lottiefiles.com/search?q=<term>&license=free`

### 10.2 Custom Reanimated Animations (In-code)

```tsx
// Garment card on hover (mobile: on-press-in)
const GarmentCardAnimation = {
  pressIn: { scale: withSpring(0.96), duration: 100 },
  pressOut: { scale: withSpring(1.0) },
}

// Tab bar icon pulse on active
const TabIconPulse = {
  activate: [
    withSpring(1.15, { damping: 8, stiffness: 180 }),
    withSpring(1.0, { damping: 10 })
  ]
}

// Outfit cards shuffle (Shuffle button)
const OutfitShuffle = {
  exit: withTiming(-400, { duration: 250, easing: Easing.in(Easing.cubic) }),
  enter: withSequence(
    withTiming(400, { duration: 0 }),       // instant to right
    withTiming(0, { duration: 350, easing: Easing.out(Easing.cubic) })
  )
}

// Profile completion ring (ProgressRing component)
// SVG circle with strokeDashoffset animating from full to percentage
const ProfileRing = {
  animate: withTiming(targetOffset, { duration: 1200, easing: Easing.out(Easing.cubic) })
}

// Style card burst (on selection in survey)
// 4 rings expand from center, opacity 0.8→0
const StyleBurst = rings.map((_, i) => ({
  scale: withDelay(i * 60, withTiming(3.5, { duration: 600 })),
  opacity: withDelay(i * 60, withTiming(0, { duration: 600 }))
}))
```

### 10.3 Web-Specific (Framer Motion)

```tsx
// Feature card hover — NOT a boring lift. Chili glow pulse:
const featureCardHover = {
  scale: 1.03,
  boxShadow: "0 0 30px rgba(232, 59, 46, 0.4)",
  borderColor: "rgba(232, 59, 46, 0.6)",
  transition: { type: "spring", damping: 15, stiffness: 200 }
}

// Hero text — letters drop in with stagger (not a fade, a "fall and bounce")
const letterVariants = {
  hidden: { y: -60, opacity: 0 },
  visible: (i) => ({
    y: 0, opacity: 1,
    transition: { delay: i * 0.04, type: "spring", damping: 12 }
  })
}

// Scroll-triggered feature reveal — slide in from alternating sides
const featureReveal = {
  left: { x: -100, opacity: 0 },
  right: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

// GSAP ScrollTrigger — phone demo
// Uses: gsap.to(phoneScreen, { opacity: 0, duration: 0.3 })
// Then: update phone screen content → gsap.to(phoneScreen, { opacity: 1 })
// Triggered: every 25% of scroll progress in pinned section
```

---

## 11. Build & Deployment

### 11.1 EAS Configuration (`eas.json`)

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

**Build commands:**
```bash
# Development APK (debug)
eas build --profile preview --platform android

# Production APK
eas build --profile production --platform android

# APK available at EAS dashboard URL
# Copy to web/public/sylvie.apk for download page
```

### 11.2 Cloudflare Tunnel Setup (One-time)

```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared    # macOS
# OR: winget install Cloudflare.cloudflared        # Windows

# Authenticate
cloudflared tunnel login

# Create named tunnel (permanent URL)
cloudflared tunnel create sylvie-ai
# → Outputs tunnel ID, saves credentials JSON

# Create config file: ~/.cloudflared/config.yml
tunnel: <TUNNEL_ID>
credentials-file: /Users/<you>/.cloudflared/<TUNNEL_ID>.json
ingress:
  - hostname: sylvie-ai.yourdomain.workers.dev
    service: http://localhost:8000
  - service: http_status:404

# Start tunnel
cloudflared tunnel run sylvie-ai

# The URL (e.g. https://sylvie-ai.yourdomain.workers.dev) stays the same
# Put this URL in your mobile app's .env as EXPO_PUBLIC_AI_SERVER_URL
```

### 11.3 Vercel Deployment (Landing Website)

```bash
# From web/ directory
vercel --prod

# Environment variables (set in Vercel dashboard):
NEXT_PUBLIC_APK_URL=https://sylvie-app.vercel.app/sylvie.apk
NEXT_PUBLIC_GA_ID=G-XXXXXXXX

# Auto-deploy: connect GitHub repo to Vercel
# Every push to main → auto-deploys
```

### 11.4 Backend `requirements.txt`

```txt
fastapi==0.115.0
uvicorn[standard]==0.32.0
python-multipart==0.0.17
pydantic==2.9.0
pydantic-settings==2.5.0
pillow==10.4.0
opencv-python==4.10.0.84
colorthief==0.2.1
colormath==3.0.0
ultralytics==8.3.0         # YOLOv8
segment-anything-2==0.1.0  # SAM2
transformers==4.45.0        # Florence-2, Qwen2.5-VL
torch==2.4.1
torchvision==0.19.1
qdrant-client==1.12.0
anthropic==0.40.0
celery==5.4.0
redis==5.1.0
httpx==0.27.0
python-jose==3.3.0         # JWT verification
supabase==2.8.0
numpy==1.26.4
scipy==1.14.0
```

---

## 12. Phased Implementation Roadmap

### Phase 0 — Foundation (Week 1)

```
Goal: Basic skeleton is running end-to-end

[ ] Set up Turborepo monorepo (apps/mobile, apps/web, backend/)
[ ] Configure Expo + Expo Router
[ ] Set up NativeWind with Chili Spice color tokens
[ ] Configure Supabase project (tables, RLS policies, Storage buckets)
[ ] Configure Google OAuth in Supabase
[ ] EAS account setup
[ ] Cloudflare tunnel setup, FastAPI running locally
[ ] Landing page live on Vercel (placeholder content)
[ ] Git repo, CI/CD basics (GitHub Actions)
```

### Phase 1 — Auth + Onboarding (Week 2)

```
Goal: A user can install the APK, go through onboarding, and log in

[ ] Splash screen — Ribbon Reveal animation (React Native Skia)
[ ] Onboarding carousel (3 slides with Lottie animations)
[ ] Fashion survey — Part A (knowledge questions)
[ ] Style picker game — initial 15 cards + selection burst animation
[ ] Style picker — expansion mechanic (5 similar cards on selection)
[ ] Style picker — search bar with fuzzy matching
[ ] Google Sign In screen (Supabase OAuth)
[ ] Auth redirect flow (new user → setup, existing → home)
[ ] Save survey results to Supabase
[ ] First APK build via EAS
```

### Phase 2 — Profile Setup (Week 3)

```
Goal: User can complete their full profile

[ ] Face scan screen (expo-camera, 4 captures)
[ ] Body scan screen
[ ] Skin tone selector (40 swatches, grouped by undertone)
[ ] Measurements form (height, weight, BMI auto-calc, body type)
[ ] Hair & eye color
[ ] Occasion and color preferences
[ ] Profile completion percentage calculation
[ ] Save all profile data to Supabase
[ ] Profile photos upload to Supabase Storage
[ ] Home tab — profile completion banner + redirect
```

### Phase 3 — My Almirah MVP (Week 4-5)

```
Goal: User can add garments and see their wardrobe

[ ] Wardrobe grid (FlashList masonry)
[ ] Filter tabs (by garment class)
[ ] Add garment flow UI (type select → camera → photos)
[ ] Photo capture (front+back for clothes, L+R for shoes)
[ ] Upload photos to Supabase Storage
[ ] Backend: basic garment analysis endpoint (mock AI first)
[ ] FastAPI endpoint: POST /analyze-garment
[ ] YOLOv8 integration (garment detection + segmentation)
[ ] Color extraction (colorthief)
[ ] Store garment metadata in Supabase
[ ] Review & confirm screen (editable attributes)
[ ] Garment detail screen
[ ] Mark as worn action
[ ] Soft delete (remove from almirah)
[ ] Empty state with Lottie animation
```

### Phase 4 — Full AI Pipeline (Week 6-7)

```
Goal: AI tags garments with full ontology attributes

[ ] Florence-2 setup + model download script
[ ] Attribute extraction endpoint (structured JSON output)
[ ] Qwen2.5-VL as fallback/cross-check
[ ] FashionCLIP embedding generation
[ ] Qdrant local instance (Docker) + embedding storage
[ ] Confidence scoring + user review flagging
[ ] Ontology mapping (raw AI → canonical schema)
[ ] Celery async task queue for processing
[ ] Supabase Realtime notification when processing done
[ ] AI metadata stored per garment
```

### Phase 5 — Outfit Generator (Week 8-9)

```
Goal: AI generates complete, weather-aware outfits

[ ] Weather integration (Open-Meteo API)
[ ] CLO value database per garment category
[ ] CLO calculation service
[ ] Color harmony algorithm (HSL-based, 5 harmony types)
[ ] 60-30-10 color rule applier
[ ] Qdrant-based candidate retrieval per occasion/season
[ ] Claude API integration for outfit reasoning
[ ] Personalization boost (wear history, favorites, style vector)
[ ] Outfit generation endpoint
[ ] Outfit generator screen UI
[ ] Outfit card component (garment stack visual)
[ ] Save outfit to history
[ ] Shuffle animation between outfit options
[ ] "Wear This" → logs wear date, updates wear count
```

### Phase 6 — Home Dashboard (Week 10)

```
Goal: Beautiful, data-rich home screen

[ ] Daily outfit recommendation on home screen
[ ] Weather widget (auto-fetched from user location)
[ ] Recent wardrobe items
[ ] Wardrobe stats row (items, CPW, unused count)
[ ] Profile completion banner (if incomplete)
[ ] Push notification setup (daily outfit at 7AM)
[ ] Color distribution analytics (donut chart via Victory Native)
[ ] Analytics tab or section in profile
```

### Phase 7 — Landing Website (Week 11)

```
Goal: Beautiful marketing site with demo + APK download

[ ] Hero section (Three.js phone mockup)
[ ] Feature cards with chili glow hover
[ ] How It Works (3 steps)
[ ] Pinned phone demo (GSAP ScrollTrigger — 4 state transitions)
[ ] Style survey preview section
[ ] Download section (APK link + QR code)
[ ] SEO (meta tags, OG images)
[ ] Responsive (mobile → desktop)
[ ] Deploy to Vercel
```

### Phase 8 — Polish + Release (Week 12)

```
Goal: APK is production-ready and shared

[ ] Error boundaries + offline graceful fallback
[ ] Loading skeletons (not spinners) on every data-loading state
[ ] Haptic feedback audit (every meaningful interaction)
[ ] Deep link: press notification → opens app to outfit
[ ] Performance audit (FlashList, memo, lazy images)
[ ] Production APK build (EAS)
[ ] APK uploaded to web/public/sylvie.apk
[ ] Landing site updated with real APK link + QR
[ ] Cloudflare tunnel in always-on mode (laptop must be running)
[ ] README with "How to run the AI server"
[ ] FASHION_ONTOLOGY.md documentation
```

---

## 13. Environment Variables & Secrets

### Mobile App (`.env` in apps/mobile/)

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
EXPO_PUBLIC_AI_SERVER_URL=https://sylvie-ai.yourdomain.workers.dev
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### Backend (`.env` in backend/)

```bash
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...   # service role key (server-side only)
ANTHROPIC_API_KEY=sk-ant-...
QDRANT_HOST=localhost
QDRANT_PORT=6333
REDIS_URL=redis://localhost:6379/0
OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1

# Model paths
YOLO_MODEL_PATH=./ml/models/yolov8x-seg.pt
FLORENCE2_MODEL_PATH=./ml/models/florence2-fashion
FASHION_CLIP_PATH=./ml/models/fashion-clip

# Processing
MAX_IMAGE_SIZE_MB=10
INFERENCE_TIMEOUT_SEC=60
```

### Web (Vercel environment variables)

```bash
NEXT_PUBLIC_APK_URL=https://sylvie-app.vercel.app/sylvie.apk
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
NEXT_PUBLIC_APP_STORE_URL=   # future
```

---

## 14. Performance & Quality Checklist

### Mobile App

```
RENDERING
[ ] FlashList (NOT FlatList) for all scrollable lists
[ ] expo-image with blurhash placeholders on all garment photos
[ ] React.memo on GarmentCard, OutfitCard, StyleCard
[ ] useCallback on all event handlers in lists
[ ] useMemo on heavy computations (color analysis display)
[ ] InteractionManager for heavy tasks after animation completes

IMAGES
[ ] Supabase Storage transform API for thumbnails (256x256)
[ ] Webp format for all stored images
[ ] Lazy loading below fold in grids

ANIMATIONS
[ ] All Reanimated on UI thread (never JS thread)
[ ] Cancel animations on unmount
[ ] Reduced motion: check AccessibilityInfo.isReduceMotionEnabled
[ ] Lottie: pause when screen not visible (useFocusEffect)

BUNDLE
[ ] Lazy-load heavy screens (outfit generator)
[ ] Code splitting via Expo Router dynamic imports
[ ] Remove unused icon sets from @expo/vector-icons

OFFLINE
[ ] Zustand persist (wardrobe, profile) via AsyncStorage
[ ] Queue garment additions when offline, sync on reconnect
[ ] Graceful error states: "AI server unreachable — using cached recommendations"
```

### Backend

```
[ ] Redis caching: garment analysis results (7 days TTL)
[ ] Redis caching: weather data (15 min TTL)
[ ] Celery for all ML inference (never block HTTP response)
[ ] Qdrant filtered search: always filter by user_id
[ ] Connection pooling for Supabase calls
[ ] Request timeout: 30s for all inference endpoints
[ ] GPU memory: unload models if idle > 30min (reload on request)
[ ] Health check endpoint: verifies all models loaded
[ ] Graceful shutdown: drain Celery queue before stopping
```

### Code Quality

```
[ ] TypeScript strict mode (no 'any')
[ ] ESLint + Prettier with pre-commit hook (husky)
[ ] Zod validation on all API response shapes
[ ] Error boundaries on all tab root screens
[ ] Centralized error logging (use console.warn in dev, track in prod)
[ ] All user-facing text in constants file (i18n-ready)
[ ] All network requests via TanStack Query (no raw fetch in components)
```

---

## Appendix A — Style Type Metadata

Full style expansion map — which 5 styles to show when another is selected:

| Selected | Show Next 5 |
|---|---|
| minimalist | old_money, normcore, quiet_luxury, preppy, smart_casual |
| streetwear | techwear, gorpcore, y2k, athleisure, avant_garde |
| old_money | quiet_luxury, preppy, dark_academia, minimalist, smart_casual |
| bohemian | cottagecore, vintage, maximalist, indie, aesthetic_tumblr |
| preppy | smart_casual, old_money, light_academia, classic, country |
| dark_academia | light_academia, gothic, vintage, grunge, old_money |
| techwear | gorpcore, streetwear, cyberpunk, military, utility |
| cottagecore | bohemian, vintage, aesthetic_tumblr, romantic, indie |
| y2k | party_girl, 90s_grunge, emo, pop_punk, aesthetic |
| athleisure | sporty, streetwear, normcore, casual_cool, gym_wear |
| indian_ethnic | festive_indian, fusion, traditional, bridal, indo_western |

---

## Appendix B — CLO Reference Values

| Garment | Estimated CLO |
|---|---|
| Underwear/briefs | 0.03 |
| Bra | 0.01 |
| T-shirt (short sleeve) | 0.08 |
| T-shirt (long sleeve) | 0.20 |
| Formal shirt | 0.25 |
| Light knit sweater | 0.26 |
| Heavy sweater | 0.36 |
| Light jeans | 0.20 |
| Heavy denim jeans | 0.28 |
| Formal trousers | 0.25 |
| Shorts | 0.08 |
| Light jacket | 0.25 |
| Denim jacket | 0.30 |
| Blazer | 0.35 |
| Hoodie | 0.34 |
| Wool coat | 0.55 |
| Down jacket | 0.60 |
| Parka | 0.70 |
| Socks | 0.02 |
| Shoes/sneakers | 0.04 |
| Boots | 0.06 |
| Cap/hat | 0.02 |

**Target CLO by temperature:**
| Temp (°C) | Target CLO |
|---|---|
| > 35 | 0.3 |
| 28-35 | 0.5 |
| 22-28 | 0.7 |
| 15-22 | 1.0 |
| 8-15 | 1.5 |
| 0-8 | 2.0 |
| < 0 | 2.5+ |

---

## Appendix C — Skin Tone Reference (First 12)

| Code | Name | Hex | Fitzpatrick | Undertone |
|---|---|---|---|---|
| ST01 | Porcelain Ivory | #F9EFE5 | I | Cool |
| ST02 | Warm Ivory | #F5E4D0 | I | Warm |
| ST03 | Fair Beige | #F0D5B8 | II | Neutral |
| ST04 | Light Golden | #E8C49A | II | Warm |
| ST05 | Warm Sand | #D4A574 | III | Warm |
| ST06 | Golden Olive | #C8965C | III | Olive |
| ST07 | Medium Tan | #B87D45 | IV | Warm |
| ST08 | Caramel | #A06530 | IV | Warm |
| ST09 | Deep Olive | #8B5A2B | V | Olive |
| ST10 | Chestnut | #7A4520 | V | Warm |
| ST11 | Deep Mahogany | #5C2E0A | VI | Cool |
| ST12 | Ebony | #3B1A08 | VI | Cool |

*(Full table of 40 skin tones in the Supabase seed file)*

---

*— End of Sylvie Implementation Plan v1.0 —*

> 🌶️ Built for style. Powered by intelligence. Named Sylvie.