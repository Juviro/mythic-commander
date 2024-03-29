import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import { SocketContextProvider } from 'components/SocketContext/SocketContextProvider';
import antdTheme from '../styles/antdTheme';

import '../styles/globals.css';
import '../styles/variables.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Play - Mythic-Commander</title>
        <meta name="description" content="Play EDH Online" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SocketContextProvider>
        <ConfigProvider theme={antdTheme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </SocketContextProvider>
    </>
  );
}
