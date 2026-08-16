from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from api.resume import router as resume_router
from api.interview import router as interview_router
from api.company import router as company_router
from api.progress import router as progress_router

app = FastAPI(
    title="AI Interviewer Coach API",
    description="Backend API for the AI Interviewer Coach Platform",
    version="1.0.0"
)

# Set up CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(resume_router, prefix="/api")
app.include_router(interview_router, prefix="/api")
app.include_router(company_router, prefix="/api")
app.include_router(progress_router, prefix="/api")

class HealthResponse(BaseModel):
    status: str
    version: str

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "ok", "version": "1.0.0"}
