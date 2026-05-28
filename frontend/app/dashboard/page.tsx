import { CalendarDays, Code2, Gauge, ShieldCheck, Users } from 'lucide-react'

const candidateAssessments = [
  { type: 'Live React Challenge', score: 92, date: 'May 18', note: 'Accessible UI and strong state design' },
  { type: 'API Architecture Project', score: 88, date: 'May 12', note: 'Clean FastAPI boundaries and SQL modeling' },
  { type: 'Product Debugging Simulation', score: 81, date: 'May 03', note: 'Good tradeoff calls under time pressure' }
]

const matches = [
  { role: 'Founding Full-Stack Engineer', company: 'SignalForge', score: 94, why: 'React, Python, PostgreSQL, and AI workflow experience match 9 of 10 requirements.' },
  { role: 'AI Product Engineer', company: 'Northstar Labs', score: 89, why: 'Strong product judgment and project score offset lighter LLM deployment history.' },
  { role: 'Backend Platform Engineer', company: 'VentureOS', score: 82, why: 'Backend assessment is strong; frontend depth below preferred range.' }
]

const rankedCandidates = [
  { name: 'Maya Chen', score: 94, audit: 'Low risk', reason: 'Top assessment score, 9/10 skills, compensation aligned.' },
  { name: 'Andre Wilson', score: 89, audit: 'Low risk', reason: 'Strong backend score, fair ranking confidence, interview ready.' },
  { name: 'Priya Raman', score: 84, audit: 'Review', reason: 'Great project work, salary range above posting midpoint.' }
]

const jobs = [
  { title: 'Senior Full-Stack Engineer', skills: 'React, Python, PostgreSQL', comp: '$150k-$190k', equity: '0.2%-0.5%' },
  { title: 'AI Product Engineer', skills: 'Next.js, LLM evals, UX', comp: '$140k-$180k', equity: '0.1%-0.4%' }
]

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-bold text-blue-600">Demo dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Candidate and employer workspace</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            A single MVP surface for candidate profile progress, assessment history, explainable matches, employer rankings, bias audits, and interview scheduling.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
          <CalendarDays className="h-4 w-4" /> Schedule interview
        </button>
      </div>

      <section className="grid gap-5 md:grid-cols-4">
        {[
          [Gauge, 'Candidate match score', '94', 'Top 3% for full-stack roles'],
          [Code2, 'Assessment average', '87', '3 completed tests'],
          [Users, 'Employer candidates', '38', '12 interview-ready'],
          [ShieldCheck, 'Bias audit status', 'Clear', '1 ranking needs review']
        ].map(([Icon, label, value, text]) => {
          const StatIcon = Icon as typeof Gauge
          return (
            <div key={label as string} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <StatIcon className="h-6 w-6 text-blue-600" />
              <div className="mt-4 text-sm font-semibold text-slate-500">{label as string}</div>
              <div className="mt-1 text-3xl font-black text-slate-950">{value as string}</div>
              <div className="mt-2 text-sm text-slate-600">{text as string}</div>
            </div>
          )
        })}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-950">Candidate profile</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">Ready</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-xl font-bold text-slate-950">Maya Chen</div>
              <div className="mt-1 text-slate-600">Full-stack engineer · React · Python · PostgreSQL · AI tooling</div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[94%] rounded-full bg-blue-600" />
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-600">94% profile strength based on verified skills</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Assessment history</h2>
            <div className="mt-5 space-y-4">
              {candidateAssessments.map((assessment) => (
                <div key={assessment.type} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-950">{assessment.type}</div>
                      <div className="mt-1 text-sm text-slate-500">{assessment.date} · {assessment.note}</div>
                    </div>
                    <div className="text-2xl font-black text-blue-600">{assessment.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Explainable matches</h2>
            <div className="mt-5 space-y-4">
              {matches.map((match) => (
                <div key={match.role} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-950">{match.role}</div>
                      <div className="text-sm font-semibold text-blue-600">{match.company}</div>
                    </div>
                    <div className="rounded-xl bg-blue-50 px-3 py-2 text-xl font-black text-blue-600">{match.score}</div>
                  </div>
                  <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{match.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Employer job postings</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <div key={job.title} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-bold text-slate-950">{job.title}</div>
                  <div className="mt-2 text-sm text-slate-600">Skills: {job.skills}</div>
                  <div className="mt-2 text-sm text-slate-600">Comp: {job.comp}</div>
                  <div className="mt-2 text-sm text-slate-600">Equity: {job.equity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Candidate ranking</h2>
          <div className="mt-5 space-y-4">
            {rankedCandidates.map((candidate) => (
              <div key={candidate.name} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-950">{candidate.name}</div>
                  <div className="font-black text-blue-600">{candidate.score}%</div>
                </div>
                <div className="mt-2 text-sm text-slate-600">{candidate.reason}</div>
                <div className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Audit: {candidate.audit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Interview scheduler</h2>
          <div className="mt-5 space-y-4">
            {['Tue 10:00 AM · Technical pairing', 'Wed 1:30 PM · Hiring manager', 'Fri 9:00 AM · Founder chat'].map((slot) => (
              <div key={slot} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-800">{slot}</div>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Offer slot</button>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Scheduling note: candidate timezone and interviewer availability are checked before slot confirmation.
          </div>
        </div>
      </section>
    </main>
  )
}
