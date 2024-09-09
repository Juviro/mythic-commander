import React, { useContext } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';

import ManaWhiteIcon from 'public/assets/mtgicons/w.svg';
import useGameActions from 'components/Game/useGameActions';
import GameStateContext from 'components/Game/GameStateContext';

const GameUtils = () => {
  const { trackFloatingMana } = useGameActions();
  const { player } = useContext(GameStateContext);

  const isTrackingFloatingMana = player?.activeUtils?.floatingMana;

  const items: MenuProps['items'] = [
    {
      key: 'floating_mana',
      label: 'Track floating mana',
      icon: <ManaWhiteIcon />,
      onClick: () => trackFloatingMana({ visible: !isTrackingFloatingMana }),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="topRight">
      <Button ghost>Game Utils</Button>
    </Dropdown>
  );
};

export default GameUtils;
