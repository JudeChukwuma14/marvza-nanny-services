import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Baby, Lock } from 'lucide-react'
import FormField, { Input } from '../../components/ui/FormField'
import { adminLogin } from '../../api/applications'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from?.pathname || '/admin/applications'

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await adminLogin(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid email or password'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F4C5C] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center bg-[#F7F5F0] border-b border-[#E4E7EC]">
          <div className="w-12 h-12 rounded-xl bg-[#0F4C5C] flex items-center justify-center mx-auto mb-4">
            <Baby size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#17202A]">NannyPro Admin</h1>
          <p className="text-sm text-[#667085] mt-1">Sign in to manage applications</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 flex flex-col gap-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-[#C62828] text-center">
              {error}
            </div>
          )}

          <FormField label="Email address" htmlFor="admin-email">
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@nannypro.co.uk"
              required
              autoComplete="email"
            />
          </FormField>

          <FormField label="Password" htmlFor="admin-password">
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </FormField>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#D98B5F] text-white text-sm font-semibold hover:bg-[#C27A4E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Lock size={16} />
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
