import http from './axios.config'
import type {
  PermissionDto,
  CreatePermissionCommand,
  ModifyPermissionCommand,
  PermissionType
} from '@/types'

export async function getPermissions(id?: number): Promise<PermissionDto[]> {
  const params = typeof id === 'number' ? { id } : undefined
  const { data } = await http.get<PermissionDto[]>('/Permissions', { params })
  return data
}

export async function getPermissionById(id: number): Promise<PermissionDto | null> {
  const list = await getPermissions(id)
  return list[0] ?? null
}

export async function createPermission(payload: CreatePermissionCommand): Promise<PermissionDto> {
  const { data } = await http.post<PermissionDto>('/Permissions', payload)
  return data
}

export async function modifyPermission(payload: ModifyPermissionCommand): Promise<PermissionDto> {
  const { data } = await http.put<PermissionDto>(`/Permissions/${payload.id}`, payload)
  return data
}

export async function getPermissionTypes(): Promise<PermissionType[]> {
  const { data } = await http.get<PermissionType[]>('/PermissionTypes')
  return data
}
