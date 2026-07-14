from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.entities.analysis import Analysis
from app.entities.user import User

from app.core.config import settings
from app.api import auth, analyze

app = FastAPI(
    title=settings.PROJECT_NAME
)

# ================================
# CREATE DATABASE TABLES
# ================================
Base.metadata.create_all(bind=engine)

# Allow React frontend to communicate with FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://echoproof-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
def root():
    return {
        "message": "EchoProof Backend Running 🚀"
    }

# Register API routes
app.include_router(
    auth.router,
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["Authentication"]
)

app.include_router(
    analyze.router,
    prefix=f"{settings.API_V1_STR}/analyze",
    tags=["Analysis"]
)