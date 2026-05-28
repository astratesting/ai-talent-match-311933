from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List

from passlib.context import CryptContext

from models import Role

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users: List[Dict[str, Any]] = [
    {
        "id": 1,
        "email": "maya@example.com",
        "name": "Maya Chen",
        "role": Role.candidate,
        "password_hash": pwd_context.hash("password123"),
        "created_at": datetime.now(timezone.utc),
        "skills": ["react", "python", "postgresql", "fastapi", "ai workflows"],
        "target_compensation": 175000,
    },
    {
        "id": 2,
        "email": "hiring@example.com",
        "name": "SignalForge Hiring",
        "role": Role.employer,
        "password_hash": pwd_context.hash("password123"),
        "created_at": datetime.now(timezone.utc),
        "skills": [],
        "target_compensation": 0,
    },
]

assessments: List[Dict[str, Any]] = [
    {
        "id": 1,
        "candidate_id": 1,
        "type": "live_coding",
        "challenge_title": "React dashboard pairing challenge",
        "score": 92,
        "rubric": {"correctness": 94, "architecture": 90, "communication": 91},
        "notes": "Accessible UI, clear component boundaries, strong debugging narration.",
        "timestamp": datetime.now(timezone.utc) - timedelta(days=8),
    },
    {
        "id": 2,
        "candidate_id": 1,
        "type": "project_test",
        "challenge_title": "FastAPI matching service",
        "score": 88,
        "rubric": {"api_design": 90, "data_modeling": 88, "testing": 85},
        "notes": "Clean endpoint model, solid tradeoffs, good data validation.",
        "timestamp": datetime.now(timezone.utc) - timedelta(days=4),
    },
]

job_postings: List[Dict[str, Any]] = [
    {
        "id": 1,
        "employer_id": 2,
        "title": "Senior Full-Stack Engineer",
        "skills_required": ["react", "python", "postgresql", "fastapi"],
        "equity_offered": "0.2%-0.5%",
        "compensation_range": "$150k-$190k",
        "description": "Build AI hiring workflows, assessment products, and employer analytics.",
        "created_at": datetime.now(timezone.utc) - timedelta(days=2),
    }
]

matches: List[Dict[str, Any]] = []
interviews: List[Dict[str, Any]] = []


def next_id(collection: List[Dict[str, Any]]) -> int:
    return max((item["id"] for item in collection), default=0) + 1


def public_user(user: Dict[str, Any]) -> Dict[str, Any]:
    return {key: user[key] for key in ["id", "email", "name", "role", "created_at"]}


def find_user_by_email(email: str) -> Dict[str, Any] | None:
    return next((user for user in users if user["email"].lower() == email.lower()), None)


def find_user(user_id: int) -> Dict[str, Any] | None:
    return next((user for user in users if user["id"] == user_id), None)


def find_job(job_id: int) -> Dict[str, Any] | None:
    return next((job for job in job_postings if job["id"] == job_id), None)


def candidate_average(candidate_id: int) -> int:
    scores = [item["score"] for item in assessments if item["candidate_id"] == candidate_id]
    return round(sum(scores) / len(scores)) if scores else 0
