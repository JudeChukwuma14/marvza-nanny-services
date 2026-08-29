import api from './client'

export async function sendMessage(data) {
  const response = await api.post('/communications/send', data)
  return response.data.data
}

export async function fetchMessages(params = {}) {
  const response = await api.get('/communications', { params })
  return response.data
}
