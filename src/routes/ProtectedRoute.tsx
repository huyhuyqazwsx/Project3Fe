import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/hooks/auth/useAuth.ts';
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
