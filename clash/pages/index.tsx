import Head from 'next/head';
import GameBrowser from '../components/GameBrowser/GameBrowser';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MYC Clash</title>
        <meta name="description" content="Play EDH Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameBrowser />
    </div>
  );
}
