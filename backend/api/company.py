from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any
from models.schemas import CompanyQuestion
from services.company_service import get_companies, get_company_questions

router = APIRouter(prefix="/company", tags=["Company Prep"])

@router.get("/companies", response_model=List[Dict[str, Any]])
def list_companies():
    return get_companies()

@router.get("/questions", response_model=List[CompanyQuestion])
def list_company_questions(
    company: Optional[str] = Query(None, description="Filter by company ID like google, meta, amazon"),
    category: Optional[str] = Query(None, description="Filter by category like System Design, Leadership Principles")
):
    return get_company_questions(company_id=company, category=category)
