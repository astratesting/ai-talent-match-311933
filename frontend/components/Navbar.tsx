import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          AI Talent Match
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/#assessments" className="hover:text-blue-600">Assessments</Link>
          <Link href="/#matching" className="hover:text-blue-600">Matching</Link>
          <Link href="/#bias" className="hover:text-blue-600">Bias audits</Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full px-4 py-2 hover:bg-slate-100">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800">Start free</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
