import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ApplyPage from '../pages/ApplyPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminApplicationsPage from '../pages/admin/AdminApplicationsPage'
import AdminApplicationDetailPage from '../pages/admin/AdminApplicationDetailPage'
import AdminProtectedRoute from '../pages/admin/AdminProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public candidate routes */}
        <Route path="/" element={<Navigate to="/apply" replace />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/confirmation" element={<ConfirmationPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <AdminApplicationsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:id"
          element={
            <AdminProtectedRoute>
              <AdminApplicationDetailPage />
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/applications" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
