import React from 'react';
import FadeIn from 'components/Elements/Shared/FadeIn';
import styled, { css } from 'styled-components';
import AdvancedSearch from './AdvancedSearch';

const StyledHideWrapper = styled.div`
  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
  height: 100%;
  overflow: auto;
  padding: 24px;
`;

export default ({ onAddCards, deck, visible }) => {
  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  return (
    <StyledHideWrapper visible={visible}>
      <FadeIn>
        <AdvancedSearch onAddCards={onAddCards} alreadyInDeck={alreadyInDeck} />
      </FadeIn>
    </StyledHideWrapper>
  );
};
