import api from './client'

export async function fetchFamilies(params = {}) {
  const response = await api.get('/families', { params })
  return response.data
}

export async function fetchFamily(id) {
  const response = await api.get(`/families/${id}`)
  return response.data.data
}

// ─── Admin: Add Note ──────────────────────────────────────────────────────────
export async function addFamilyNote(id, text) {
  const response = await api.post(`/families/${id}/notes`, { text })
  return response.data.data
}

// ─── Admin: Get Notes ─────────────────────────────────────────────────────────
export async function getFamilyNotes(id) {
  const response = await api.get(`/families/${id}/notes`)
  return response.data.data
}
