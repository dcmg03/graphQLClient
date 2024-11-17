import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login'); // Redirige a la página de login si no está autenticado
        }
    }, [isAuthenticated, loading, router]);

    return !loading &&isAuthenticated ? children : null;
}
