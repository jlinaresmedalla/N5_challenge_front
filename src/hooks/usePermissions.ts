import { useEffect, useState } from 'react'
import { getPermissions } from '@/api/permissions'
import type { PermissionDto } from '@/types'

export function usePermissions() {
  const [rows, setRows] = useState<PermissionDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    try {
      setLoading(true); setError(null)
      const data = await getPermissions()
      setRows(data)
    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { reload() }, [])

  return { rows, loading, error, reload }
}
