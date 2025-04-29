from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import events, auth
from .config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ubatuba Events API",
    description="API para o aplicativo Ubatuba Events Tracker",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)

@app.get("/")
def read_root():
    return {
        "message": "Bem-vindo à API Ubatuba Events",
        "docs": "/docs",
        "redoc": "/redoc"
    }