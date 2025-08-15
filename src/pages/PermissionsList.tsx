import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { usePermissions } from '@/hooks/usePermissions'
import type { PermissionDto } from '@/types'

export default function PermissionsList() {
  const { rows, loading, error, reload } = usePermissions()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const f = q.trim().toLowerCase()
    if (!f) return rows
    return rows.filter(r =>
      String(r.id).includes(f) ||
      r.employeeFirstName.toLowerCase().includes(f) ||
      r.employeeLastName.toLowerCase().includes(f) ||
      (r.permissionTypeDescription || '').toLowerCase().includes(f)
    )
  }, [rows, q])

  return (
    <div className="container-page space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Permissions</h1>
        </div>
        <div className="flex gap-2">
          <input className="input w-56" placeholder="Buscar..." value={q} onChange={(e)=>setQ(e.target.value)} />
          <button className="btn btn-secondary" onClick={reload} disabled={loading}>Refresh</button>
          <Link to="/permissions/new" className="btn btn-primary">New Permission</Link>
        </div>
      </header>

      {error && <div className="badge bg-rose-100 text-rose-700">{error}</div>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow">
        <table className="table">
          <thead className="bg-slate-50">
            <tr>
              <th className="th">ID</th>
              <th className="th">Employee</th>
              <th className="th">Type</th>
              <th className="th">Date</th>
              <th className="th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: PermissionDto) => (
              <tr key={r.id} className="border-t">
                <td className="td">{r.id}</td>
                <td className="td">{r.employeeFirstName} {r.employeeLastName}</td>
                <td className="td">{r.permissionTypeDescription || r.permissionTypeId}</td>
                <td className="td">{new Date(r.permissionDate).toLocaleDateString()}</td>
                <td className="td">
                  <div className="flex justify-end">
                    <Link to={`/permissions/${r.id}/edit`} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-slate-100">
                      <PencilSquareIcon className="h-5 w-5" />
                      <span className="text-sm">Edit</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="td text-center text-slate-500" colSpan={5}>
                  {loading ? 'Loading…' : 'No data'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
