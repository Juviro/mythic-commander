import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams, withRouter } from 'react-router';
import { Divider } from 'antd';

import CardRules from './CardRules';
import CardImage from './CardImage';
import CardLegal from './CardLegal';
import CardOwned from './CardOwned';
import CardSetName from './CardSetName';
import CardOverview from './CardOverview';
import { getCardByOracleId } from './queries';

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
  const getPrice = ({ prices: { usd, usd_foil } }) => Number(usd || usd_foil);
  if (!getPrice(a)) return -1;
  if (!getPrice(b)) return 1;
  return getPrice(a) > getPrice(b) ? 1 : -1;
};

const Card = ({ history }) => {
  const { oracle_id, cardId } = useParams();
  const { data, loading } = useQuery(getCardByOracleId, {
    variables: { oracle_id },
  });

  const card = data && data.cardsByOracleId;
  console.log('card :', card);
  const sortedCards = card && [...card.allSets].sort(sortByPrice);
  // TODO: select owned, if any
  const currentCard =
    card &&
    (cardId ? sortedCards.find(({ id }) => id === cardId) : sortedCards[0]);

  const fallbackId = loading || !currentCard ? null : currentCard.id;

  const onChangeSet = id => history.replace(`/m/cards/${oracle_id}/${id}`);

  useEffect(() => {
    if (!cardId && fallbackId) onChangeSet(fallbackId);
    // eslint-disable-next-line
  }, [cardId, fallbackId]);

  return (
    <StyledWrapper>
      <CardImage card={currentCard} loading={loading} />
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
        <CardLegal card={card} />
        <CardRules card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};

export default withRouter(Card);
