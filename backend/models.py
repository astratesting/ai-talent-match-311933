from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, EmailStr, Field


class Role(str, Enum):
    candidate = "candidate"
    employer = "employer"


class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=120)
    role: Role
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: int
    email: EmailStr
    name: str
    role: Role
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class AssessmentCreate(BaseModel):
    candidate_id: int
    type: str = Field(min_length=3, max_length=80)
    challenge_title: str = Field(min_length=3, max_length=160)
    score: int = Field(ge=0, le=100)
    rubric: Dict[str, int] = Field(default_factory=dict)
    notes: str = Field(default="", max_length=1000)


class Assessment(BaseModel):
    id: int
    candidate_id: int
    type: str
    challenge_title: str
    score: int
    rubric: Dict[str, int]
    notes: str
    timestamp: datetime


class JobPostingCreate(BaseModel):
    employer_id: int
    title: str = Field(min_length=3, max_length=160)
    skills_required: List[str] = Field(min_length=1)
    equity_offered: str = Field(default="", max_length=80)
    compensation_range: str = Field(default="", max_length=80)
    description: str = Field(default="", max_length=2000)


class JobPosting(BaseModel):
    id: int
    employer_id: int
    title: str
    skills_required: List[str]
    equity_offered: str
    compensation_range: str
    description: str
    created_at: datetime


class MatchCreate(BaseModel):
    candidate_id: int
    job_id: int


class Match(BaseModel):
    id: int
    candidate_id: int
    job_id: int
    match_score: int
    explanation: List[str]
    bias_metrics: Dict[str, Any]
    created_at: datetime


class InterviewCreate(BaseModel):
    match_id: int
    starts_at: datetime
    interviewer: str = Field(min_length=2, max_length=120)
    location: str = Field(default="Google Meet", max_length=160)


class Interview(BaseModel):
    id: int
    match_id: int
    starts_at: datetime
    interviewer: str
    location: str
    status: str
    created_at: datetime
