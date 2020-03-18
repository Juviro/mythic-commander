import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams, withRouter } from 'react-router';
import { Divider } from 'antd';

import CardRules from './CardRules';
import CardImage from './CardImage';
import CardLegal from './CardLegal';
import CardOwned from './CardOwned';
import CardLinks from './CardLinks';
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
  margin: 16px 0 32px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const Card = ({ history }) => {
  const { oracle_id, cardId } = useParams();
  const { data, loading } = useQuery(getCardByOracleId, {
    variables: { oracle_id },
  });

  const card = data && data.cardsByOracleId;

  const currentCardId = cardId || (card && card.id);

  const currentCard = card
    ? card.allSets.find(({ id }) => id === currentCardId)
    : null;

  const fallbackId = loading || !currentCard ? null : currentCard.id;

  const onChangeSet = id => {
    const match = history.location.pathname.match(/\/m\/([-a-z]+)\//);
    const basePath = match ? match[1] : 'cards';
    history.replace(`/m/${basePath}/${oracle_id}/${id}`);
  };

  useEffect(() => {
    if (!cardId && fallbackId) {
      onChangeSet(fallbackId);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, [cardId, fallbackId]);

  return (
    <StyledWrapper>
      <CardImage card={currentCard} loading={loading} />
      <StyledBodyWrapper>
        <Divider>Overview</Divider>
        <CardOverview
          card={card}
          loading={loading}
          selectedCardId={cardId}
          onChangeSet={onChangeSet}
        />
        <Divider>Collection</Divider>
        <CardOwned
          card={card}
          loading={loading}
          onChangeSet={onChangeSet}
          selectedCardId={cardId}
        />
        <Divider>Rules</Divider>
        <CardLegal card={card} />
        <CardRules card={card} loading={loading} />
        <CardLinks card={card} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};

export default withRouter(Card);
