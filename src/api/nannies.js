import api from './client'

export async function fetchNannies(params = {}) {
  const response = await api.get('/nannies', { params })
  return response.data
}

export async function fetchNanny(id) {
  const response = await api.get(`/nannies/${id}`)
  return response.data.data
}

// ─── Admin: Update Vetting Status ─────────────────────────────────────────────
export async function updateNannyVettingStatus(id, vettingStatus) {
  const response = await api.patch(`/nannies/${id}/vetting-status`, { vettingStatus })
  return response.data.data
}

// ─── Admin: Update Account Status ─────────────────────────────────────────────
export async function updateNannyAccountStatus(id, accountStatus) {
  const response = await api.patch(`/nannies/${id}/account-status`, { accountStatus })
  return response.data.data
}

// ─── Admin: Update Nanny's Availability ──────────────────────────────────────
export async function updateNannyAvailabilityAdmin(id, availability) {
  const response = await api.patch(`/nannies/${id}/availability`, availability)
  return response.data.data
}
