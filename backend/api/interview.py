from fastapi import APIRouter, HTTPException
from models.schemas import (
    InterviewStartRequest,
    InterviewSession,
    AnswerSubmitRequest,
    AnswerFeedbackResponse
)
from services.interview_service import create_interview_session, evaluate_answer

router = APIRouter(prefix="/interview", tags=["Interview Arena"])

@router.post("/start", response_model=InterviewSession)
def start_interview_session(req: InterviewStartRequest):
    try:
        return create_interview_session(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initializing interview session: {str(e)}")

@router.post("/answer", response_model=AnswerFeedbackResponse)
def submit_interview_answer(req: AnswerSubmitRequest):
    try:
        return evaluate_answer(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating interview answer: {str(e)}")
