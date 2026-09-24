from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import health, color, weather, garment, outfit

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Sylvie AI — Intelligent Wardrobe & Outfit Recommendation Engine"
)

# Enable CORS for Mobile and Web
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(health.router)
app.include_router(color.router)
app.include_router(weather.router)
app.include_router(garment.router)
app.include_router(outfit.router)

@app.get("/")
async def root():
    return {
        "message": "🌶️ Welcome to Sylvie AI Engine",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "operational"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
