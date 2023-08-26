import GameBrowser from '../components/GameBrowser/GameBrowser';
import { GameBrowserContextProvider } from '../components/GameBrowser/GameBrowserContext';

export default function Home() {
  return (
    <div>
      <GameBrowserContextProvider>
        <GameBrowser />
      </GameBrowserContextProvider>
    </div>
  );
}
