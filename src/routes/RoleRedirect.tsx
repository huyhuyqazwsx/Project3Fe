import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/hooks/auth/useAuth.ts';

export default function RoleRedirect() {
    const {user, loading} = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    switch (user.role) {
        case 'ADMIN':
            return <Navigate to="/admin" replace />;

        case 'TEACHER':
            return <Navigate to="/teacher" replace />;

        case 'STUDENT':
            return <Navigate to="/dashboard" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
}