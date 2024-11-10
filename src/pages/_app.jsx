import { ApolloProvider } from '@apollo/client';
import client from '../service/apollo-client';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                <Component {...pageProps} />
            </main>
            <Footer />
        </ApolloProvider>
    );
}

export default MyApp;
