import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/internships', label: 'Internships' },
    { to: '/add-internship', label: 'Add Internship' },
  ]

  return (
    <nav className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 text-left">
          <span className="rounded-2xl bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] p-2 text-white shadow-lg shadow-emerald-100">💼</span>
          <span>
            <span className="block text-lg font-bold text-slate-800">Internship Tracker</span>
            <span className="text-xs uppercase tracking-[0.25em] text-emerald-600">SaaS dashboard</span>
          </span>
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={handleLogout}
            className="rounded-xl bg-[linear-gradient(135deg,#fb923c_0%,#f97316_100%)] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-100 transition hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 rounded-xl bg-[linear-gradient(135deg,#fb923c_0%,#f97316_100%)] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
