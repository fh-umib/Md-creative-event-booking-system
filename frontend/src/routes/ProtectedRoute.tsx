import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  const storedToken = localStorage.getItem('md_auth_token');
  const storedUserRaw = localStorage.getItem('md_auth_user');

  let storedUser: { role?: string } | null = null;

  try {
    storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
  } catch {
    storedUser = null;
  }

  const hasStoredSession = Boolean(storedToken && storedUser);

  if (isLoading) {
    return <p style={{ padding: '24px' }}>Loading...</p>;
  }

  if (!isAuthenticated && !hasStoredSession) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const currentUser = user || storedUser;

  if (allowedRoles && currentUser) {
    const normalizedRole = currentUser.role?.toLowerCase?.() || '';
    const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

    if (!normalizedAllowedRoles.includes(normalizedRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}