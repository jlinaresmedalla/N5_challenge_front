import { useEffect, useState } from 'react'
import { getPermissionTypes } from '@/api/permissions'
import type { PermissionType } from '@/types'

export function usePermissionTypes() {
  const [types, setTypes] = useState<PermissionType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try { setLoading(true); setError(null)
        setTypes(await getPermissionTypes())
      } catch (e: unknown) {
        setError((e as Error).message || 'Failed to load types')
      } finally { setLoading(false) }
    })()
  }, [])

  return { types, loading, error }
}
