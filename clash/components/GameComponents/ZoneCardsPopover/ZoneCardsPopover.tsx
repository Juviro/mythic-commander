import React, { PropsWithChildren, useContext } from 'react';
import { Popover } from 'antd';

import { VisibleCard } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import PopoverContent from './PopoverContent';

interface Props extends PropsWithChildren {
  cards?: VisibleCard[] | null;
  trigger?: 'click' | 'hover';
}

const ZoneCardsPopover = ({ children, cards, trigger }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  if (!cards?.length) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const color = getPlayerColor(cards[0].ownerId);

  return (
    <Popover
      content={<PopoverContent color={color} />}
      open={trigger ? undefined : true}
      placement="topLeft"
      trigger={trigger}
    >
      {children}
    </Popover>
  );
};

export default ZoneCardsPopover;
