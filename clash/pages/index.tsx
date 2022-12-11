import { Button } from 'antd';
import Head from 'next/head';
import GameBrowser from '../components/GameBrowser/GameBrowser';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MYC Clash</title>
        <meta name="description" content="App in progress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameBrowser />
      <Button>Test Button</Button>
    </div>
  );
}
