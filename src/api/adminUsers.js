import api from './client'

export async function fetchAdmins() {
  const response = await api.get('/admin/users')
  return response.data.data
}

export async function createAdminUser(data) {
  const response = await api.post('/admin/users', data)
  return response.data.data
}

export async function updateAdminRole(id, role) {
  const response = await api.patch(`/admin/users/${id}/role`, { role })
  return response.data.data
}

export async function updateAdminStatus(id, isActive) {
  const response = await api.patch(`/admin/users/${id}/status`, { isActive })
  return response.data.data
}
