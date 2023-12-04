import React, { PropsWithChildren, useContext } from 'react';
import { Popover } from 'antd';

import { VisibleCard } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import PopoverContent from './PopoverContent';

interface Props extends PropsWithChildren {
  cards?: VisibleCard[] | null;
}

const ZoneCardsPopover = ({ children, cards }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  if (!cards?.length) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const color = getPlayerColor(cards[0].ownerId);

  return (
    <Popover content={<PopoverContent color={color} />} open placement="topLeft">
      {children}
    </Popover>
  );
};

export default ZoneCardsPopover;
