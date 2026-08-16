import re
from typing import Dict, Any, List
from models.schemas import ResumeScanRequest, ResumeScanResponse, SectionScore

# Keyword lists for ATS checking based on target role
ROLE_KEYWORDS = {
    "Full Stack Engineer": ["React", "Node.js", "TypeScript", "Python", "REST API", "GraphQL", "PostgreSQL", "Docker", "Git", "CI/CD", "AWS", "Tailwind"],
    "Frontend Engineer": ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "State Management", "Web Performance", "Jest", "Responsive Design"],
    "Backend Engineer": ["Python", "FastAPI", "Django", "PostgreSQL", "Redis", "Microservices", "Docker", "Kubernetes", "gRPC", "SQL", "System Design"],
    "DevOps / Cloud": ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "Linux", "Bash", "Security"],
    "Data Engineer": ["Python", "Spark", "SQL", "Airflow", "Kafka", "Data Modeling", "ETL", "Snowflake", "BigQuery", "Pandas", "AWS S3"]
}

ACTION_VERBS = [
    "led", "developed", "architected", "optimized", "spearheaded", "implemented",
    "engineered", "streamlined", "increased", "decreased", "reduced", "designed",
    "scaled", "collaborated", "managed", "delivered", "orchestrated", "automated"
]

def analyze_resume(req: ResumeScanRequest) -> ResumeScanResponse:
    text = req.resume_text.strip()
    text_lower = text.lower()
    role = req.target_role or "Full Stack Engineer"
    
    target_keywords = ROLE_KEYWORDS.get(role, ROLE_KEYWORDS["Full Stack Engineer"])
    
    # Check present keywords
    found_keywords = [kw for kw in target_keywords if kw.lower() in text_lower]
    missing_keywords = [kw for kw in target_keywords if kw.lower() not in text_lower]
    
    # Check action verbs
    found_action_verbs = [verb for verb in ACTION_VERBS if re.search(r'\b' + verb + r'\b', text_lower)]
    
    # Evaluate sections
    sections: List[SectionScore] = []
    
    # 1. Contact Info check
    has_email = bool(re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text))
    has_phone = bool(re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)) or "phone" in text_lower or "+" in text
    has_linkedin = "linkedin" in text_lower or "github" in text_lower
    contact_passed = has_email and (has_phone or has_linkedin)
    sections.append(SectionScore(
        name="Contact Information",
        score=95 if contact_passed else 60,
        feedback="Includes email, phone, and professional profiles." if contact_passed else "Missing phone or LinkedIn profile link.",
        passed=contact_passed
    ))
    
    # 2. Experience Section check
    has_exp = any(term in text_lower for term in ["experience", "work history", "employment", "professional background"])
    sections.append(SectionScore(
        name="Work Experience",
        score=90 if has_exp else 40,
        feedback="Clear work experience heading with bullet points." if has_exp else "Consider adding a prominent 'Work Experience' section heading.",
        passed=has_exp
    ))
    
    # 3. Education & Skills check
    has_edu = any(term in text_lower for term in ["education", "university", "degree", "bachelor", "master", "bs", "ms"])
    has_skills = any(term in text_lower for term in ["skills", "technologies", "tech stack", "tools"])
    sections.append(SectionScore(
        name="Skills & Education",
        score=85 if (has_edu and has_skills) else 50,
        feedback="Skills and Education sections are well structured." if (has_edu and has_skills) else "Ensure separate Skills and Education sections exist.",
        passed=(has_edu and has_skills)
    ))
    
    # 4. Measurable Impact (numbers, percentages, metrics)
    has_metrics = bool(re.search(r'\d+%', text)) or bool(re.search(r'\$\d+', text)) or bool(re.search(r'\b\d+\s*(users|clients|projects|ms|sec|x)\b', text_lower))
    sections.append(SectionScore(
        name="Quantifiable Impact",
        score=88 if has_metrics else 55,
        feedback="Great job using metrics (% increase, $ saved, team sizes) to prove impact!" if has_metrics else "Add measurable metrics (e.g. 'Improved speed by 35%', 'Served 50k users').",
        passed=has_metrics
    ))

    # Calculate overall ATS score
    keyword_pct = len(found_keywords) / max(len(target_keywords), 1)
    action_verb_factor = min(len(found_action_verbs) / 5.0, 1.0)
    section_avg = sum(s.score for s in sections) / len(sections)
    
    ats_score = int(section_avg * 0.4 + keyword_pct * 100 * 0.4 + action_verb_factor * 100 * 0.2)
    ats_score = min(max(ats_score, 45), 98) # Clamp nicely
    
    match_percentage = int(keyword_pct * 100)
    formatting_score = int(section_avg)
    
    # Generate tailored suggestions & strengths
    suggestions = []
    if missing_keywords:
        suggestions.append(f"Incorporate missing core tech keywords: {', '.join(missing_keywords[:4])}")
    if not has_metrics:
        suggestions.append("Quantify your achievements with numbers, percentages, and metrics.")
    if len(found_action_verbs) < 4:
        suggestions.append("Start bullet points with strong action verbs like 'Engineered', 'Architected', 'Spearheaded'.")
    suggestions.append("Keep font sizes uniform and avoid table structures or multi-column layouts for ATS compatibility.")

    strengths = []
    if keyword_pct > 0.5:
        strengths.append(f"Strong alignment with {role} target skills.")
    if has_metrics:
        strengths.append("Effective use of quantified results and business impact.")
    if found_action_verbs:
        strengths.append(f"Active verb usage ({', '.join(found_action_verbs[:3])}).")

    return ResumeScanResponse(
        ats_score=ats_score,
        match_percentage=match_percentage,
        formatting_score=formatting_score,
        sections=sections,
        found_keywords=found_keywords,
        missing_keywords=missing_keywords,
        action_verbs_used=found_action_verbs,
        suggestions=suggestions,
        strengths=strengths
    )
