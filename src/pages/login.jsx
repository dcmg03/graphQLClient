import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

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
    const [login, { error }] = useMutation(LOGIN_MUTATION);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('authToken', data.login.token); // Guardar el token
            router.push('/home'); // Redirigir al home u otra página después de iniciar sesión
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Iniciar Sesión</button>
            {error && <p>Error al iniciar sesión: {error.message}</p>}
        </form>
    );
}
