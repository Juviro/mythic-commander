import React, { CSSProperties, useContext } from 'react';
import { Popover } from 'antd';
import classNames from 'classnames';

import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import { HiddenCard, VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemType } from 'types/dnd.types';
import GameStateContext from 'components/Game/GameStateContext';
import { getImageUrl } from 'utils/getImageUrl';
import ContextMenu from '../ContextMenu/ContextMenu';
import Card from '../Card/Card';

import styles from './StackedCardList.module.css';

interface Props {
  card: VisibleCard | HiddenCard;
  draggable?: boolean;
  zone: Zone;
  cardDropType: DndItemType;
  verticalOffsetIndex?: number;
  displayPopoverPreview?: boolean;
}

const StackedCardListCard = ({
  card,
  draggable,
  zone,
  cardDropType,
  verticalOffsetIndex,
  displayPopoverPreview,
}: Props) => {
  const { player, getPlayerColor } = useContext(GameStateContext);

  const style = {
    '--player-color': getPlayerColor(card.ownerId),
    '--vertical-offset-index': verticalOffsetIndex,
  } as CSSProperties;

  const frontCardName = 'name' in card && card.name.split(' //')[0];
  const { contextMenuItems } = useCardActions({
    cardIds: [card.clashId],
    contextMenuTitle: frontCardName,
    zone,
    player: player!,
  });

  return (
    <ContextMenu items={contextMenuItems}>
      <Popover
        content={
          <img
            src={getImageUrl((card as VisibleCard).id)}
            className={styles.card_preview}
          />
        }
        classNames={{
          container: styles.card_preview_container,
        }}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        open={displayPopoverPreview ? undefined : false}
      >
        <li
          className={classNames(styles.card, {
            [styles.card__vertical_layout]: verticalOffsetIndex !== undefined,
          })}
          style={style}
        >
          <Card
            card={card}
            draggable={draggable}
            dropType={cardDropType}
            noAnimation
            noDragPreview
            zone={zone}
            preventPreview={displayPopoverPreview}
          />
        </li>
      </Popover>
    </ContextMenu>
  );
};

export default StackedCardListCard;
