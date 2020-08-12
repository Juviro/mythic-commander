import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { withRouter, Switch, Route } from 'react-router-dom';

import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';
import { Flex } from '../../Elements/Shared';

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

  return (
    <Flex style={{ width: '100%', height: '100%' }} direction="column">
      <FullScreen handle={handle}>
        <Switch>
          <Route
            path="/m/life-tracker"
            exact
            render={() => <StartingScreen onStart={onStart} />}
          />
          <Route
            path="/m/life-tracker/start"
            render={() => <GameScreen gameSettings={gameSettings} handle={handle} />}
          />
        </Switch>
      </FullScreen>
    </Flex>
  );
};

export default withRouter(LifeTracker);
