import React from 'react';
import { Button } from 'antd';
import { Flex } from '../../../Elements/Shared';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import SettingSelection from './SettingSelection';

export default ({ onStart }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useLocalStorage('LT-numberOfPlayers', 4);
  const [startingLife, setStartingLife] = useLocalStorage('LT-startingLife', 40);

  return (
    <Flex
      direction="column"
      style={{ padding: 24, height: 'calc(100% - 50px)' }}
      justify="space-between"
    >
      <Flex direction="column">
        <SettingSelection
          title="Players"
          minValue={2}
          maxValue={6}
          value={numberOfPlayers}
          onChange={setNumberOfPlayers}
        />
        <SettingSelection
          step={1}
          minValue={10}
          title="Starting Life"
          value={startingLife}
          onChange={setStartingLife}
        />
      </Flex>
      <Button type="primary" onClick={() => onStart({ numberOfPlayers, startingLife })}>
        Start Game
      </Button>
    </Flex>
  );
};
