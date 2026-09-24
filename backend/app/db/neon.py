import asyncpg
import logging
from typing import Optional
from app.config import settings

logger = logging.getLogger(__name__)

class NeonDatabase:
    """Neon Serverless PostgreSQL connection manager."""

    def __init__(self):
        self._pool: Optional[asyncpg.Pool] = None

    async def connect(self):
        """Initialize connection pool to Neon PostgreSQL."""
        if not settings.DATABASE_URL:
            logger.warning("DATABASE_URL is not set. Running in memory-only fallback mode.")
            return

        try:
            # Handle sslmode in asyncpg by passing ssl='require' if sslmode=require
            db_url = settings.DATABASE_URL
            ssl_param = 'require' if 'sslmode=require' in db_url else None
            clean_url = db_url.split('?')[0]

            self._pool = await asyncpg.create_pool(
                dsn=clean_url,
                ssl=ssl_param,
                min_size=1,
                max_size=10,
                command_timeout=60,
            )
            logger.info("Connected to Neon PostgreSQL (%s branch: %s)", settings.NEON_PROJECT_ID, settings.NEON_BRANCH)
        except Exception as e:
            logger.error("Failed to connect to Neon PostgreSQL: %s", e)
            self._pool = None

    async def disconnect(self):
        """Close connection pool."""
        if self._pool:
            await self._pool.close()
            logger.info("Disconnected from Neon PostgreSQL")

    async def fetch(self, query: str, *args):
        """Execute a query and fetch all rows."""
        if not self._pool:
            return []
        async with self._pool.acquire() as conn:
            return await conn.fetch(query, *args)

    async def fetchrow(self, query: str, *args):
        """Execute a query and fetch a single row."""
        if not self._pool:
            return None
        async with self._pool.acquire() as conn:
            return await conn.fetchrow(query, *args)

    async def execute(self, query: str, *args):
        """Execute an insert/update/delete statement."""
        if not self._pool:
            return "NO_CONNECTION"
        async with self._pool.acquire() as conn:
            return await conn.execute(query, *args)

neon_db = NeonDatabase()
