import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams } from 'react-router';
import { Divider } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
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

export default ({ overwriteOracleId, defaultCardId }) => {
  const { oracle_id: paramOracleId } = useParams();
  const { user } = useContext(UserContext);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const oracle_id = overwriteOracleId || paramOracleId;
  const { data, loading } = useQuery(getCardByOracleId, {
    variables: { oracle_id },
  });

  const card = data && unifySingleCard(data.cardByOracleId);
  useDocumentTitle(card?.name);

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
      <CardImage card={fullCard} loading={loading} />
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
        <Divider>Resources</Divider>
        <CardLinks card={card} />
        <div style={{ margin: '16px 0' }}>
          <CardLegal card={card} />
        </div>
        <CardRules card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};
