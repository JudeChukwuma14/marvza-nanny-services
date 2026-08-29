import api from './client'

export async function fetchContent(params = {}) {
  const response = await api.get('/content', { params })
  return response.data
}
