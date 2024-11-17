import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-green/theme.css'; // Tema mejorado
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Register() {
    const { register } = useAuth(); // Contexto para manejar registro
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(to bottom right, #2e7d32, #81c784)',
            }}
        >
            <Card
                title="Registro de Usuario"
                subTitle="Crea una nueva cuenta"
                className="p-shadow-6"
                style={{
                    width: '25rem',
                    borderRadius: '12px',
                    background: '#ffffff',
                }}
            >
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu nombre de usuario"
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Correo Electrónico</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Contraseña</label>
                        <InputText
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    {error && (
                        <div className="p-field" style={{ color: 'red', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        label="Registrar"
                        icon="pi pi-user-plus"
                        className="p-button-rounded p-button-success p-mt-3"
                        style={{ width: '100%' }}
                    />
                </form>
            </Card>
        </div>
    );
}
