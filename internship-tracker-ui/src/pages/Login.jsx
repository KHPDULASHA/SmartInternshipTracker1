import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setLoading(true)
      await login(email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#ecfeff_0%,#f8fafc_45%,#ecfdf5_100%)] text-slate-700">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-emerald-100/80 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="hidden bg-[linear-gradient(145deg,#059669_0%,#0f766e_45%,#14b8a6_100%)] p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Welcome</p>
              <h1 className="mt-3 text-3xl font-bold">Sign in to Internship Tracker</h1>
              <p className="mt-4 text-emerald-50/90">Manage internships, monitor your pipeline, and stay on top of every opportunity.</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/90 backdrop-blur-md">Secure, simple, and built for fast internship tracking.</div>
          </aside>

          <article className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto flex max-w-md flex-col justify-center">
              <div className="mb-6 text-center lg:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Login</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">Access your dashboard</h2>
                <p className="mt-2 text-sm text-slate-500">Use your email and password to continue.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <div className="mt-1 flex items-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-l-2xl bg-transparent px-4 py-3 text-slate-700 outline-none"
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="rounded-r-2xl px-3 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50">{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </label>

                {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

                <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70">
                  {loading ? 'Signing in...' : 'Login'}
                </button>

                <p className="text-center text-sm text-slate-500">Don't have an account? <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">Register</Link></p>
              </form>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
