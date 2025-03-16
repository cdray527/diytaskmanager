import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalLayout } from '@diytaskmanager/libs-frontend-ui';
import './styles.css';

function DashboardApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to dashboard!</title>
            </Head>
            <main className="app">
                <GlobalLayout>
                    <Component {...pageProps} />
                </GlobalLayout>
            </main>
        </>
    );
}

export default DashboardApp;
