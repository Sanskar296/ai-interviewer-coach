import uuid
from datetime import datetime
from typing import Dict, Any, List
from models.schemas import (
    InterviewStartRequest,
    InterviewSession,
    QuestionItem,
    AnswerSubmitRequest,
    AnswerFeedbackResponse
)

QUESTION_BANK = {
    "Behavioral & Technical": [
        QuestionItem(
            id="q1",
            question="Tell me about a complex technical challenge you faced recently and how you resolved it.",
            category="Problem Solving",
            hints=["Focus on the technical problem context", "Explain choices and trade-offs made", "Mention measurable results"],
            ideal_talking_points=["STAR framework", "Architecture trade-offs", "Team collaboration", "Post-mortem / Lessons learned"]
        ),
        QuestionItem(
            id="q2",
            question="How do you handle disagreements with team members or stakeholders regarding technical architecture?",
            category="Communication",
            hints=["Emphasize active listening", "Focus on data and proof of concept", "Prioritize project goals over ego"],
            ideal_talking_points=["Objective evaluation", "Prototyping solutions", "Consensus building", "Documenting decisions"]
        ),
        QuestionItem(
            id="q3",
            question="Describe a situation where a project was falling behind deadline. What steps did you take?",
            category="Leadership & Ownership",
            hints=["Highlight prioritization", "Scope reduction or workload distribution", "Transparent communication"],
            ideal_talking_points=["Risk mitigation", "Stakeholder management", "Focus on MVP features"]
        )
    ],
    "System Design": [
        QuestionItem(
            id="sd1",
            question="How would you design a scalable real-time notification system for millions of concurrent users?",
            category="System Design",
            hints=["Mention WebSockets/Server-Sent Events", "Message queues like Kafka/RabbitMQ", "Caching layer and Redis Pub/Sub"],
            ideal_talking_points=["Latency requirements", "Decoupled workers", "Database selection & indexing", "Fault tolerance"]
        ),
        QuestionItem(
            id="sd2",
            question="Design a URL shortener service like Bitly with analytics tracking.",
            category="System Design",
            hints=["Hashing algorithms (Base62)", "Database schema for short code mapping", "Caching strategy for high read throughput"],
            ideal_talking_points=["Read heavy vs Write heavy balance", "Rate limiting", "Analytics pipeline"]
        )
    ],
    "Coding & Algorithms": [
        QuestionItem(
            id="code1",
            question="Explain how you would optimize a web application experiencing slow initial load times and high bundle size.",
            category="Frontend Optimization",
            hints=["Code splitting and lazy loading", "Image optimization", "Asset CDN caching", "Tree shaking"],
            ideal_talking_points=["Lighthouse metrics", "SSR / SSG vs CSR", "Dynamic imports", "Network waterfall analysis"]
        ),
        QuestionItem(
            id="code2",
            question="How do you design REST API endpoints to handle pagination, filtering, and rate limiting securely?",
            category="API Design",
            hints=["Cursor-based vs offset pagination", "HTTP status codes and error payloads", "Token bucket / Leaky bucket rate limiting"],
            ideal_talking_points=["Idempotency", "JSON API standards", "Security headers & CORS"]
        )
    ]
}

def create_interview_session(req: InterviewStartRequest) -> InterviewSession:
    category = req.category if req.category in QUESTION_BANK else "Behavioral & Technical"
    available_questions = QUESTION_BANK.get(category, QUESTION_BANK["Behavioral & Technical"])
    
    # Return requested number of questions
    selected_questions = available_questions[:min(req.question_count, len(available_questions))]
    
    return InterviewSession(
        session_id=str(uuid.uuid4()),
        role=req.role,
        category=req.category,
        questions=selected_questions,
        created_at=datetime.utcnow().isoformat()
    )

def evaluate_answer(req: AnswerSubmitRequest) -> AnswerFeedbackResponse:
    ans = req.answer_text.strip()
    words = ans.split()
    word_count = len(words)
    
    # Evaluate length and depth
    if word_count < 20:
        clarity = 55
        relevance = 60
        star_score = 50
        overall = 55
        feedback_improvement = ["Your response was very concise. Elaborate more on the background (Situation), action taken, and final outcome."]
        feedback_strengths = ["Gets straight to the point."]
        sample_answer = "When faced with this challenge, I first analyzed the bottleneck by setting up APM metrics. I identified that database queries were unindexed, leading to slow response times. I created composite indexes and implemented Redis caching, reducing API latency by 70%."
    elif word_count < 80:
        clarity = 82
        relevance = 85
        star_score = 78
        overall = 82
        feedback_improvement = ["Include specific quantitative metrics or results achieved (e.g. % performance increase, time saved)."]
        feedback_strengths = ["Clear explanation of technical steps.", "Good structure and easy to follow."]
        sample_answer = ans + " As a result of these changes, system uptime improved to 99.99% and response times dropped by 60ms across all endpoints."
    else:
        clarity = 92
        relevance = 90
        star_score = 92
        overall = 91
        feedback_improvement = ["Maintain concise pauses between major points to keep the interviewer engaged."]
        feedback_strengths = ["Excellent use of the STAR technique (Situation, Task, Action, Result).", "Detailed breakdown of technical trade-offs.", "Strong confidence and delivery."]
        sample_answer = ans

    # Pacing estimation based on audio duration or word count
    duration = req.audio_duration_seconds if req.audio_duration_seconds and req.audio_duration_seconds > 0 else (word_count / 2.3)
    pacing_wpm = int((word_count / max(duration, 5.0)) * 60) if duration > 0 else 135
    pacing_wpm = min(max(pacing_wpm, 90), 180)

    return AnswerFeedbackResponse(
        question_id=req.question_id,
        clarity_score=clarity,
        relevance_score=relevance,
        star_framework_score=star_score,
        overall_score=overall,
        key_strengths=feedback_strengths,
        areas_for_improvement=feedback_improvement,
        improved_sample_answer=sample_answer,
        pacing_wpm=pacing_wpm,
        sentiment="Confident & Technical"
    )
