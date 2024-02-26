import React, { useContext } from 'react';
import { Popover, Tooltip } from 'antd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import StackedCardList from 'components/GameComponents/StackedCardList/StackedCardList';
import GameStateContext from 'components/Game/GameStateContext';
import { DndItemTypes, DropCard, DropCardGroup } from 'types/dnd.types';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import { pluralizeCards } from 'utils/i18nUtils';
import CardStack from '../CardStack/CardStack';

import styles from './Graveyard.module.css';
import useGraveyardActions from './useGraveyardActions';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Graveyard = ({ player }: Props) => {
  const { onMoveCard } = useGameActions();
  const { getPlayerColor } = useContext(GameStateContext);
  const { graveyard } = player.zones;

  const cards = graveyard.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = (dropElement: DropCard | DropCardGroup) => {
    if ('cardIds' in dropElement) {
      dropElement.cardIds.forEach((clashId) =>
        onMoveCard(clashId, ZONES.GRAVEYARD, player.id)
      );
      return;
    }
    onMoveCard(dropElement.clashId, ZONES.GRAVEYARD, player.id);
  };

  const graveyardActions = useGraveyardActions({
    player,
    cardIds: graveyard.map(({ clashId }) => clashId),
  });

  const title = `Graveyard: ${pluralizeCards(graveyard.length, 'one')}`;

  return (
    <Tooltip title={title} mouseEnterDelay={0.5}>
      <ContextMenu items={graveyardActions}>
        <Popover
          trigger="click"
          placement="topLeft"
          title={title}
          open={cards.length ? undefined : false}
          content={
            <StackedCardList
              cards={graveyard}
              draggable
              color={getPlayerColor(player.id)}
              zone={ZONES.GRAVEYARD}
            />
          }
        >
          <div className={styles.wrapper}>
            <Dropzone
              onDrop={onDrop}
              acceptFromPlayerId={player.id}
              accept={[
                DndItemTypes.CARD,
                DndItemTypes.LIST_CARD,
                DndItemTypes.CARD_GROUP,
              ]}
            >
              <CardStack
                cards={cards}
                emptyImage={<GraveyardImage />}
                draggable
                zone="graveyard"
              />
            </Dropzone>
          </div>
        </Popover>
      </ContextMenu>
    </Tooltip>
  );
};

export default Graveyard;
