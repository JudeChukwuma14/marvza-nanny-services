import api from './client'

// ─── Admin: Fetch All Documents (cross-application) ──────────────────────────
export async function fetchAllDocuments(params = {}) {
  const response = await api.get('/documents', { params })
  return response.data.data
}

// ─── Admin: Fetch a Signed URL for One Document ──────────────────────────────
export async function fetchDocumentUrl(applicationId, documentId) {
  const response = await api.get(`/documents/${applicationId}/${documentId}/url`)
  return response.data.data.signedUrl
}
