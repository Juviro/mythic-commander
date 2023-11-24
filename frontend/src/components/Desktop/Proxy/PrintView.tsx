import React from 'react';
import styled from 'styled-components';

import { ProxyCard } from '../../../types/graphql';
import { getImageUrl } from '../../../utils/cardImage';

const StyledPrintWrapper = styled.div`
  display: none;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  background-color: white;

  @media print {
    display: inherit;
  }
`;

const StyledCardWrapper = styled.div`
  margin: -1px;
  height: 335px;
  width: 241px;
  padding: 1px;
  border: 1px solid rgb(0, 0, 0, 0.85);
  float: left;
  position: relative;
`;

const StyledCard = styled.img`
  width: 100%;
  height: 100%;
`;

interface Props {
  cards?: ProxyCard[];
}

const PrintView = ({ cards }: Props) => {
  const displayedCards = [];

  cards?.forEach((card) => {
    for (let i = 0; i < card.amount; i++) {
      displayedCards.push({
        ...card,
        key: `${card.id}-${i}`,
        imgSrc: getImageUrl(card.id, card.imgKey, 'normal'),
      });

      if (card.isTwoFaced) {
        displayedCards.push({
          ...card,
          key: `${card.id}-${i}-back`,
          imgSrc: getImageUrl(card.id, card.imgKey, 'normal', 'back'),
        });
      }
    }
  });

  return (
    <StyledPrintWrapper>
      {displayedCards?.map(({ imgSrc, key }) => (
        <StyledCardWrapper key={key}>
          <StyledCard src={imgSrc} />
        </StyledCardWrapper>
      ))}
    </StyledPrintWrapper>
  );
};

export default PrintView;
