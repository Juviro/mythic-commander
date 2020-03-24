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
import AddToWants from './AddToWants';
import IncludedDecks from './IncludedDecks';

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
  margin: 48px 0 32px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const Card = ({ history, basePath }) => {
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
    const defaultBasePath = `/m/${match ? match[1] : 'cards'}`;
    history.replace(`${basePath || defaultBasePath}/${oracle_id}/${id}`);
  };

  useEffect(() => {
    if (cardId) return;
    if (fallbackId) {
      onChangeSet(fallbackId);
    }
    setTimeout(() => window.scrollTo(0, 0), 100);
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
        <Divider>Your Collection</Divider>
        <CardOwned
          card={card}
          loading={loading}
          onChangeSet={onChangeSet}
          selectedCardId={cardId}
        />
        <Divider>Wants Lists</Divider>
        <AddToWants card={card} />
        <Divider>Decks</Divider>
        <IncludedDecks card={card} />
        <Divider>Resources</Divider>
        <CardLinks card={card} />
        <CardLegal card={card} />
        <CardRules card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};

export default withRouter(Card);
