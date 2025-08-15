import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PermissionForm from '@/components/PermissionForm'
import { usePermissionTypes } from '@/hooks/usePermissionTypes'
import { getPermissionById, modifyPermission } from '@/api/permissions'
import type { PermissionDto, ModifyPermissionCommand, CreatePermissionCommand } from '@/types'

export default function EditPermissionPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const { types, loading: loadingTypes, error: errorTypes } = usePermissionTypes()
  const [initial, setInitial] = useState<PermissionDto | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        if (!id) throw new Error('Invalid ID')
        const row = await getPermissionById(Number(id))
        if (!row) throw new Error('Permission not found')
        setInitial(row)
      } catch (e: unknown) {
        setErr((e as Error).message)
      }
    })()
  }, [id])

  const onSubmit = async (payload: CreatePermissionCommand | ModifyPermissionCommand) => {
    await modifyPermission(payload as ModifyPermissionCommand)
    nav('/')
  }

  if (err || errorTypes) return <div className="container-page"><div className="badge bg-rose-100 text-rose-700">{err || errorTypes}</div></div>
  if (loadingTypes || !initial) return <div className="container-page">Loading…</div>

  return (
    <div className="container-page space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Permission #{initial.id}</h1>
      </div>
      <PermissionForm mode="edit" initial={initial} types={types} onSubmit={onSubmit} />
    </div>
  )
}
