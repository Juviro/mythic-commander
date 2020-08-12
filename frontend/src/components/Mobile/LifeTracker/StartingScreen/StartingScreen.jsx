import React from 'react';
import { Button, Checkbox } from 'antd';
import { Flex } from '../../../Elements/Shared';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import SettingSelection from './SettingSelection';

export default ({ onStart }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useLocalStorage('LT-numberOfPlayers', 4);
  const [startingLife, setStartingLife] = useLocalStorage('LT-startingLife', 40);
  const [displayDamage, setDisplayDamage] = useLocalStorage('LT-displayDamage', true);

  const onStartGame = () => {
    onStart({ numberOfPlayers, startingLife, displayDamage });
  };

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
          step={10}
          minValue={10}
          title="Starting Life"
          value={startingLife}
          onChange={setStartingLife}
        />
      </Flex>
      <Checkbox
        checked={displayDamage}
        onChange={() => setDisplayDamage(!displayDamage)}
        style={{ fontWeight: 400, fontSize: 18 }}
      >
        Display Damage Tracker
      </Checkbox>
      <Button type="primary" onClick={onStartGame}>
        Start Game
      </Button>
    </Flex>
  );
};
