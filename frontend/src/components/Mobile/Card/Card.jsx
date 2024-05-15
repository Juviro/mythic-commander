import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { useParams } from 'react-router';
import { Divider, Typography } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import CardLegal from 'components/Elements/Shared/CardLegal';
import CardSetOverview from 'components/Elements/Shared/CardSetOverview';
import IncludedDecks from 'components/Elements/Shared/IncludedDecks';
import IncludedWants from 'components/Elements/Shared/IncludedWants';
import CardLinks from 'components/Elements/Shared/CardLinks';
import CardRules from 'components/Elements/Shared/CardRules';
import OracleText from 'components/Elements/Shared/OracleText/OracleText';
import CardImage from './CardImage';
import CardOwned from './CardOwned';
import { getCardByOracleId } from './queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
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

const StyledRulesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;

  @media (min-width: 600px) {
    justify-content: space-around;
  }
`;

export default ({ overwriteOracleId, defaultCardId }) => {
  const { oracle_id: paramOracleId } = useParams();
  const { user } = useContext(UserContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const oracle_id = overwriteOracleId || paramOracleId;
  const { data, loading } = useQuery(getCardByOracleId, {
    variables: { oracle_id },
    fetchPolicy: 'cache-first',
  });

  const card = data && unifySingleCard(data.cardByOracleId);

  const currentCard = card && card.allSets.find(({ id }) => id === selectedCardId);

  useEffect(() => {
    if (currentCard) return;
    const initialCardId = defaultCardId || (card && card.id);
    setSelectedCardId(initialCardId);
    // eslint-disable-next-line
  }, [defaultCardId, card]);

  useEffect(() => {
    if (overwriteOracleId || defaultCardId) return;
    setTimeout(() => window.scrollTo(0, 0), 10);
    // eslint-disable-next-line
  }, [oracle_id]);

  const fullCard = { ...card, ...currentCard };

  return (
    <StyledWrapper>
      <CardImage card={fullCard} loading={loading} onFlipCard={setIsFlipped} />
      <StyledBodyWrapper>
        <Divider>Overview</Divider>
        <CardSetOverview
          card={card}
          loading={loading}
          selectedCardId={selectedCardId}
          onChangeSet={setSelectedCardId}
        />
        {user && (
          <>
            <Divider>Your Collection</Divider>
            <CardOwned
              card={card}
              loading={loading}
              onChangeSet={setSelectedCardId}
              selectedCardId={selectedCardId}
            />
            <Divider>Wants Lists</Divider>
            <IncludedWants card={card} />
            <Divider>Decks</Divider>
            <IncludedDecks card={card} />
          </>
        )}
        <Divider>Oracle Text & Rules</Divider>
        <OracleText card={fullCard} loading={loading} isFlipped={isFlipped} />
        <StyledRulesWrapper>
          <CardRules card={card} loading={loading} />
          <CardLegal card={card} />
        </StyledRulesWrapper>
        <Divider>Resources</Divider>
        <CardLinks card={card} />
        {card?.reserved && (
          <>
            <Divider>Reserved List</Divider>
            <Typography.Text strong style={{ marginBottom: 16 }}>
              This card is part of the reserved list
            </Typography.Text>
          </>
        )}
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};
