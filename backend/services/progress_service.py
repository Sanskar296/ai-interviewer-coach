from typing import List
from models.schemas import (
    ProgressDashboardResponse,
    ProgressMetric,
    SkillRadar,
    SessionHistory
)

def get_progress_dashboard() -> ProgressDashboardResponse:
    metrics = [
        ProgressMetric(label="Mock Interviews Completed", value="14", change="+3 this week", trending="up"),
        ProgressMetric(label="Average Readiness Score", value="87%", change="+5% vs last month", trending="up"),
        ProgressMetric(label="ATS Resume Score", value="92/100", change="+14 points optimized", trending="up"),
        ProgressMetric(label="Total Practice Time", value="6.4 hrs", change="+1.2 hrs this week", trending="up")
    ]

    skills = [
        SkillRadar(skill="Technical Depth", score=88),
        SkillRadar(skill="System Architecture", score=82),
        SkillRadar(skill="STAR Delivery", score=90),
        SkillRadar(skill="Clarity & Pacing", score=85),
        SkillRadar(skill="Confidence & Demeanor", score=94)
    ]

    recent_sessions = [
        SessionHistory(id="s-101", title="Meta Frontend System Design", date="Yesterday, 4:30 PM", score=89, category="System Design"),
        SessionHistory(id="s-102", title="Amazon Behavioral & Leadership", date="Aug 8, 2026", score=92, category="Behavioral"),
        SessionHistory(id="s-103", title="Google Algorithmic Optimization", date="Aug 6, 2026", score=84, category="Coding"),
        SessionHistory(id="s-104", title="Resume Scan - Staff Engineer", date="Aug 4, 2026", score=94, category="Resume ATS")
    ]

    recommended_focus = [
        "Practice quantitative metrics in your Amazon Leadership STAR answers (e.g. % throughput gain).",
        "Review Operational Transformation vs CRDTs for collaborative Google System Design questions.",
        "Maintain optimal pacing between 130-150 words per minute during live video recordings."
    ]

    return ProgressDashboardResponse(
        metrics=metrics,
        skills=skills,
        recent_sessions=recent_sessions,
        recommended_focus=recommended_focus
    )
