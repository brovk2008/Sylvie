import os
import sys
import asyncio
from pathlib import Path
from dotenv import load_dotenv

# Load .env
load_dotenv(Path(__file__).parent.parent / ".env")

async def run_migrations():
    import asyncpg

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL not found in .env")
        sys.exit(1)

    clean_url = db_url.split("?")[0]
    print(f"Connecting to Neon PostgreSQL...")

    try:
        conn = await asyncpg.connect(clean_url, ssl="require", timeout=30)
        print("Connected successfully!")

        # 1. Run schema.sql
        schema_path = Path(__file__).parent / "schema.sql"
        if schema_path.exists():
            print(f"Applying {schema_path.name}...")
            schema_sql = schema_path.read_text(encoding="utf-8")
            await conn.execute(schema_sql)
            print("schema.sql applied successfully!")

        # 2. Run seed.sql
        seed_path = Path(__file__).parent / "seed.sql"
        if seed_path.exists():
            print(f"Applying {seed_path.name}...")
            seed_sql = seed_path.read_text(encoding="utf-8")
            await conn.execute(seed_sql)
            print("seed.sql applied successfully!")

        # Verify tables created
        tables = await conn.fetch("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        """)
        table_names = [r["table_name"] for r in tables]
        print(f"Verified {len(table_names)} tables in public schema: {', '.join(table_names)}")

        # Verify skin tone count
        count = await conn.fetchval("SELECT count(*) FROM skin_tones;")
        print(f"Verified {count} skin tones in database.")

        await conn.close()
        print("Migration complete!")
    except Exception as e:
        print(f"Migration error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(run_migrations())
