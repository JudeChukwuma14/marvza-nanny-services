import { Navigate, useLocation } from 'react-router-dom'

export default function AdminProtectedRoute({ children }) {
  const location = useLocation()
  // Check for JWT token instead of the old boolean flag
  const isAuthenticated = !!localStorage.getItem('nanny_admin_token')

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
