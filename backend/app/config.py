import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Sylvie AI Backend"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # Neon PostgreSQL (Production branch)
    NEON_PROJECT_ID: str = os.getenv("NEON_PROJECT_ID", "misty-feather-22730419")
    NEON_BRANCH: str = os.getenv("NEON_BRANCH", "production")
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        os.getenv(
            "NEON_DATABASE_URL",
            "postgresql://neondb_owner:password@ep-misty-feather-22730419.us-east-2.aws.neon.tech/neondb?sslmode=require"
        )
    )

    # AI & Services
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    QDRANT_HOST: str = os.getenv("QDRANT_HOST", "localhost")
    QDRANT_PORT: int = int(os.getenv("QDRANT_PORT", "6333"))
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # Open-Meteo
    OPEN_METEO_BASE_URL: str = "https://api.open-meteo.com/v1"

    # Image constraints
    MAX_IMAGE_SIZE_MB: int = 10
    INFERENCE_TIMEOUT_SEC: int = 60

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
