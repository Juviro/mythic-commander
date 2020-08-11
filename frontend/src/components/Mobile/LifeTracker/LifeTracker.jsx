import React, { useState } from 'react';
import styled from 'styled-components';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { withRouter, Switch, Route } from 'react-router-dom';
import { FullscreenOutlined } from '@ant-design/icons';

import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';
import { Flex } from '../../Elements/Shared';

const StyledFullscreenIcon = styled(FullscreenOutlined)`
  position: absolute;
  right: 0;
  font-size: 42px;
  z-index: 99;
`;

const LifeTracker = ({ history }) => {
  const [gameSettings, setGameSettings] = useState({});
  const handle = useFullScreenHandle();

  const onStart = newGameSettings => {
    setGameSettings(newGameSettings);
    history.push(`/m/life-tracker/start`);
    // handle.enter();
  };

  // TODO: remove
  // React.useEffect(() => {
  //   setTimeout(() => onStart({ numberOfPlayers: 5, startingLife: 40 }), 500);
  //   // eslint-disable-next-line
  // }, []);
  const hasStarted = history.location.pathname.includes('/m/life-tracker/start');

  return (
    <Flex style={{ width: '100%', height: '100%' }} direction="column">
      {hasStarted && <StyledFullscreenIcon onClick={handle.enter} />}
      <FullScreen handle={handle}>
        <Switch>
          <Route
            path="/m/life-tracker"
            exact
            render={() => <StartingScreen onStart={onStart} />}
          />
          <Route
            path="/m/life-tracker/start"
            render={() => <GameScreen gameSettings={gameSettings} />}
          />
        </Switch>
      </FullScreen>
    </Flex>
  );
};

export default withRouter(LifeTracker);
