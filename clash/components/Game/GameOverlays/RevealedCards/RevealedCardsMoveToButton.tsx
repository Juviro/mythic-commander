import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { Player, ZONES } from 'backend/database/gamestate.types';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import React from 'react';

interface Props {
  player: Player;
}

const RevealedCardsMoveToButton = ({ player }: Props) => {
  const cardIds = player.revealedCards!.cards.map((card) => card.clashId) || [];

  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.BATTLEFIELD,
  });

  return (
    <Dropdown menu={{ items: moveCardActions }}>
      <Button icon={<ArrowRightOutlined />}>Move all cards to...</Button>
    </Dropdown>
  );
};

export default RevealedCardsMoveToButton;
