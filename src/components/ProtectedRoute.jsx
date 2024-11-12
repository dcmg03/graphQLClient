import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { authToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authToken) {
            router.push('/login'); // Redirige a la página de login si no está autenticado
        }
    }, [authToken, router]);

    return authToken ? children : null;
}
