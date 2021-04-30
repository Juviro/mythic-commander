import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { AddCards } from 'components/Elements/Desktop';
import { UnifiedDeck } from 'types/unifiedTypes';
import { CardInputType } from 'types/graphql';
import { ActionButtons } from './ActionButtons/ActionButtons';

const StyledWrapper = styled(Space)`
  padding: 18px;
  background-color: white;
  margin-top: -19px;
  width: calc(100% - 15px);
  max-width: 1800px;
  position: fixed;
  bottom: 0;
  /* Drawer is at 100, this should be above or behind that based on screen size */
  z-index: 99;
  @media (max-width: 1600px) {
    z-index: 101;
  }

  box-shadow: 0px -9px 10px -4px #9c9c9c;
`;

interface Props {
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

export const ActionBar = ({ onAddCards, deck }: Props) => {
  return (
    <StyledWrapper>
      <AddCards
        isAdvanced={false}
        onAddCards={onAddCards}
        focusId="deck.cards"
        placeholder="Add a card..."
        containedCardNames={deck?.cards.map(({ name }) => name)}
      />
      <ActionButtons deck={deck} onAddCards={onAddCards} />
    </StyledWrapper>
  );
};
