import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://ubatuba:ubatuba_pass@db:5432/ubatuba_events")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "j8a9t2wuBRn7Vds3Kp5hXqYzFcM4eG6L")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    CORS_ORIGINS: list = ["*"] 

settings = Settings()