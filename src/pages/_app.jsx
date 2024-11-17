import { ApolloProvider } from '@apollo/client';
import client from '../service/apollo-client';
import { AuthProvider } from '../context/AuthContext';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Navbar />
                <main style={{ minHeight: '80vh' }}>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </AuthProvider>
        </ApolloProvider>
    );
}

export default MyApp;
