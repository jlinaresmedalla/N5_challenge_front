import { useEffect, useState } from 'react'
import type { PermissionDto, PermissionType, CreatePermissionCommand, ModifyPermissionCommand } from '@/types'

type Props = {
  mode: 'create' | 'edit'
  initial?: PermissionDto
  types: PermissionType[]
  onSubmit: (payload: CreatePermissionCommand | ModifyPermissionCommand) => Promise<void>
}

type FormState = {
  id?: number
  employeeFirstName: string
  employeeLastName: string
  permissionTypeId: number
  permissionDate: string // yyyy-MM-dd (para input date)
}

export default function PermissionForm({ mode, initial, types, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    employeeFirstName: '',
    employeeLastName: '',
    permissionTypeId: types[0]?.id ?? 1,
    permissionDate: new Date().toISOString().slice(0, 10),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  // precarga cuando es edit
  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id,
        employeeFirstName: initial.employeeFirstName,
        employeeLastName: initial.employeeLastName,
        permissionTypeId: initial.permissionTypeId,
        permissionDate: initial.permissionDate.slice(0, 10),
      })
    }
  }, [initial])

  // si cargan tipos después, set default si no hay
  useEffect(() => {
    if (!initial && types.length && !form.permissionTypeId) {
      setForm(f => ({ ...f, permissionTypeId: types[0].id }))
    }
  }, [types])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.employeeFirstName.trim()) e.employeeFirstName = 'Required'
    if (!form.employeeLastName.trim()) e.employeeLastName = 'Required'
    if (!form.permissionTypeId || form.permissionTypeId < 1) e.permissionTypeId = 'Select a type'
    if (!form.permissionDate) e.permissionDate = 'Pick a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (k: keyof FormState, v: string | number) => {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      const payload: any = {
        ...(form.id ? { id: form.id } : {}),
        employeeFirstName: form.employeeFirstName.trim(),
        employeeLastName: form.employeeLastName.trim(),
        permissionTypeId: Number(form.permissionTypeId),
        // yyyy-MM-dd -> ISO (00:00Z)
        permissionDate: new Date(form.permissionDate + 'T00:00:00Z').toISOString(),
      }
      await onSubmit(payload)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">First Name</label>
          <input
            className="input"
            placeholder="John"
            value={form.employeeFirstName}
            onChange={(e)=>handleChange('employeeFirstName', e.target.value)}
          />
          {errors.employeeFirstName && <p className="text-xs text-rose-600 mt-1">{errors.employeeFirstName}</p>}
        </div>
        <div>
          <label className="label">Last Name</label>
          <input
            className="input"
            placeholder="Doe"
            value={form.employeeLastName}
            onChange={(e)=>handleChange('employeeLastName', e.target.value)}
          />
          {errors.employeeLastName && <p className="text-xs text-rose-600 mt-1">{errors.employeeLastName}</p>}
        </div>
        <div>
          <label className="label">Permission Type</label>
          <select
            className="input"
            value={form.permissionTypeId}
            onChange={(e)=>handleChange('permissionTypeId', Number(e.target.value))}
          >
            {types.map(t => <option key={t.id} value={t.id}>{t.description}</option>)}
          </select>
          {errors.permissionTypeId && <p className="text-xs text-rose-600 mt-1">{errors.permissionTypeId}</p>}
        </div>
        <div>
          <label className="label">Permission Date</label>
          <input
            type="date"
            className="input"
            value={form.permissionDate}
            onChange={(e)=>handleChange('permissionDate', e.target.value)}
          />
          {errors.permissionDate && <p className="text-xs text-rose-600 mt-1">{errors.permissionDate}</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : (mode === 'create' ? 'Create' : 'Save')}
        </button>
      </div>
    </form>
  )
}
