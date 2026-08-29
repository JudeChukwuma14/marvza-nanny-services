import api from './client'

/**
 * Submit a parent's nanny request (enquiry).
 * @param {object} data - Form values collected across the request-nanny steps
 * @returns {Promise<{ reference: string }>}
 */
export async function submitEnquiry(data) {
  const response = await api.post('/enquiries', data)
  const { enquiryReference, reference } = response.data.data
  return { reference: reference || enquiryReference }
}

// ─── Admin: Fetch All Enquiries ───────────────────────────────────────────────
export async function fetchEnquiries(params = {}) {
  const response = await api.get('/enquiries', { params })
  return response.data
}

// ─── Admin: Fetch Single Enquiry ──────────────────────────────────────────────
export async function fetchEnquiry(id) {
  const response = await api.get(`/enquiries/${id}`)
  return response.data.data
}

// ─── Admin: Update Enquiry Status ─────────────────────────────────────────────
export async function updateEnquiryStatus(id, status) {
  const response = await api.patch(`/enquiries/${id}/status`, { status })
  return response.data.data
}

// ─── Admin: Add Note ──────────────────────────────────────────────────────────
export async function addEnquiryNote(id, text) {
  const response = await api.post(`/enquiries/${id}/notes`, { text })
  return response.data.data
}

// ─── Admin: Get Notes ─────────────────────────────────────────────────────────
export async function getEnquiryNotes(id) {
  const response = await api.get(`/enquiries/${id}/notes`)
  return response.data.data
}
