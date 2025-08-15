import { useNavigate } from 'react-router-dom'
import PermissionForm from '@/components/PermissionForm'
import { usePermissionTypes } from '@/hooks/usePermissionTypes'
import { createPermission } from '@/api/permissions'
import type { CreatePermissionCommand } from '@/types'

export default function CreatePermissionPage() {
  const nav = useNavigate()
  const { types, loading, error } = usePermissionTypes()

  const onSubmit = async (payload: CreatePermissionCommand) => {
    await createPermission(payload)
    nav('/')
  }

  if (loading) return <div className="container-page">Loading…</div>
  if (error) return <div className="container-page"><div className="badge bg-rose-100 text-rose-700">{error}</div></div>

  return (
    <div className="container-page space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Permission</h1>
      </div>
      <PermissionForm mode="create" types={types} onSubmit={onSubmit} />
    </div>
  )
}
