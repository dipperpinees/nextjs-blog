import { ApolloProvider } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import AlertSnackbar from '../components/Alert';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { client } from '../lib/apollo';
import { checkLoggedIn } from '../lib/checkLoggedIn';
import { IUser } from '../lib/type';
import { userStore } from '../store';
import '../styles/globals.scss';

interface MyAppProps extends AppProps {
    user: IUser | null;
}

function MyApp({ Component, pageProps, user }: MyAppProps) {
    const setUser = userStore((state) => state.setUser);

    useEffect(() => {
        if (user) setUser(user);
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                light: '#02ac6d',
                main: '#00A266',
                dark: '#02ac6d',
                contrastText: '#fff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <Head>
                    <title>BLOGIFY</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
                </Head>
                <Layout>
                    <AlertSnackbar />
                    <Loading />
                    <NextNProgress />
                    <Component {...pageProps} />
                </Layout>
            </ApolloProvider>
        </ThemeProvider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const isServer = !!appContext.ctx.req;
    if (isServer) {
        const user = await checkLoggedIn(appContext.ctx.req?.headers.cookie || '');
        return { ...appProps, user };
    }
    return { ...appProps };
};

export default MyApp;
