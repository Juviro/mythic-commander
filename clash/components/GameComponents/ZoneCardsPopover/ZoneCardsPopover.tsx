import React, { PropsWithChildren, useContext } from 'react';
import { Popover } from 'antd';

import { VisibleCard } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import PopoverContent from './PopoverContent';

interface Props extends PropsWithChildren {
  searchable?: boolean;
  cards?: VisibleCard[] | null;
}

const ZoneCardsPopover = ({ children, cards, searchable }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  if (!cards?.length) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const color = getPlayerColor(cards[0].ownerId);

  return (
    <Popover
      content={<PopoverContent cards={cards} searchable={searchable} color={color} />}
      open
      placement="topLeft"
    >
      {children}
    </Popover>
  );
};

export default ZoneCardsPopover;
