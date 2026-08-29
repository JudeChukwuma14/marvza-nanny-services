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

export async function fetchEnquiries(params = {}) {
  // Admin placeholder
  const response = await api.get('/enquiries', { params })
  return response.data
}

export async function fetchEnquiry(id) {
  // Admin placeholder
  const response = await api.get(`/enquiries/${id}`)
  return response.data.data
}
