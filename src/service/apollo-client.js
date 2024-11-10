import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000', // Cambia a la URL de tu API
    cache: new InMemoryCache(),
});

export default client;
