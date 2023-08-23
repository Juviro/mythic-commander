import '../styles/globals.css';
import '../styles/variables.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import antdTheme from '../styles/antdTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
