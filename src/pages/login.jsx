import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-green/theme.css'; // Tema mejorado
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
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
                title="Iniciar Sesión"
                subTitle="Bienvenido de nuevo"
                className="p-shadow-6"
                style={{
                    width: '25rem',
                    borderRadius: '12px',
                    background: '#ffffff',
                }}
            >
                <form onSubmit={handleSubmit} className="p-fluid">
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
                        label="Iniciar Sesión"
                        icon="pi pi-sign-in"
                        className="p-button-rounded p-button-success p-mt-3"
                        style={{ width: '100%' }}
                    />
                </form>
            </Card>
        </div>
    );
}
