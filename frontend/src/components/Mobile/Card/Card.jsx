import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams, withRouter } from 'react-router';
import { Divider } from 'antd';

import CardImage from './CardImage';
import {
  CardLegal,
  CardSetOverview,
  IncludedDecks,
  IncludedWants,
  CardLinks,
  CardRules,
} from '../../Elements/Shared';
import CardOwned from './CardOwned';
import { getCardByOracleId } from './queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';

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

  const card = data && unifySingleCard(data.cardByOracleId);

  const currentCardId = cardId || (card && card.id);

  const currentCard = card
    ? { ...card, ...card.allSets.find(({ id }) => id === currentCardId) }
    : null;

  const fallbackId = loading || !currentCard ? null : currentCard.id;

  const onChangeSet = id => {
    // select everything before a card id
    const match = history.location.pathname.match(/(\/m\/[\w/]+)\/\w{8}-\w{4}/);
    const pathname = match ? match[1] : history.location.pathname;
    history.replace(`${pathname}/${oracle_id}/${id}`);
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
        <CardSetOverview
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
        <IncludedWants card={card} />
        <Divider>Decks</Divider>
        <IncludedDecks card={card} />
        <Divider>Resources</Divider>
        <CardLinks card={card} />
        <div style={{ marginTop: 16 }}>
          <CardLegal card={card} />
        </div>
        <CardRules card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};

export default withRouter(Card);
