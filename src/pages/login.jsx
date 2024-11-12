import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import { useRouter } from 'next/router';
import 'primeflex/primeflex.css';

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                username
                email
            }
        }
    }
`;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null); // Para almacenar mensajes de error personalizados
    const [login, { error }] = useMutation(LOGIN_MUTATION);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError(null); // Limpiar error previo
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('authToken', data.login.token); // Guardar el token
            router.push('/home'); // Redirigir al home u otra página después de iniciar sesión
        } catch (err) {
            if (err.message.includes("incorrectos")) {
                setLoginError("Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.");
            } else if (err.message.includes("no existe")) {
                setLoginError("Este usuario no está registrado. Por favor, regístrese.");
            } else {
                setLoginError("Hubo un error al iniciar sesión. Intente nuevamente más tarde.");
            }
        }
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{ minHeight: '80vh' }}>
            <Card title="Iniciar Sesión" className="p-shadow-3" style={{ maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="email">Correo Electrónico</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="p-field" style={{ marginTop: '16px' }}>
                        <label htmlFor="password">Contraseña</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            feedback={false}
                        />
                    </div>
                    <Button label="Iniciar Sesión" icon="pi pi-sign-in" type="submit" className="p-button-success p-mt-3" />
                    {loginError && (
                        <Message severity="error" text={loginError} className="p-mt-3" />
                    )}
                    {error && !loginError && (
                        <Message severity="error" text="Hubo un problema al iniciar sesión." className="p-mt-3" />
                    )}
                </form>
            </Card>
        </div>
    );
}
