import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalLayout, GlobalProvider } from '@diytaskmanager/libs-frontend-ui';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function DashboardApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Dashboard~</title>
            </Head>
            <main className="app">
                <GlobalProvider>
                    <GlobalLayout>
                        <Component {...pageProps} />
                    </GlobalLayout>
                </GlobalProvider>
            </main>
        </>
    );
}

export default DashboardApp;
