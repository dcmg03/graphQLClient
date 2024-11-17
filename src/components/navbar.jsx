import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-green/theme.css'; // Tema verde
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    // Elementos visibles para usuarios no autenticados
    const guestItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => router.push('/'),
        },
        {
            label: 'Iniciar Sesión',
            icon: 'pi pi-sign-in',
            command: () => router.push('/login'),
        },
        {
            label: 'Registrar Usuario',
            icon: 'pi pi-user-plus',
            command: () => router.push('/register'),
        },
    ];

    // Elementos visibles para usuarios autenticados
    const authItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => router.push('/home'),
        },
        {
            label: 'Mis Publicaciones',
            icon: 'pi pi-list',
            command: () => router.push('/postList'),
        },
        {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: logout,
        },
    ];

    // Botón de inicio (a la izquierda)
    const start = (
        <Button
            icon="pi pi-globe"
            label="TallerGraphQL"
            className="p-button-text p-button-lg"
            onClick={() => router.push('/')}
        />
    );

    // Botón de perfil (a la derecha) si el usuario está autenticado
    const end = isAuthenticated ? (
        <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-info"
            tooltip="Mi Perfil"
            onClick={() => router.push('/profile')}
        />
    ) : null;

    return (
        <div>
            <Menubar
                model={isAuthenticated ? authItems : guestItems}
                start={start}
                end={end}
                style={{
                    background: 'linear-gradient(to right, #2e7d32, #81c784)',
                    color: '#ffffff',
                    borderBottom: '3px solid #1b5e20',
                    fontSize: '1rem',
                }}
            />
        </div>
    );
};

export default Navbar;
