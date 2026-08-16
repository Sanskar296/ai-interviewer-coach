from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Resume Models
class ResumeScanRequest(BaseModel):
    resume_text: str = Field(..., description="Raw text or parsed content of the resume")
    target_role: Optional[str] = "Full Stack Engineer"
    experience_level: Optional[str] = "Mid-Level"

class SectionScore(BaseModel):
    name: str
    score: int
    feedback: str
    passed: bool

class ResumeScanResponse(BaseModel):
    ats_score: int
    match_percentage: int
    formatting_score: int
    sections: List[SectionScore]
    found_keywords: List[str]
    missing_keywords: List[str]
    action_verbs_used: List[str]
    suggestions: List[str]
    strengths: List[str]

# Interview Arena Models
class InterviewStartRequest(BaseModel):
    role: str = "Senior Frontend Engineer"
    category: str = "Behavioral & Technical"
    difficulty: str = "Medium" # Easy, Medium, Hard
    question_count: int = 3

class QuestionItem(BaseModel):
    id: str
    question: str
    category: str
    hints: List[str]
    ideal_talking_points: List[str]

class InterviewSession(BaseModel):
    session_id: str
    role: str
    category: str
    questions: List[QuestionItem]
    created_at: str

class AnswerSubmitRequest(BaseModel):
    session_id: str
    question_id: str
    answer_text: str
    audio_duration_seconds: Optional[float] = 0

class AnswerFeedbackResponse(BaseModel):
    question_id: str
    clarity_score: int
    relevance_score: int
    star_framework_score: int
    overall_score: int
    key_strengths: List[str]
    areas_for_improvement: List[str]
    improved_sample_answer: str
    pacing_wpm: int
    sentiment: str

# Company Prep Models
class CompanyQuestion(BaseModel):
    id: str
    company: str
    role: str
    category: str
    question: str
    difficulty: str
    frequency: str
    sample_answer: str
    recruiter_tips: List[str]

class CompanyListResponse(BaseModel):
    companies: List[Dict[str, Any]]

# Progress & Dashboard Models
class ProgressMetric(BaseModel):
    label: str
    value: str
    change: str
    trending: str # up, down, neutral

class SkillRadar(BaseModel):
    skill: str
    score: int

class SessionHistory(BaseModel):
    id: str
    title: str
    date: str
    score: int
    category: str

class ProgressDashboardResponse(BaseModel):
    metrics: List[ProgressMetric]
    skills: List[SkillRadar]
    recent_sessions: List[SessionHistory]
    recommended_focus: List[str]
