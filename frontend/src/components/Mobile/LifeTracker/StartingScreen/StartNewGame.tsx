import { Button } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import React, { useContext } from 'react';
import SettingSelection from './SettingSelection';
import SwitchSetting from './SwitchSetting';
import LifeTrackerContext from '../LifeTrackerContext';

const StartNewGame = () => {
  const { gameSettings, onStart, setGameSettings } = useContext(LifeTrackerContext);

  const setGameSetting = (key) => (value) => {
    setGameSettings({ ...gameSettings, [key]: value });
  };

  return (
    <Flex direction="column" gap={16} style={{ height: '100%' }}>
      <SettingSelection
        title="Players"
        minValue={2}
        maxValue={6}
        value={gameSettings.numberOfPlayers}
        onChange={setGameSetting('numberOfPlayers')}
      />
      <SettingSelection
        step={10}
        minValue={10}
        title="Starting Life"
        value={gameSettings.startingLife}
        onChange={setGameSetting('startingLife')}
      />
      <SwitchSetting
        checked={gameSettings.displayDamage}
        label="Display commander damage"
        onChange={() => setGameSetting('displayDamage')(!gameSettings.displayDamage)}
      />
      <SwitchSetting
        checked={gameSettings.reduceLifeOnCommanderDmg}
        disabled={!gameSettings.displayDamage}
        label="Commander damage changes life"
        // eslint-disable-next-line max-len
        tooltip="When adding or removing commander damage for a player, the life total of that player will change as well."
        onChange={() =>
          setGameSetting('reduceLifeOnCommanderDmg')(
            !gameSettings.reduceLifeOnCommanderDmg
          )
        }
      />
      <Button
        type="primary"
        onClick={onStart}
        style={{ width: '50%', alignSelf: 'flex-end', marginTop: 16, maxWidth: 250 }}
      >
        Start Game
      </Button>
    </Flex>
  );
};

export default StartNewGame;
