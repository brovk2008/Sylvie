# 🚀 SYLVIE — Complete Production Deployment Guide

This guide explains how to deploy the entire **Sylvie** stack: the **Next.js Marketing Website**, the **FastAPI AI Backend**, and the **Neon Serverless PostgreSQL Database**.

---

## 1. Architecture Overview & Where to Deploy

| Layer | Component | Recommended Host | Why |
|---|---|---|---|
| **Marketing Website** | `apps/web` (Next.js 14) | **Vercel** | Native Next.js App Router optimization, edge caching, zero-config SSR, instant global CDN, automatic image optimization. |
| **Database** | Neon Serverless PostgreSQL | **Neon Cloud** (`misty-feather-22730419`) | Serverless autoscaling, scale-to-zero, instant branching, connection pooling, and object storage. |
| **AI Backend** | `backend` (FastAPI + ML) | **Render / Railway / Fly.io** | Persistent Python process, no serverless timeouts, support for NumPy/Pillow image processing and persistent asyncpg connection pools. |
| **Mobile App** | `apps/mobile` (Expo SDK 52) | **EAS Build / Local APK** | Built Android `.apk` is hosted in `apps/web/public/sylvie.apk` for direct marketing website download. |

> **Q: Should I deploy both Frontend and Backend on Vercel?**
>
> **Deploy Frontend on Vercel, and Backend on Render/Railway.**
> - Vercel is built for frontend and Node/Edge serverless functions.
> - While Vercel supports Python serverless functions, the Sylvie backend uses Python with heavy image processing libraries (Pillow, NumPy), ML vectors, and persistent connection pools. Running Python FastAPI on Vercel serverless causes 5-10 second cold starts and execution timeouts.
> - Deploying `apps/web` on Vercel and `backend` on Render/Railway gives you the best speed, reliability, and zero cold starts.

---

## 2. Deploying Frontend to Vercel

### Step 1: Connect GitHub Repository
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New…** -> **Project**.
3. Import your repository: `https://github.com/brovk2008/Sylvie`.

### Step 2: Configure Project Settings
- **Framework Preset**: `Next.js`
- **Root Directory**: Click `Edit` and select `apps/web`.
- **Build Command**: `next build` (Default)
- **Output Directory**: `.next` (Default)
- **Install Command**: `npm install` (Default)

### Step 3: Set Environment Variables in Vercel
Add the following in the Vercel Environment Variables section:

| Variable | Value | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production marketing URL |
| `NEXT_PUBLIC_API_URL` | `https://sylvie-api.onrender.com` | Production FastAPI backend URL |
| `NEXT_PUBLIC_APK_URL` | `/sylvie.apk` | Path to Android APK |
| `NEXT_PUBLIC_NEON_PROJECT_ID` | `misty-feather-22730419` | Neon project ID |
| `NEXT_PUBLIC_NEON_BRANCH` | `production` | Neon production branch |

Click **Deploy**! Vercel will build and deploy the marketing site with full scroll animations and SSL.

---

## 3. Deploying Neon Database Schema & Seed Data

The complete database schema and 40-swatch skin tone seed data are located in `neon/schema.sql` and `neon/seed.sql`.

### Option A: Using Neon Console (Browser)
1. Go to the [Neon Console](https://console.neon.tech).
2. Select project **`misty-feather-22730419`** and branch **`production`**.
3. Open the **SQL Editor** tab in the sidebar.
4. Copy and run the contents of [neon/schema.sql](file:///c:/Users/techp/Downloads/more%20projects/clothes%20suggestions/neon/schema.sql).
5. Copy and run the contents of [neon/seed.sql](file:///c:/Users/techp/Downloads/more%20projects/clothes%20suggestions/neon/seed.sql).

### Option B: Using psql / Neon CLI
```bash
# Get your connection string:
neon connection-string production

# Run schema and seed:
psql "<YOUR_NEON_CONNECTION_STRING>" -f neon/schema.sql
psql "<YOUR_NEON_CONNECTION_STRING>" -f neon/seed.sql
```

---

## 4. Deploying Backend to Render / Railway

### Render (Recommended - Free/Low Cost)
1. Log in to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository: `https://github.com/brovk2008/Sylvie`.
4. Configure the service:
   - **Name**: `sylvie-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string (`postgresql://neondb_owner:...@ep-misty-feather-22730419.us-east-2.aws.neon.tech/neondb?sslmode=require`)
   - `NEON_PROJECT_ID`: `misty-feather-22730419`
   - `NEON_BRANCH`: `production`
   - `DEBUG`: `False`
   - `ANTHROPIC_API_KEY`: (Optional) Your Claude API key
6. Click **Create Web Service**.

Alternatively, Render will automatically detect the [render.yaml](file:///c:/Users/techp/Downloads/more%20projects/clothes%20suggestions/render.yaml) file if using a Blueprint!

---

## 5. Hosting the Android APK on the Website

1. Build the release APK from `apps/mobile`:
   ```bash
   cd apps/mobile
   npx eas-cli build -p android --profile preview
   ```
2. Download the resulting `.apk` file and save it to:
   ```
   apps/web/public/sylvie.apk
   ```
3. Commit and push:
   ```bash
   git add apps/web/public/sylvie.apk
   git commit -m "chore: add release APK for direct web download"
   git push origin main
   ```
4. Vercel will automatically redeploy, and visitors clicking "Download Android APK" on your marketing website will directly download the app!
