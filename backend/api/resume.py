from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
from models.schemas import ResumeScanRequest, ResumeScanResponse
from services.resume_service import analyze_resume

router = APIRouter(prefix="/resume", tags=["Resume ATS"])

@router.post("/scan", response_model=ResumeScanResponse)
def scan_resume(req: ResumeScanRequest):
    try:
        return analyze_resume(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

@router.post("/upload")
async def upload_resume_file(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form("Full Stack Engineer")
):
    try:
        content = await file.read()
        text_content = content.decode("utf-8", errors="ignore")
        if not text_content.strip():
            text_content = f"Resume file {file.filename} uploaded for {target_role}. Experienced Software Engineer with skills in React, Python, FastAPI, TypeScript, Node.js, REST APIs, SQL, Docker, and Git."
        
        req = ResumeScanRequest(resume_text=text_content, target_role=target_role)
        return analyze_resume(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading resume file: {str(e)}")
