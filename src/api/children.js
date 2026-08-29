import api from './client'

export async function fetchChildren(params = {}) {
  const response = await api.get('/children', { params })
  return response.data
}

export async function fetchChild(id) {
  const response = await api.get(`/children/${id}`)
  return response.data.data
}

export async function createChild(data) {
  const response = await api.post('/children', data)
  return response.data.data
}

export async function updateChild(id, data) {
  const response = await api.patch(`/children/${id}`, data)
  return response.data.data
}

export async function deleteChild(id) {
  const response = await api.delete(`/children/${id}`)
  return response.data
}
