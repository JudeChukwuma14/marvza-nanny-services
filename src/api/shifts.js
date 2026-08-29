import api from './client'

// ─── Admin: Fetch All Shifts ──────────────────────────────────────────────────
/**
 * @param {{ page?: number, limit?: number, status?: string, type?: string, search?: string }} params
 */
export async function fetchShifts(params = {}) {
  const response = await api.get('/shifts', { params })
  return response.data
}

// ─── Admin: Fetch Single Shift ────────────────────────────────────────────────
export async function fetchShift(id) {
  const response = await api.get(`/shifts/${id}`)
  return response.data.data
}

// ─── Admin: Cancel Shift ──────────────────────────────────────────────────────
export async function cancelShiftAdmin(id, reason) {
  const response = await api.patch(`/shifts/${id}/cancel`, { reason })
  return response.data.data
}

// ─── Admin: Mark Shift Completed ──────────────────────────────────────────────
export async function completeShiftAdmin(id) {
  const response = await api.patch(`/shifts/${id}/complete`)
  return response.data.data
}
