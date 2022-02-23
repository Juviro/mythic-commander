import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import AddCards from 'components/Elements/Desktop/AddCards';
import { UnifiedDeck } from 'types/unifiedTypes';
import { CardInputType } from 'types/graphql';
import { ActionButtons } from './ActionButtons/ActionButtons';

const StyledOuter = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 101;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  box-shadow: 0px -9px 10px -4px #9c9c9c;
`;

const StyledWrapper = styled(Space)`
  padding: 12px 24px;
  width: calc(100% - 15px);
  max-width: 1800px;
`;

interface Props {
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

export const ActionBar = ({ onAddCards, deck }: Props) => {
  return (
    <StyledOuter>
      <StyledWrapper>
        <AddCards
          alignTop
          isAdvanced={false}
          onAddCards={onAddCards}
          focusId="deck.cards"
          placeholder="Add a card..."
          containedCardNames={deck?.cards.map(({ name }) => name)}
        />
        <ActionButtons deck={deck} onAddCards={onAddCards} />
      </StyledWrapper>
    </StyledOuter>
  );
};
