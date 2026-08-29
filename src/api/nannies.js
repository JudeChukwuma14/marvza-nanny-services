import api from './client'

export async function fetchNannies(params = {}) {
  const response = await api.get('/nannies', { params })
  return response.data
}

export async function fetchNanny(id) {
  const response = await api.get(`/nannies/${id}`)
  return response.data.data
}
