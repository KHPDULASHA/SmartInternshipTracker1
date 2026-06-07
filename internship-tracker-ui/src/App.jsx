import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      setSuccess('Login successful. Token stored in localStorage.')
      setEmail('')
      setPassword('')
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#ecfeff_0%,#f8fafc_45%,#ecfdf5_100%)] text-slate-700">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-emerald-100/80 lg:grid-cols-[1.05fr_0.95fr]">
          <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#059669_0%,#0f766e_45%,#14b8a6_100%)] p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.25),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_18%)]" />
            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-semibold tracking-wide text-emerald-50">Internship Tracker</span>
              <div>
                <h1 className="max-w-md text-4xl font-bold leading-tight">Smart skills matching starts here.</h1>
                <p className="mt-4 max-w-sm text-emerald-50/90">Track internships, align your skills, and move faster with a clean, secure login experience.</p>
              </div>
            </div>
            <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <p className="text-sm text-emerald-50">Why teams love it</p>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>• Secure JWT authentication</li>
                <li>• Fast, responsive dashboard-ready UI</li>
                <li>• Modern emerald + teal + orange palette</li>
              </ul>
            </div>
          </aside>

          <article className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto flex max-w-md flex-col justify-center">
              <div className="mb-6 text-center lg:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Welcome back</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">Sign in to your account</h2>
                <p className="mt-2 text-sm text-slate-500">Use your credentials to continue your internship journey.</p>
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
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="rounded-r-2xl px-3 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-400" />
                    Remember me
                  </label>
                  <button type="button" className="font-semibold text-teal-600 hover:text-teal-700">Forgot password?</button>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                ) : null}

                {success ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Logging in...
                    </>
                  ) : 'Login'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">Don’t have an account? <button type="button" className="font-semibold text-orange-500 hover:text-orange-600">Contact admin</button></p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
