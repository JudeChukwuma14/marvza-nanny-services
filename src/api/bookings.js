import api from './client'

export async function fetchBookings(params = {}) {
  const response = await api.get('/bookings', { params })
  return response.data
}

export async function fetchBooking(id) {
  const response = await api.get(`/bookings/${id}`)
  return response.data.data
}
