import React, { PropsWithChildren, useContext } from 'react';
import { Popover } from 'antd';

import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import PopoverContent from './PopoverContent';

interface Props extends PropsWithChildren {
  cards?: VisibleCard[] | null;
  trigger?: 'click' | 'hover';
  zone: Zone;
}

const ZoneCardsPopover = ({ children, cards, trigger, zone }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);

  if (!cards?.length) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const color = getPlayerColor(cards[0].ownerId);

  return (
    <Popover
      content={<PopoverContent color={color} zone={zone} />}
      open={trigger ? undefined : true}
      placement="topLeft"
      trigger={trigger}
      // below graveyard and exile popovers so they can be looked at while searching
      zIndex={1000}
    >
      {children}
    </Popover>
  );
};

export default ZoneCardsPopover;
