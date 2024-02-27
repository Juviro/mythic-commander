import React, { CSSProperties, useContext } from 'react';

import { Card, FaceDownCard } from 'backend/database/gamestate.types';

import { EyeOutlined } from '@ant-design/icons';
import { getColorVariable } from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import { Tooltip } from 'antd';
import GameStateContext from 'components/Game/GameStateContext';
import styles from './CardVisibility.module.css';

interface Props {
  card: Card;
}

const isFaceDownCard = (card: Card): card is FaceDownCard => {
  return Boolean('faceDown' in card && card.faceDown);
};

const CardVisibility = ({ card }: Props) => {
  const { playerNames, gameState } = useContext(GameStateContext);

  if (!isFaceDownCard(card)) {
    return null;
  }

  if (!card.visibleTo?.length) {
    return null;
  }

  const getColor = () => {
    if (card.visibleTo!.length === 1) {
      return getColorVariable(card.visibleTo![0]);
    }

    // make sure the order is always the same
    const playerIds = gameState!.players
      .map((player) => player.id)
      .filter((id) => card.visibleTo!.includes(id));

    const colorVariable = playerIds.map((id) => getColorVariable(id)).join(', ');
    return `linear-gradient(135deg, ${colorVariable})`;
  };

  const style: CSSProperties = {
    background: getColor(),
  };

  const playerNamesLabel = card.visibleTo?.map((id) => playerNames[id]).join(', ');
  const tooltipContent = `Visible to: ${playerNamesLabel}`;

  return (
    <div className={styles.wrapper}>
      <Tooltip title={tooltipContent}>
        <EyeOutlined className={styles.icon} style={style} />
      </Tooltip>
    </div>
  );
};

export default CardVisibility;
