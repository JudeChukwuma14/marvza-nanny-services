import api from './client'

// ─── Public: FAQs ─────────────────────────────────────────────────────────────
export async function fetchFaqs(category) {
  const response = await api.get('/content/faqs', { params: category ? { category } : {} })
  return response.data.data
}

// ─── Public: Testimonials ─────────────────────────────────────────────────────
export async function fetchTestimonials() {
  const response = await api.get('/content/testimonials')
  return response.data.data
}

// ─── Admin: All FAQs (including unpublished) ─────────────────────────────────
export async function fetchAllFaqs() {
  const response = await api.get('/content/faqs/all')
  return response.data.data
}

export async function createFaq(data) {
  const response = await api.post('/content/faqs', data)
  return response.data.data
}

export async function updateFaq(id, data) {
  const response = await api.patch(`/content/faqs/${id}`, data)
  return response.data.data
}

export async function deleteFaq(id) {
  const response = await api.delete(`/content/faqs/${id}`)
  return response.data
}

// ─── Admin: All Testimonials (including unpublished) ─────────────────────────
export async function fetchAllTestimonials() {
  const response = await api.get('/content/testimonials/all')
  return response.data.data
}

export async function createTestimonial(data) {
  const response = await api.post('/content/testimonials', data)
  return response.data.data
}

export async function updateTestimonial(id, data) {
  const response = await api.patch(`/content/testimonials/${id}`, data)
  return response.data.data
}

export async function deleteTestimonial(id) {
  const response = await api.delete(`/content/testimonials/${id}`)
  return response.data
}
