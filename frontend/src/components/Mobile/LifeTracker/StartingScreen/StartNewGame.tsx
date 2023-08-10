import { Button } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import React from 'react';
import SettingSelection from './SettingSelection';
import SwitchSetting from './SwitchSetting';
import { GameSettings } from '../LifeTracker.types';

interface Props {
  gameSettings: GameSettings;
  setGameSetting: (setting: keyof GameSettings) => (value: any) => void;
  onStartGame: () => void;
}

const StartNewGame = ({ gameSettings, setGameSetting, onStartGame }: Props) => {
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
        label="Track Player Damage"
        onChange={() => setGameSetting('displayDamage')(!gameSettings.displayDamage)}
      />
      <SwitchSetting
        checked={gameSettings.useImages}
        label="Background Images"
        onChange={() => setGameSetting('useImages')(!gameSettings.useImages)}
      />
      <Button
        type="primary"
        onClick={onStartGame}
        style={{ width: '50%', alignSelf: 'flex-end', marginTop: 16, maxWidth: 250 }}
      >
        Start Game
      </Button>
    </Flex>
  );
};

export default StartNewGame;
