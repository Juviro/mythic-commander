import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { withRouter, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';
import { Flex } from '../../Elements/Shared';

const StyledWrapper = styled.div`
  flex-flow: column;
  display: flex;
  height: calc(100% - 50px);
`;

const LifeTracker = ({ history }) => {
  const [gameSettings, setGameSettings] = useState({});
  const handle = useFullScreenHandle();

  const onStart = (newGameSettings) => {
    setGameSettings(newGameSettings);
    history.push(`/m/life-tracker/start`);
  };

  useDocumentTitle('Life Tracker');

  return (
    <StyledWrapper>
      <Flex style={{ width: '100%', flexGrow: 1 }} direction="column">
        <FullScreen handle={handle}>
          <Switch>
            <Route
              path="/m/life-tracker"
              exact
              render={() => <StartingScreen onStart={onStart} />}
            />
            <Route
              path="/m/life-tracker/start"
              render={() => (
                <GameScreen
                  gameSettings={gameSettings}
                  handle={handle}
                  displayDamage={gameSettings.displayDamage}
                />
              )}
            />
          </Switch>
        </FullScreen>
      </Flex>
    </StyledWrapper>
  );
};

export default withRouter(LifeTracker);
