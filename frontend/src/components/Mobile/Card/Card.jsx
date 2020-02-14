import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams, withRouter } from 'react-router';
import { Divider } from 'antd';
import { getCardByOracleId } from '../../../queries';

import CardSets from './CardSets';
import CardRules from './CardRules';
import CardCosts from './CardCosts';
import CardImage from './CardImage';
import CollectionOverview from './CollectionOverview';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const StyledBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  z-index: 1;
  padding: 10px 5vw;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const sortByPrice = (a, b) => {
  if (!a.prices.eur) return 1;
  if (!b.prices.eur) return -1;
  return a.prices.eur > b.prices.eur ? 1 : -1;
};

const Card = ({ history }) => {
  const { oracle_id, cardId } = useParams();
  const { data, loading } = useQuery(getCardByOracleId, {
    variables: { oracle_id },
  });

  const card = data && data.cardsByOracleId;
  const sortedCards = card && [...card.all_sets].sort(sortByPrice);
  const currentCard =
    card &&
    (cardId ? sortedCards.find(({ id }) => id === cardId) : sortedCards[0]);

  const fallbackId = loading || !currentCard ? null : currentCard.id;
  const cardImages = currentCard && currentCard.image_uris;

  const onChangeSet = id => history.replace(`/m/cards/${oracle_id}/${id}`);

  useEffect(() => {
    if (!cardId && fallbackId) onChangeSet(fallbackId);
    // eslint-disable-next-line
  }, [cardId, fallbackId]);

  return (
    <StyledWrapper>
      <CardImage cardImages={cardImages} loading={loading} />
      <StyledBodyWrapper>
        <CardSets
          card={card}
          loading={loading}
          cardId={cardId}
          onChangeSet={onChangeSet}
        />
        <Divider>Collected</Divider>
        <CollectionOverview
          card={card}
          loading={loading}
          selectedCardId={cardId}
          onChangeSet={onChangeSet}
        />
        <Divider>Buy</Divider>
        <CardCosts
          card={card}
          loading={loading}
          selectedCardId={cardId}
          onChangeSet={onChangeSet}
        />
        <Divider>Rules</Divider>
        <CardRules card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};

export default withRouter(Card);
