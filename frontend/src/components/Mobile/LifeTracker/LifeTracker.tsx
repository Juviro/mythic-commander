import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Switch, Route } from 'react-router-dom';

import styled from 'styled-components';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import Flex from 'components/Elements/Shared/Flex';
import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';
import { LifeTrackerContextProvider } from './LifeTrackerContext';

const StyledWrapper = styled.div`
  flex-flow: column;
  display: flex;
  height: 100%;
`;

const LifeTracker = () => {
  const handle = useFullScreenHandle();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentTitle('Life Tracker');

  return (
    <LifeTrackerContextProvider>
      <StyledWrapper>
        <Flex
          style={{ width: '100%', flexGrow: 1, position: 'relative' }}
          direction="column"
        >
          <FullScreen handle={handle}>
            <Switch>
              <Route path="/m/life-tracker" exact render={() => <StartingScreen />} />
              <Route
                path="/m/life-tracker/start"
                render={() => <GameScreen handle={handle} />}
              />
            </Switch>
          </FullScreen>
        </Flex>
      </StyledWrapper>
    </LifeTrackerContextProvider>
  );
};

export default LifeTracker;
