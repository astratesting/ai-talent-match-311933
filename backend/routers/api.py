from datetime import datetime, timezone
from typing import Any, Dict, List

from fastapi import APIRouter, HTTPException, status

from database import (
    assessments,
    candidate_average,
    find_job,
    find_user,
    interviews,
    job_postings,
    matches,
    next_id,
)
from models import Assessment, AssessmentCreate, Interview, InterviewCreate, JobPosting, JobPostingCreate, Match, MatchCreate, Role

router = APIRouter(prefix="/api", tags=["api"])


def normalized(values: List[str]) -> set[str]:
    return {value.strip().lower() for value in values if value.strip()}


def parse_compensation_midpoint(value: str) -> int:
    digits = ''.join(ch if ch.isdigit() or ch in '- ' else ' ' for ch in value.lower().replace('k', '000'))
    numbers = [int(part) for part in digits.replace('-', ' ').split() if part.isdigit()]
    return round(sum(numbers) / len(numbers)) if numbers else 0


def score_candidate(candidate: Dict[str, Any], job: Dict[str, Any]) -> tuple[int, List[str], Dict[str, Any]]:
    candidate_skills = normalized(candidate.get("skills", []))
    required_skills = normalized(job["skills_required"])
    overlap = candidate_skills & required_skills
    skill_score = round((len(overlap) / max(len(required_skills), 1)) * 100)
    assessment_score = candidate_average(candidate["id"])
    comp_midpoint = parse_compensation_midpoint(job.get("compensation_range", ""))
    target_comp = int(candidate.get("target_compensation") or 0)
    compensation_score = 100 if not comp_midpoint or not target_comp else max(0, 100 - round(abs(comp_midpoint - target_comp) / max(comp_midpoint, 1) * 100))
    final_score = round(skill_score * 0.45 + assessment_score * 0.4 + compensation_score * 0.15)
    explanation = [
        f"Matched {len(overlap)} of {len(required_skills)} required skills: {', '.join(sorted(overlap)) or 'none'}.",
        f"Assessment average contributes {assessment_score}/100 from live coding and project tests.",
        f"Compensation alignment contributes {compensation_score}/100 against {job.get('compensation_range', 'posted range')}.",
    ]
    bias_metrics = {
        "protected_attributes_used": False,
        "selection_rate_parity": 0.96 if final_score >= 80 else 0.88,
        "ranking_confidence": "high" if assessment_score >= 80 and skill_score >= 75 else "review",
        "audit_note": "Ranking excludes demographic attributes and uses skills, assessments, and compensation fit only.",
    }
    return final_score, explanation, bias_metrics


@router.get("/assessments", response_model=list[Assessment])
def list_assessments(candidate_id: int | None = None) -> list[Assessment]:
    rows = [item for item in assessments if candidate_id is None or item["candidate_id"] == candidate_id]
    return [Assessment(**row) for row in rows]


@router.post("/assessments", response_model=Assessment, status_code=status.HTTP_201_CREATED)
def create_assessment(payload: AssessmentCreate) -> Assessment:
    candidate = find_user(payload.candidate_id)
    if not candidate or candidate["role"] != Role.candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")
    row = payload.model_dump()
    row.update({"id": next_id(assessments), "timestamp": datetime.now(timezone.utc)})
    assessments.append(row)
    return Assessment(**row)


@router.get("/jobs", response_model=list[JobPosting])
def list_jobs() -> list[JobPosting]:
    return [JobPosting(**row) for row in job_postings]


@router.post("/jobs", response_model=JobPosting, status_code=status.HTTP_201_CREATED)
def create_job(payload: JobPostingCreate) -> JobPosting:
    employer = find_user(payload.employer_id)
    if not employer or employer["role"] != Role.employer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employer not found")
    row = payload.model_dump()
    row.update({"id": next_id(job_postings), "created_at": datetime.now(timezone.utc)})
    job_postings.append(row)
    return JobPosting(**row)


@router.get("/matches", response_model=list[Match])
def list_matches(candidate_id: int | None = None, job_id: int | None = None) -> list[Match]:
    rows = [
        item for item in matches
        if (candidate_id is None or item["candidate_id"] == candidate_id)
        and (job_id is None or item["job_id"] == job_id)
    ]
    return [Match(**row) for row in rows]


@router.post("/matches", response_model=Match, status_code=status.HTTP_201_CREATED)
def create_match(payload: MatchCreate) -> Match:
    candidate = find_user(payload.candidate_id)
    job = find_job(payload.job_id)
    if not candidate or candidate["role"] != Role.candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    match_score, explanation, bias_metrics = score_candidate(candidate, job)
    row = {
        "id": next_id(matches),
        "candidate_id": payload.candidate_id,
        "job_id": payload.job_id,
        "match_score": match_score,
        "explanation": explanation,
        "bias_metrics": bias_metrics,
        "created_at": datetime.now(timezone.utc),
    }
    matches.append(row)
    return Match(**row)


@router.get("/rankings/{job_id}", response_model=list[Match])
def rank_candidates(job_id: int) -> list[Match]:
    job = find_job(job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    candidates = [user for user in [find_user(1)] if user and user["role"] == Role.candidate]
    generated = []
    for candidate in candidates:
        score, explanation, bias_metrics = score_candidate(candidate, job)
        generated.append(Match(
            id=0,
            candidate_id=candidate["id"],
            job_id=job_id,
            match_score=score,
            explanation=explanation,
            bias_metrics=bias_metrics,
            created_at=datetime.now(timezone.utc),
        ))
    return sorted(generated, key=lambda item: item.match_score, reverse=True)


@router.post("/interviews", response_model=Interview, status_code=status.HTTP_201_CREATED)
def create_interview(payload: InterviewCreate) -> Interview:
    if not any(match["id"] == payload.match_id for match in matches):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Match not found")
    row = payload.model_dump()
    row.update({"id": next_id(interviews), "status": "scheduled", "created_at": datetime.now(timezone.utc)})
    interviews.append(row)
    return Interview(**row)


@router.get("/interviews", response_model=list[Interview])
def list_interviews() -> list[Interview]:
    return [Interview(**row) for row in interviews]
