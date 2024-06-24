import React, { useContext } from 'react';
import Flex from 'components/Elements/Shared/Flex';
import { Typography } from 'antd';
import RejoinGame from './RejoinGame';
import StartNewGame from './StartNewGame';
import LifeTrackerContext from '../LifeTrackerContext';

const StartingScreen = () => {
  const {
    gameState: { players },
  } = useContext(LifeTrackerContext);
  const canRejoin = Boolean(players);

  return (
    <Flex
      style={{ height: '100%', padding: 24 }}
      justify="space-between"
      direction="column"
    >
      {canRejoin && (
        <Flex direction="column" gap={16} flex={1}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Resume last Game
          </Typography.Title>
          <RejoinGame />
        </Flex>
      )}
      <Flex direction="column" gap={16}>
        <Typography.Title level={3}>Start a new Game</Typography.Title>
        <StartNewGame />
      </Flex>
    </Flex>
  );
};

export default StartingScreen;
