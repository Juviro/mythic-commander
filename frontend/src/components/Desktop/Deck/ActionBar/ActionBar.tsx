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
  z-index: 100;
  bottom: 0;
  right: 0;
  left: 0;
  pointer-events: none;
`;

const StyledInner = styled.div`
  width: 100%;
  max-width: 1800px;
  padding-left: 24px;
`;

const StyledWrapper = styled(Space)`
  padding: 12px 24px;
  box-shadow: rgb(0 0 0 / 70%) 0px 0px 10px 4px;
  background: rgb(255 255 255 / 95%);
  border-radius: 12px 12px 0 0;
  pointer-events: auto;
`;

interface Props {
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

export const ActionBar = ({ onAddCards, deck }: Props) => {
  return (
    <StyledOuter>
      <StyledInner>
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
      </StyledInner>
    </StyledOuter>
  );
};
