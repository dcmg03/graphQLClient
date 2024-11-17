import React, {useState, useRef} from 'react';
import {gql, useMutation} from '@apollo/client';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {useRouter} from 'next/router';

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            token
            user {
                id
                username
                email
            }
        }
    }
`;

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register] = useMutation(REGISTER_MUTATION);
    const router = useRouter();
    const toast = useRef(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({variables: {username, email, password}});
            toast.current.show({
                severity: 'success',
                summary: 'Registro Exitoso',
                detail: 'Usuario creado correctamente',
                life: 3000,
            });
            router.push('/home'); // Redirige al home después del registro
        } catch (error) {
            if (error.message.includes('duplicate key')) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error de Registro',
                    detail: 'El nombre de usuario o el correo electrónico ya están registrados.',
                    life: 5000,
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error al registrar usuario',
                    detail: error.message,
                    life: 5000,
                });
            }
        }
    };


    return (
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <Toast ref={toast}/>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleRegister}>
                <div className="p-field">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="p-field">
                    <label htmlFor="email">Correo Electrónico</label>
                    <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                </div>
                <div className="p-field">
                    <label htmlFor="password">Contraseña</label>
                    <InputText id="password" type="password" value={password}
                               onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <Button label="Registrar" icon="pi pi-user-plus" type="submit" className="p-button-success"/>
            </form>
        </div>
    );
}
