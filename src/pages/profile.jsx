import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";

// Consulta GraphQL para obtener los datos del usuario
const ME_QUERY = gql`
    query Me {
        me {
            id
            username
            email
        }
    }
`;

const Profile = () => {
    const { data, loading, error, refetch } = useQuery(ME_QUERY, {
        fetchPolicy: "network-only", // Siempre obtener datos actualizados
    });

    const router = useRouter();

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <p>Error al cargar los datos del usuario: {error.message}</p>
                    <Button
                        label="Reintentar"
                        icon="pi pi-refresh"
                        className="p-button-rounded p-button-warning"
                        onClick={() => refetch()}
                    />
                </div>
            </div>
        );
    }

    const { me } = data;

    // Si no hay datos de usuario, redirigir a login
    if (!me) {
        router.push("/login");
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #4caf50, #81c784)",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "300px",
                }}
            >
                <h2>Mi Perfil</h2>
                <p style={{ color: "#757575" }}>Bienvenido, {me.username}</p>
                <p>
                    <strong>Nombre de Usuario:</strong> {me.username}
                </p>
                <p>
                    <strong>Correo Electrónico:</strong> {me.email}
                </p>
                <Button
                    label="Editar Perfil"
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info p-button-outlined"
                    onClick={() => router.push("/edit-profile")}
                />
            </div>
        </div>
    );
};

export default Profile;
