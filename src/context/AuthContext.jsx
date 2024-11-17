import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                me {
                                    id
                                    username
                                    email
                                }
                            }
                        `,
                    }),
                });

                const { data, errors } = await res.json();

                if (errors) {
                    console.error('Error al autenticar:', errors);
                    setIsAuthenticated(false);
                } else if (data?.me) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation {
                            login(email: "${email}", password: "${password}") {
                                user {
                                    id
                                    username
                                    email
                                }
                            }
                        }
                    `,
                }),
            });

            const { data, errors } = await res.json();

            if (errors) {
                throw new Error(errors[0].message);
            }

            setIsAuthenticated(true);
            router.push('/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation {
                            logout
                        }
                    `,
                }),
            });
            setIsAuthenticated(false);
            router.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
