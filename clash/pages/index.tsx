import Head from 'next/head';

import GameBrowser from '../components/GameBrowser/GameBrowser';
import { GameBrowserContextProvider } from '../components/GameBrowser/GameBrowserProvider';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MYC Clash</title>
        <meta name="description" content="Play EDH Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameBrowserContextProvider>
        <GameBrowser />
      </GameBrowserContextProvider>
    </div>
  );
}
