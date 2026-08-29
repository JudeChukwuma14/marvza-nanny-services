import api from './client'

export async function fetchAuditLog(params = {}) {
  const response = await api.get('/admin/audit-log', { params })
  return response.data
}
