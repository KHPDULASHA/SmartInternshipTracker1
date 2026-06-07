import { useMemo } from 'react'
import { getCurrentUser, logout } from '../services/authService'

export default function Dashboard() {
  const user = useMemo(() => getCurrentUser(), [])

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Protected</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">Welcome back, {user?.name || 'there'}.</h1>
        <p className="mt-2 text-slate-500">You are authenticated with the JWT session stored in your browser.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
          <h2 className="text-xl font-semibold text-slate-800">Account overview</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-2xl bg-emerald-50 p-4">Name: <span className="font-semibold text-slate-800">{user?.name || '—'}</span></li>
            <li className="rounded-2xl bg-teal-50 p-4">Email: <span className="font-semibold text-slate-800">{user?.email || '—'}</span></li>
            <li className="rounded-2xl bg-orange-50 p-4">Session: <span className="font-semibold text-slate-800">JWT token stored locally</span></li>
          </ul>
        </article>

        <article className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
          <h2 className="text-xl font-semibold text-slate-800">Quick actions</h2>
          <p className="mt-2 text-sm text-slate-500">This protected page is ready for your real internship data and API calls.</p>
          <button
            onClick={() => {
              logout()
              window.location.assign('/login')
            }}
            className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#fb923c_0%,#f97316_100%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5"
          >
            Logout
          </button>
        </article>
      </section>
    </section>
  )
}
