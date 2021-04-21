import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { AddCards } from 'components/Elements/Desktop';
import { UnifiedDeck } from 'types/unifiedTypes';
import { CardInputType } from 'types/graphql';

const StyledWrapper = styled(Space)`
  padding: 18px;
  background-color: white;
  margin-top: -19px;
  width: calc(100% - 15px);
  max-width: 1800px;
  position: fixed;
  bottom: 0;

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
    </StyledWrapper>
  );
};
