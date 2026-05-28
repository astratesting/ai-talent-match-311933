import Link from 'next/link'
import { ArrowRight, BadgeCheck, CalendarDays, Code2, FileSearch, ShieldCheck, Sparkles, Target } from 'lucide-react'

const stats = [
  ['87%', 'average match confidence from skills + project signals'],
  ['42%', 'less manual screening for employers'],
  ['4 min', 'to launch first role and candidate shortlist']
]

const features = [
  {
    icon: Code2,
    title: 'Live skills assessment engine',
    text: 'Candidates complete coding challenges and project-based tests. Scores combine correctness, architecture, communication, and delivery signals.'
  },
  {
    icon: Target,
    title: 'Explainable AI match scoring',
    text: 'Each candidate-job fit includes skill overlap, seniority evidence, compensation alignment, and plain-English reasons.'
  },
  {
    icon: ShieldCheck,
    title: 'Bias audit reports',
    text: 'Employers see fairness metrics, protected-attribute exclusion checks, and ranking distribution warnings before interviews.'
  },
  {
    icon: CalendarDays,
    title: 'Integrated scheduling',
    text: 'Teams can propose interview slots directly from ranked shortlists and track candidate status in one workflow.'
  }
]

const assessmentRows = [
  ['Frontend Systems', 'React pairing challenge', '92', 'Strong state isolation, accessible UI'],
  ['Backend APIs', 'FastAPI project test', '88', 'Clean schema, solid error handling'],
  ['Product Judgment', 'Take-home critique', '84', 'Clear prioritization, measurable tradeoffs']
]

export default function HomePage() {
  return (
    <main className="bg-cloud text-ink">
      <section className="gradient-grid relative overflow-hidden border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" /> Skills-first hiring for AI-era teams
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Hire by proven ability, not polished resumes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              AI Talent Match combines live coding assessments, project-based tests, explainable candidate-job matching, bias audits, and interview scheduling into one lean hiring workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-soft hover:bg-blue-700">
                Open MVP dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#matching" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-blue-300">
                See match logic
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-3xl font-black text-slate-950">{value}</div>
                  <div className="mt-2 text-sm text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm font-semibold text-blue-600">Employer shortlist</p>
                <h2 className="text-2xl font-bold">Senior Full-Stack Engineer</h2>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">Bias audit clear</div>
            </div>
            <div className="space-y-4 pt-5">
              {['Maya Chen', 'Andre Wilson', 'Priya Raman'].map((name, index) => (
                <div key={name} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-950">{name}</div>
                      <div className="mt-1 text-sm text-slate-600">React, Python, PostgreSQL, product systems</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-600">{94 - index * 5}</div>
                      <div className="text-xs font-semibold uppercase text-slate-500">match</div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                    Explanation: assessment score + skill overlap + compensation fit outweigh seniority gap.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="assessments" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <p className="font-bold text-blue-600">Core MVP features</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">One workflow from challenge to interview.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <feature.icon className="h-8 w-8 text-blue-600" />
              <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="matching" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-bold text-blue-300">Explainable matching</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Scores employers can defend and candidates can trust.</h2>
            <p className="mt-5 text-slate-300">
              Matching uses skills required, live assessment scores, project rubric evidence, compensation range, and equity preferences. Every rank includes reasons and bias metrics.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Skill overlap', 'Assessment quality', 'Compensation fit', 'Bias risk flags'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                  <BadgeCheck className="h-5 w-5 text-emerald-300" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-blue-200"><FileSearch className="h-5 w-5" /> Candidate assessment history</div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/10 text-slate-200">
                  <tr>
                    <th className="px-4 py-3">Skill area</th>
                    <th className="px-4 py-3">Test</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {assessmentRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => <td key={cell} className="px-4 py-4 text-slate-200">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="bias" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="font-bold text-emerald-600">Audit-ready hiring</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Built for transparent, regulated AI hiring.</h2>
              <p className="mt-5 text-slate-600">
                The MVP surfaces match explanations, ranking factors, and fairness metrics aligned with modern hiring AI requirements like NYC LL 144, GDPR transparency, and EU AI Act expectations.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Selection rate parity', '0.96', 'Healthy'],
                ['Protected data usage', '0 fields', 'Compliant'],
                ['Explainability coverage', '100%', 'Every rank']
              ].map(([label, value, status]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-500">{label}</div>
                  <div className="mt-2 text-3xl font-black text-slate-950">{value}</div>
                  <div className="mt-2 text-sm font-bold text-emerald-600">{status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
