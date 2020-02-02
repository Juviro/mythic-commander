import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import CardSpinner from './CardSpinner';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 100%;

  @media (max-width: 700px) {
    justify-content: center;
  }
`;

export default ({ cards, loading }) => {
  const byDate = (a, b) => Number(b.createdAt) - Number(a.createdAt);

  return (
    <CardsWrapper>
      {loading ? (
        <CardSpinner hideBorder />
      ) : (
        cards.sort(byDate).map(card => <Card {...card} key={card.id} />)
      )}
    </CardsWrapper>
  );
};
