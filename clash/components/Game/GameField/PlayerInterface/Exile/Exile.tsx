import React, { useContext } from 'react';
import { Popover, Tooltip } from 'antd';
import { useDrop } from 'react-dnd';

import { Player } from 'backend/database/gamestate.types';
import ExileImage from 'public/assets/icons/exile.svg';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import Card from 'components/GameComponents/Card/Card';
import { pluralizeCards } from 'components/Game/Menu/Chat/ChatMessages/util';
import StackedCardList from 'components/GameComponents/StackedCardList/StackedCardList';
import GameStateContext from 'components/Game/GameStateContext';
import { DndItemTypes, DropCard } from 'types/dnd.types';

import styles from './Exile.module.css';

interface Props {
  player: Player;
}

const Exile = ({ player }: Props) => {
  const { onMoveCard } = useGameActions();
  const { getPlayerColor } = useContext(GameStateContext);

  const [{ canDrop }] = useDrop({
    accept: DndItemTypes.CARD,
    canDrop: ({ ownerId }: DropCard) => {
      return ownerId === player.id;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const onDrop = (card: DropCard) => {
    onMoveCard(card.clashId, 'exile', player.id);
  };

  const cards = player.zones.exile;
  const hasCards = cards.length > 0;

  if (!hasCards && !canDrop) {
    // it's important to always render something,
    // otherwise chrome will crash for some reason
    return <div />;
  }

  const title = `Exile: ${pluralizeCards(cards.length, 'one')}`;

  return (
    <Tooltip title={title} mouseEnterDelay={0.5}>
      <Popover
        trigger="click"
        title={title}
        content={
          <StackedCardList cards={cards} draggable color={getPlayerColor(player.id)} />
        }
      >
        <div className={styles.wrapper}>
          <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id}>
            <div className={styles.inner}>
              <ExileImage />
              {cards.map((card) => (
                <div key={card.clashId} className={styles.card}>
                  <Card card={card} dynamicSize zone="exile" />
                </div>
              ))}
            </div>
          </Dropzone>
        </div>
      </Popover>
    </Tooltip>
  );
};

export default Exile;
