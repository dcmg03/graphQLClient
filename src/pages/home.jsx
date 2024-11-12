import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Bienvenido al Home de Usuario</h1>
                <p>Esta es tu página principal después de iniciar sesión.</p>
                <p>Aquí puedes acceder a tus publicaciones, crear nuevas publicaciones, ver tu perfil, etc.</p>
            </div>
        </ProtectedRoute>
    );
}
