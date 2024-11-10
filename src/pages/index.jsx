import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Bienvenido a la API de Gestión de Publicaciones</h1>
            <p>Accede o regístrate para empezar a crear y gestionar publicaciones.</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <Card title="Iniciar Sesión" style={{ width: '200px' }}>
                    <Button label="Login" icon="pi pi-sign-in" className="p-button" onClick={() => window.location.href = '/login'} />
                </Card>
                <Card title="Registrar Usuario" style={{ width: '200px' }}>
                    <Button label="Registro" icon="pi pi-user-plus" className="p-button" onClick={() => window.location.href = '/register'} />
                </Card>
            </div>
        </div>
    );
}
