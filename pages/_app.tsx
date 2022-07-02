import { ApolloProvider } from "@apollo/client";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { useEffect } from "react";
import Loading from "../components/Loading";
import client from "../lib/apollo/apollo-client";
import { checkLoggedIn } from "../lib/checkLoggedIn";
import { IUser } from "../lib/interface/user.type";
import userStore from "../store/userStore";
import "../styles/globals.scss";
import 'react-quill/dist/quill.snow.css'
import Layout from "../components/Layout";
import NextNProgress from "nextjs-progressbar";

interface MyAppProps extends AppProps {
  user: IUser | null;
}

function MyApp({ Component, pageProps, user }: MyAppProps) {
  const setUser = userStore((state) => state.setUser);

  useEffect(() => {
    if(user) setUser(user);
  }, [])

  return <ApolloProvider client={client}>
    <Layout>
      <Loading />
      <NextNProgress />
      <Component {...pageProps} />
    </Layout>
  </ApolloProvider>;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const isServer = !!appContext.ctx.req;
  if(isServer) {
    const user = await checkLoggedIn(appContext.ctx.req?.headers.cookie || '');
    return {...appProps, user}
  }
  return {...appProps}
}

export default MyApp;
