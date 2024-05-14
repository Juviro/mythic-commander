import useLocalStorage from 'components/Hooks/useLocalStorage';
import React, { PropsWithChildren, useMemo } from 'react';
import { useHistory } from 'react-router';
import { GameSettings } from './LifeTracker.types';

const INITIAL_GAME_SETTINGS: GameSettings = {
  numberOfPlayers: 4,
  startingLife: 40,
  displayDamage: true,
  displayLife: true,
  useImages: true,
  reduceLifeOnCommanderDmg: true,
};

const INITIAL_GAME_STATE = {
  players: null,
  settings: INITIAL_GAME_SETTINGS,
};

interface ContextValue {
  gameSettings: GameSettings;
  setGameSettings: (gameSettings: GameSettings) => void;
  gameState: any;
  setGameState: any;
  onStart: () => void;
  onRejoin: () => void;
}

const LifeTrackerContext = React.createContext<ContextValue>(
  // @ts-ignore - this is a default value, it will be overwritten by the provider
  {}
);

export const LifeTrackerContextProvider = ({ children }: PropsWithChildren) => {
  const history = useHistory();

  const [gameState, setGameState] = useLocalStorage('LT-gameState', INITIAL_GAME_STATE);
  const [gameSettings, setGameSettings] = useLocalStorage<GameSettings>(
    'LT-gameSettings',
    INITIAL_GAME_SETTINGS
  );

  const onStart = () => {
    setGameState({ ...INITIAL_GAME_STATE, settings: gameSettings });
    history.push(`/m/life-tracker/start`);
  };

  const onRejoin = () => {
    history.push(`/m/life-tracker/start`);
  };

  const value = useMemo(() => {
    return {
      gameSettings,
      setGameSettings,
      gameState,
      setGameState,
      onStart,
      onRejoin,
    };
  }, [gameSettings, setGameSettings, gameState, setGameState, onStart, onRejoin]);

  return (
    <LifeTrackerContext.Provider value={value}>{children}</LifeTrackerContext.Provider>
  );
};

export default LifeTrackerContext;
