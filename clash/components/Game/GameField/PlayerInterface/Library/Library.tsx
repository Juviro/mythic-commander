import React, { useContext } from 'react';
import { Tooltip } from 'antd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import LibraryImage from 'public/assets/icons/library.svg';
import useGameActions from 'components/Game/useGameActions';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import GameStateContext from 'components/Game/GameStateContext';
import ZoneCardsPopover from 'components/GameComponents/ZoneCardsPopover/ZoneCardsPopover';
import { pluralizeCards } from 'components/Game/Menu/Chat/ChatMessages/util';
import { DropCard } from 'types/dnd.types';
import CardStack from '../CardStack/CardStack';
import useLibraryActions from './useLibraryActions';

import styles from './Library.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Library = ({ player, isSelf }: Props) => {
  const { onMoveCard, onDrawCard } = useGameActions();
  const { peekingCards } = useContext(GameStateContext);
  const { library } = player.zones;

  const isPeeking =
    player.id === peekingCards?.playerId && peekingCards?.zone === ZONES.LIBRARY;

  const { items } = useLibraryActions(player);

  const cards = library.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.LIBRARY, player.id);
  };

  return (
    <Tooltip
      title={`Library: ${pluralizeCards(library.length, 'one')}`}
      open={isPeeking ? false : undefined}
      mouseEnterDelay={0.5}
    >
      <div className={styles.wrapper}>
        <div className={styles.popover_wrapper}>
          <ZoneCardsPopover
            cards={isPeeking ? peekingCards.cards : null}
            zone={ZONES.LIBRARY}
          />
        </div>
        <ContextMenu items={items}>
          <div
            className={styles.inner}
            onClick={isSelf && !isPeeking ? onDrawCard : undefined}
          >
            <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id} disabled={isPeeking}>
              <CardStack
                cards={cards}
                emptyImage={<LibraryImage />}
                draggable={isSelf}
                zone="library"
              />
            </Dropzone>
          </div>
        </ContextMenu>
      </div>
    </Tooltip>
  );
};

export default Library;
