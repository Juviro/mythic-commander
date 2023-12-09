import React, { useContext } from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import { Popover, Tooltip } from 'antd';
import { pluralizeCards } from 'components/Game/Menu/Chat/ChatMessages/util';
import StackedCardList from 'components/GameComponents/StackedCardList/StackedCardList';
import GameStateContext from 'components/Game/GameStateContext';
import CardStack from '../CardStack/CardStack';

import styles from './Graveyard.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Graveyard = ({ player }: Props) => {
  const { onMoveCard } = useGameActions();
  const { getPlayerColor } = useContext(GameStateContext);
  const { graveyard } = player.zones;

  const cards = graveyard.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.GRAVEYARD, player.id);
  };

  const title = `Graveyard: ${pluralizeCards(graveyard.length, 'one')}`;

  return (
    <Tooltip title={title}>
      <Popover
        trigger="click"
        placement="topLeft"
        title={title}
        open={cards.length ? undefined : false}
        content={
          <StackedCardList cards={cards} draggable color={getPlayerColor(player.id)} />
        }
      >
        <div className={styles.wrapper}>
          <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id}>
            <CardStack
              cards={cards}
              emptyImage={<GraveyardImage />}
              draggable
              zone="graveyard"
              canHover
            />
          </Dropzone>
        </div>
      </Popover>
    </Tooltip>
  );
};

export default Graveyard;
