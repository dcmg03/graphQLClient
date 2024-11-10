export const isAuthenticated = (context) => {
    // Lógica de autenticación
    const token = context.req.cookies.token;
    if (!token) {
        throw new Error("No autenticado");
    }
};
