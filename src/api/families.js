import api from './client'

export async function fetchFamilies(params = {}) {
  const response = await api.get('/families', { params })
  return response.data
}

export async function fetchFamily(id) {
  const response = await api.get(`/families/${id}`)
  return response.data.data
}
