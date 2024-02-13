import GameBrowser from '../components/GameBrowser/GameBrowser';
import { GameBrowserContextProvider } from '../components/GameBrowser/GameBrowserContext';

export default function Home() {
  return (
    <GameBrowserContextProvider>
      <GameBrowser />
    </GameBrowserContextProvider>
  );
}
