import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams, withRouter } from 'react-router';
import { Divider } from 'antd';
import { getCardByOracleId } from '../../../queries';

import CardRules from './CardRules';
import CardImage from './CardImage';
import CardOwned from './CardOwned';
import CardSetName from './CardSetName';
import CardOverview from './CardOverview';

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
  margin-top: 16px;
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
  const sortedCards = card && [...card.allSets].sort(sortByPrice);
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
      <CardSetName card={card} selectedCardId={cardId} loading={loading} />
      <StyledBodyWrapper>
        <CardOwned
          card={card}
          loading={loading}
          onChangeSet={onChangeSet}
          selectedCardId={cardId}
        />
        <Divider>Overview</Divider>
        <CardOverview
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
