import api, { extractError } from './client'

// ─── Public: Submit Application ───────────────────────────────────────────────
/**
 * Submit the complete candidate application.
 * Sends as multipart/form-data so files are included.
 *
 * @param {FormData} formData - Prepared FormData object
 * @returns {Promise<{ reference: string }>}
 */
export async function submitApplication(formData) {
  const response = await api.post('/applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  const { applicationReference } = response.data.data
  return { reference: applicationReference }
}

// ─── Admin: Fetch All Applications ───────────────────────────────────────────
/**
 * @param {{ page?, limit?, status?, search?, sortBy?, sortOrder? }} params
 */
export async function fetchApplications(params = {}) {
  const response = await api.get('/applications', { params })
  // Returns { data: [], pagination: {} }
  return response.data
}

// ─── Admin: Fetch Single Application ─────────────────────────────────────────
export async function fetchApplication(id) {
  const response = await api.get(`/applications/${id}`)
  return response.data.data
}

// ─── Admin: Update Application Status ────────────────────────────────────────
export async function updateApplicationStatus(id, status) {
  const response = await api.patch(`/applications/${id}/status`, { status })
  return response.data.data
}

// ─── Admin: Add Note ──────────────────────────────────────────────────────────
export async function addNote(id, text) {
  const response = await api.post(`/applications/${id}/notes`, { text })
  return response.data.data
}

// ─── Admin: Get Notes ─────────────────────────────────────────────────────────
export async function getNotes(id) {
  const response = await api.get(`/applications/${id}/notes`)
  return response.data.data
}

// ─── Admin: Get Documents (signed URLs) ──────────────────────────────────────
export async function getDocuments(id) {
  const response = await api.get(`/applications/${id}/documents`)
  return response.data.data
}

// ─── Admin: Delete Document ───────────────────────────────────────────────────
export async function deleteDocument(applicationId, documentId) {
  const response = await api.delete(`/applications/${applicationId}/documents/${documentId}`)
  return response.data
}

// ─── Admin: Login ─────────────────────────────────────────────────────────────
export async function adminLogin(email, password) {
  const response = await api.post('/admin/login', { email, password })
  const { token, admin } = response.data.data
  localStorage.setItem('nanny_admin_token', token)
  return { token, admin }
}

// ─── Admin: Logout ────────────────────────────────────────────────────────────
export function adminLogout() {
  localStorage.removeItem('nanny_admin_token')
}

// ─── Admin: Get current admin profile ────────────────────────────────────────
export async function getAdminMe() {
  const response = await api.get('/admin/me')
  return response.data.data
}

// ─── Admin: Get Dashboard Stats ──────────────────────────────────────────────
export async function getAdminStats() {
  const response = await api.get('/admin/stats')
  return response.data.data
}

export { extractError }
export default api
