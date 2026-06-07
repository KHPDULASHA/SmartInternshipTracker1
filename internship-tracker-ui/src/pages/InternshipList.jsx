import { useEffect, useMemo, useState } from 'react'
import { deleteInternship, getInternships } from '../services/internshipService'

export default function InternshipList() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const safeInternships = Array.isArray(internships) ? internships : []

  const refreshInternships = async () => {
    try {
      setLoading(true)
      const data = await getInternships()
      setInternships(Array.isArray(data) ? data : [])
      setError('')
    } catch {
      setError('Failed to load internships.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshInternships()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this internship?')) return

    try {
      await deleteInternship(id)
      await refreshInternships()
    } catch {
      setError('Failed to delete internship.')
    }
  }

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()
    if (!term) return safeInternships

    return safeInternships.filter((item) =>
      [item.companyName, item.role, item.status].some((value) => String(value || '').toLowerCase().includes(term))
    )
  }, [safeInternships, search])

  const badgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'offer':
        return 'bg-emerald-100 text-emerald-700'
      case 'interview':
        return 'bg-teal-100 text-teal-700'
      case 'rejected':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Applications</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-800">Internship List</h1>
            <p className="mt-2 text-slate-500">Search, review, and manage your current internship applications.</p>
          </div>
          <label className="w-full lg:max-w-sm">
            <span className="mb-1 block text-sm font-medium text-slate-600">Search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, role, status"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        </div>
      </header>

      <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-emerald-100/80">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">All applications</h2>
            <p className="text-sm text-slate-500">Responsive table with status badges and quick actions.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{filtered.length} results</span>
        </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center text-emerald-700">Loading internships...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">No internships found for your search.</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Position</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Deadline</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filtered.map((item) => (
                  <tr key={item.internshipId} className="hover:bg-emerald-50/40">
                    <td className="px-4 py-4 font-medium text-slate-800">{item.companyName}</td>
                    <td className="px-4 py-4 text-slate-600">{item.role}</td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(item.status)}`}>{item.status}</span></td>
                    <td className="px-4 py-4 text-slate-600">{item.deadline ? new Date(item.deadline).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-xl bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-100">Edit</button>
                        <button onClick={() => handleDelete(item.internshipId)} className="rounded-xl bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}
