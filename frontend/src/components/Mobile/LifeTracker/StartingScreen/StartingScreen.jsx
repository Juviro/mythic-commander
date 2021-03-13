import React from 'react';
import { Button } from 'antd';
import { Flex } from '../../../Elements/Shared';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import SettingSelection from './SettingSelection';
import SwitchSetting from './SwitchSetting';

export default ({ onStart }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useLocalStorage('LT-numberOfPlayers', 4);
  const [startingLife, setStartingLife] = useLocalStorage('LT-startingLife', 40);
  const [displayDamage, setDisplayDamage] = useLocalStorage('LT-displayDamage', true);
  const [useImages, setUseImages] = useLocalStorage('LT-useImages', true);

  const onStartGame = () => {
    onStart({ numberOfPlayers, startingLife, displayDamage, useImages });
  };

  return (
    <Flex
      direction="column"
      style={{ padding: 24, height: '100%' }}
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
      <SwitchSetting
        checked={displayDamage}
        label="Track Player Damage"
        onChange={() => setDisplayDamage(!displayDamage)}
      />
      <SwitchSetting
        checked={useImages}
        label="Background Images"
        onChange={() => setUseImages(!useImages)}
      />
      <Button type="primary" onClick={onStartGame}>
        Start Game
      </Button>
    </Flex>
  );
};
