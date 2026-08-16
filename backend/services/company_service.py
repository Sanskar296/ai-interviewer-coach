from typing import List, Dict, Any
from models.schemas import CompanyQuestion

COMPANIES_DATA = [
    {
        "id": "google",
        "name": "Google",
        "logo_text": "G",
        "color": "from-red-500 to-yellow-500",
        "open_roles": 42,
        "difficulty": "Hard",
        "focus_areas": ["Data Structures", "System Scale", "Googliness"]
    },
    {
        "id": "meta",
        "name": "Meta",
        "logo_text": "M",
        "color": "from-blue-500 to-cyan-500",
        "open_roles": 35,
        "difficulty": "Hard",
        "focus_areas": ["Product Architecture", "Fast Coding", "Behavioral"]
    },
    {
        "id": "amazon",
        "name": "Amazon",
        "logo_text": "A",
        "color": "from-amber-500 to-orange-500",
        "open_roles": 58,
        "difficulty": "Medium-Hard",
        "focus_areas": ["Leadership Principles", "Customer Obsession", "Object Oriented Design"]
    },
    {
        "id": "microsoft",
        "name": "Microsoft",
        "logo_text": "MS",
        "color": "from-blue-600 to-indigo-600",
        "open_roles": 29,
        "difficulty": "Medium",
        "focus_areas": ["System Design", "Cloud Infrastructure", "Collaboration"]
    },
    {
        "id": "netflix",
        "name": "Netflix",
        "logo_text": "N",
        "color": "from-red-600 to-rose-700",
        "open_roles": 18,
        "difficulty": "Hard",
        "focus_areas": ["High Performance Architecture", "Culture & Freedom", "Distributed Systems"]
    },
    {
        "id": "apple",
        "name": "Apple",
        "logo_text": "",
        "color": "from-slate-400 to-slate-600",
        "open_roles": 22,
        "difficulty": "Hard",
        "focus_areas": ["Low-level Systems", "User Experience", "Hardware Integration"]
    }
]

QUESTIONS_DATA: List[CompanyQuestion] = [
    CompanyQuestion(
        id="cq-1",
        company="google",
        role="Senior Software Engineer",
        category="System Design",
        question="Design Google Docs real-time collaborative editor infrastructure handling concurrent edits from thousands of users.",
        difficulty="Hard",
        frequency="High (Asked 120+ times)",
        sample_answer="Use Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) for concurrency resolution. Establish persistent WebSocket connections managed by stateless gateway nodes backed by a pub/sub cluster (Redis/Kafka) and a document state engine.",
        recruiter_tips=[
            "Focus on conflict resolution algorithms early in the interview.",
            "Discuss how to gracefully handle network disconnects and local offline edit buffering."
        ]
    ),
    CompanyQuestion(
        id="cq-2",
        company="amazon",
        role="Full Stack Engineer",
        category="Leadership Principles",
        question="Describe a time when you had to make a decision without full data. How did you proceed?",
        difficulty="Medium",
        frequency="Very High (Asked 300+ times)",
        sample_answer="Connect directly to the 'Bias for Action' Leadership Principle. Explain how you calculated two-way door vs one-way door risks, gathered initial signals, implemented fallback safety nets, and iterated based on telemetry data.",
        recruiter_tips=[
            "Amazon interviewers strictly score using the 16 Leadership Principles.",
            "Structure answer explicitly as Situation -> Task -> Action -> Result."
        ]
    ),
    CompanyQuestion(
        id="cq-3",
        company="meta",
        role="Frontend Engineer",
        category="Frontend System Design",
        question="Design Meta Newsfeed infinite scroll component with media prefetching and memory virtualization.",
        difficulty="Hard",
        frequency="High (Asked 95+ times)",
        sample_answer="Implement DOM windowing/virtualization using IntersectionObserver to unmount offscreen feeds. Use LRU caching for prefetched images and batch feed requests via a GraphQL client.",
        recruiter_tips=[
            "Meta emphasizes web performance, 60fps rendering, and mobile battery/memory conservation."
        ]
    ),
    CompanyQuestion(
        id="cq-4",
        company="microsoft",
        role="Backend Engineer",
        category="Coding & Algorithms",
        question="Implement an LRU (Least Recently Used) cache with O(1) get and put time complexities.",
        difficulty="Medium",
        frequency="Very High (Asked 210+ times)",
        sample_answer="Combine a Doubly Linked List for ordering element access and a Hash Map storing keys mapping to list node pointers. Update node position to head on access; evict tail node when capacity is exceeded.",
        recruiter_tips=[
            "Write clean code with edge cases handled (null checks, zero capacity, key overwrite)."
        ]
    ),
    CompanyQuestion(
        id="cq-5",
        company="netflix",
        role="Distributed Systems Engineer",
        category="System Design",
        question="How would you design Netflix video streaming chunk delivery across global CDN nodes?",
        difficulty="Hard",
        frequency="High (Asked 80+ times)",
        sample_answer="Utilize adaptive bitrate streaming (HLS/DASH) splitting video into 2-6 second chunks. Store chunks on edge Open Connect Appliances (OCAs) pre-positioned based on predictive regional viewing trends.",
        recruiter_tips=[
            "Highlight fault tolerance, dynamic bandwidth switching, and chaos engineering principles."
        ]
    )
]

def get_companies() -> List[Dict[str, Any]]:
    return COMPANIES_DATA

def get_company_questions(company_id: str = None, category: str = None) -> List[CompanyQuestion]:
    results = QUESTIONS_DATA
    if company_id:
        results = [q for q in results if q.company.lower() == company_id.lower()]
    if category and category != "All":
        results = [q for q in results if category.lower() in q.category.lower()]
    return results
