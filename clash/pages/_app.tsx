import '../styles/globals.css';
import '../styles/variables.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import { SocketContextProvider } from 'components/SocketContext/SocketContextProvider';
import antdTheme from '../styles/antdTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketContextProvider>
      <ConfigProvider theme={antdTheme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </SocketContextProvider>
  );
}
