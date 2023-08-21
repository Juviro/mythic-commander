import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useHistory, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import Flex from 'components/Elements/Shared/Flex';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';
import { GameSettings } from './LifeTracker.types';

const StyledWrapper = styled.div`
  flex-flow: column;
  display: flex;
  height: 100%;
`;

const INITIAL_GAME_SETTINGS = {
  numberOfPlayers: 4,
  startingLife: 40,
  displayDamage: true,
  displayLife: true,
  useImages: true,
};

const INITIAL_GAME_STATE = {
  players: null,
  settings: INITIAL_GAME_SETTINGS,
};

const LifeTracker = () => {
  const history = useHistory();
  const [gameSettings, setGameSettings] = useLocalStorage<GameSettings>(
    'LT-gameSettings',
    INITIAL_GAME_SETTINGS
  );
  const [gameState, setGameState] = useLocalStorage('LT-gameState', INITIAL_GAME_STATE);

  const handle = useFullScreenHandle();

  const onStart = () => {
    setGameState({ ...INITIAL_GAME_STATE, settings: gameSettings });
    history.push(`/m/life-tracker/start`);
  };

  const onRejoin = () => {
    history.push(`/m/life-tracker/start`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentTitle('Life Tracker');

  return (
    <StyledWrapper>
      <Flex
        style={{ width: '100%', flexGrow: 1, position: 'relative' }}
        direction="column"
      >
        <FullScreen handle={handle}>
          <Switch>
            <Route
              path="/m/life-tracker"
              exact
              render={() => (
                <StartingScreen
                  canRejoin={Boolean(gameState.players)}
                  onStart={onStart}
                  onRejoin={onRejoin}
                  players={gameState.players}
                  gameSettings={gameSettings}
                  setGameSettings={setGameSettings}
                />
              )}
            />
            <Route
              path="/m/life-tracker/start"
              render={() => (
                <GameScreen
                  handle={handle}
                  gameState={gameState}
                  setGameState={setGameState}
                  gameSettings={gameState.settings}
                />
              )}
            />
          </Switch>
        </FullScreen>
      </Flex>
    </StyledWrapper>
  );
};

export default LifeTracker;
