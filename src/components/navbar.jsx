import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const guestItems = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => router.push('/') },
        { label: 'Iniciar Sesión', icon: 'pi pi-fw pi-sign-in', command: () => router.push('/login') },
        { label: 'Registrar Usuario', icon: 'pi pi-fw pi-user-plus', command: () => router.push('/register') },
    ];

    const authItems = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => router.push('/') },
        { label: 'Publicaciones', icon: 'pi pi-fw pi-book', command: () => router.push('/posts') },
        { label: 'Crear Publicación', icon: 'pi pi-fw pi-plus', command: () => router.push('/posts/new') },
        { label: 'Perfil', icon: 'pi pi-fw pi-user', command: () => router.push('/profile') },
        {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
                router.push('/');
            }
        }
    ];

    return (
        <div>
            <Menubar model={isAuthenticated ? authItems : guestItems} />
        </div>
    );
}
