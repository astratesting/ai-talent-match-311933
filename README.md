# AI Talent Match

Production-lean MVP for skills-first recruiting. Candidates prove ability through live coding and project assessments. Employers rank candidates with explainable AI-style scoring, bias audit metrics, and interview scheduling.

## Stack

- Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS, Clerk auth UI, Supabase client
- Backend: FastAPI, Pydantic, JWT auth, in-memory MVP data store
- Database target: PostgreSQL via `docker-compose.yml` and `DATABASE_URL`
- Deployment target: Vercel for frontend, any ASGI host for backend

## Features

- Landing page tailored to AI Talent Match value props
- Clerk-protected dashboard route
- Candidate dashboard: profile strength, assessment history, match scores
- Employer dashboard: job postings, ranked candidates, bias audit status
- FastAPI auth endpoints: `/auth/register`, `/auth/login`, `/auth/me`
- FastAPI CRUD endpoints: assessments, jobs, matches, rankings, interviews
- Explainable matching score based on skills, assessments, and compensation fit
- Bias metrics attached to every generated match

## Local development

```bash
cp .env.example .env
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Open `http://localhost:8000/docs`.

### PostgreSQL

```bash
docker compose up -d postgres
```

## Demo accounts

Backend seeded users use password `password123`:

- Candidate: `maya@example.com`
- Employer: `hiring@example.com`

## Vercel deployment

1. Set Vercel project root to `frontend`.
2. Add environment variables from `.env.example`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`
3. Deploy with build command `npm run build` and output handled by Next.js.

## API quick checks

```bash
curl http://localhost:8000/health
curl -X POST http://localhost:8000/api/matches \
  -H 'Content-Type: application/json' \
  -d '{"candidate_id":1,"job_id":1}'
```
