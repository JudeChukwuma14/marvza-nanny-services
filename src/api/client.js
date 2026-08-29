import axios from 'axios'

// ─── Axios instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://nannypro-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nanny_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global response interceptor — handle 401 by clearing stale tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nanny_admin_token')
    }
    return Promise.reject(error)
  }
)

// ─── Helper: extract error message ───────────────────────────────────────────
export function extractError(err) {
  return err?.response?.data?.message || err?.message || 'Something went wrong'
}

export default api
