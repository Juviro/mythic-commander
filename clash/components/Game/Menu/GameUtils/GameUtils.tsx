import React, { useContext } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';

import ManaWhiteIcon from 'public/assets/mtgicons/w.svg';
import useGameActions from 'components/Game/useGameActions';
import GameStateContext from 'components/Game/GameStateContext';
import { SwitcherOutlined } from '@ant-design/icons';

const GameUtils = () => {
  const { trackFloatingMana, toggleStackOverlay } = useGameActions();
  const { player, gameState } = useContext(GameStateContext);

  const isTrackingFloatingMana = player?.activeUtils?.floatingMana?.visible;
  const isThreePlayers = gameState?.players.length === 3;
  const isStackOverlayVisible = gameState?.stack?.visible;
  const canCloseStack = gameState?.stack?.cards.length === 0;

  const items: MenuProps['items'] = [
    {
      key: 'floating_mana',
      label: isTrackingFloatingMana
        ? 'Close floating mana overlay'
        : 'Track floating mana',
      icon: <ManaWhiteIcon />,
      onClick: () => trackFloatingMana({ visible: !isTrackingFloatingMana }),
    },
    {
      key: 'stack',
      label: `${isStackOverlayVisible ? 'Close' : 'Open'} stack overlay`,
      icon: <SwitcherOutlined />,
      disabled: !canCloseStack,
      onClick: () => toggleStackOverlay({ visible: !isStackOverlayVisible }),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement={isThreePlayers ? 'top' : 'bottomRight'}
    >
      <Button ghost>Overlays</Button>
    </Dropdown>
  );
};

export default GameUtils;
