import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createInternship } from '../services/internshipService'

export default function AddInternship() {
  const [form, setForm] = useState({ companyName: '', role: '', status: 'Applied', deadline: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.companyName.trim()) next.companyName = 'Company name is required.'
    if (!form.role.trim()) next.role = 'Position is required.'
    if (!form.status) next.status = 'Please select a status.'
    if (!form.deadline) next.deadline = 'Deadline is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      await createInternship({
        companyName: form.companyName.trim(),
        role: form.role.trim(),
        status: form.status,
        deadline: form.deadline,
        notes: form.notes.trim(),
        appliedDate: new Date().toISOString(),
      })
      setSuccess('Internship saved successfully.')
      setForm({ companyName: '', role: '', status: 'Applied', deadline: '', notes: '' })
    } catch (err) {
      setSuccess(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Create</p>
        <h1 className="text-3xl font-bold text-slate-800">Add Internship</h1>
        <p className="text-slate-500">Add a new internship opportunity and keep your tracker up to date.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2" noValidate>
        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Company Name
          <input name="companyName" value={form.companyName} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100" placeholder="Example: Google" />
          {errors.companyName ? <span className="mt-1 block text-xs text-red-600">{errors.companyName}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Position
          <input name="role" value={form.role} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100" placeholder="Example: Frontend Intern" />
          {errors.role ? <span className="mt-1 block text-xs text-red-600">{errors.role}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Status
          <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          {errors.status ? <span className="mt-1 block text-xs text-red-600">{errors.status}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700">
          Deadline
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100" />
          {errors.deadline ? <span className="mt-1 block text-xs text-red-600">{errors.deadline}</span> : null}
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Notes
          <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" placeholder="Add notes for the internship..." className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100" />
        </label>

        {success ? <div className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate('/internships')} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">Cancel</button>
          <button type="submit" disabled={loading} className="rounded-2xl bg-[linear-gradient(135deg,#10b981_0%,#14b8a6_100%)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Saving...' : 'Save Internship'}</button>
        </div>
      </form>
    </section>
  )
}
