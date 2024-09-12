import React, { createRef, useContext } from 'react';
import { DropCard } from 'types/dnd.types';

import { Player, ZONES } from 'backend/database/gamestate.types';
import LibraryImage from 'public/assets/icons/library.svg';
import useGameActions from 'components/Game/useGameActions';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import GameStateContext from 'components/Game/GameStateContext';
import LibraryExplorer from 'components/GameComponents/LibraryExplorer/LibraryExplorer';
import { Popover } from 'antd';
import CardStack from '../CardStack/CardStack';
import useLibraryActions from './useLibraryActions';

import styles from './Library.module.css';
import ZonesOverviewPopover from './ZonesOverviewPopover';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Library = ({ player, isSelf }: Props) => {
  const { onMoveCard, onDrawCard } = useGameActions();
  const { peekingCards } = useContext(GameStateContext);
  const { library } = player.zones;
  const libraryRef = createRef<HTMLDivElement>();

  const isPeeking =
    player.id === peekingCards?.playerId && peekingCards?.zone === ZONES.LIBRARY;

  const { items } = useLibraryActions(player);

  const cards = library.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.LIBRARY, player.id);
  };

  const noAnimation = !player.mulligan.cardsAccepted;

  return (
    <div className={styles.wrapper} ref={libraryRef}>
      <LibraryExplorer player={player} libraryRef={libraryRef} />
      <ContextMenu items={items}>
        <Popover mouseEnterDelay={0.3} content={<ZonesOverviewPopover player={player} />}>
          <div
            className={styles.inner}
            onClick={isSelf && !isPeeking ? onDrawCard : undefined}
          >
            <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id} disabled={isPeeking}>
              <CardStack
                cards={cards}
                noAnimation={noAnimation}
                emptyImage={<LibraryImage />}
                draggable={isSelf}
                zone="library"
              />
            </Dropzone>
          </div>
        </Popover>
      </ContextMenu>
    </div>
  );
};

export default Library;
