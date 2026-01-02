import { Navigate, useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import { authAtom } from '../store/authAtom'

function ProtectedRoute({ children, role }) {
  const [auth] = useAtom(authAtom)
  const location = useLocation()

  // Not logged in → redirect to sign in
  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location }}
      />
    )
  }

  // Role-based protection (optional)
  if (role && auth.role !== role) {
    return <Navigate to="/" replace />
  }

  // Allowed
  return children
}

export default ProtectedRoute
