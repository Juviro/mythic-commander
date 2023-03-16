import '../styles/globals.css';
import '../styles/variables.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import antdTheme from '../styles/antdTheme';
import { SocketContextProvider } from '../contexts/SocketProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketContextProvider>
      <ConfigProvider theme={antdTheme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </SocketContextProvider>
  );
}
