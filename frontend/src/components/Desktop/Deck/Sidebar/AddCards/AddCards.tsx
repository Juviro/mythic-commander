import React from 'react';
import styled from 'styled-components';
import { UnifiedDeck } from 'types/unifiedTypes';

import { CardInputType } from 'types/graphql';
import AdvancedSearch from './AdvancedSearch';
import { LazyRender } from '../LazyRender';

const StyledWrapper = styled.div`
  padding: 8px;
`;

interface Props {
  onAddCards: (cards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

const AddCards = ({ onAddCards, deck }: Props) => {
  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  return (
    <StyledWrapper>
      <AdvancedSearch onAddCards={onAddCards} alreadyInDeck={alreadyInDeck} />
    </StyledWrapper>
  );
};

export default ({ visible, ...props }: Props & { visible: boolean }) => {
  return (
    <LazyRender visible={visible}>
      <AddCards {...props} />
    </LazyRender>
  );
};
