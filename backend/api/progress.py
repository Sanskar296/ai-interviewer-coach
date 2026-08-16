from fastapi import APIRouter
from models.schemas import ProgressDashboardResponse
from services.progress_service import get_progress_dashboard

router = APIRouter(prefix="/progress", tags=["Progress & Analytics"])

@router.get("/dashboard", response_model=ProgressDashboardResponse)
def get_dashboard_data():
    return get_progress_dashboard()
