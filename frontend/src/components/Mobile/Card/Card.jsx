import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { useParams } from 'react-router';
import { Divider } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import CardSetOverview from 'components/Elements/Shared/CardSetOverview';
import IncludedDecks from 'components/Elements/Shared/IncludedDecks';
import IncludedWants from 'components/Elements/Shared/IncludedWants';
import CardLinks from 'components/Elements/Shared/CardLinks';
import OracleText from 'components/Elements/Shared/OracleText/OracleText';
import FriendsCollection from 'components/Elements/Shared/FriendsCollection/FriendsCollection';
import ScryfallTagList from 'components/Elements/Shared/ScryfallTagList/ScryfallTagList';
import OtherInfo from 'components/Elements/Desktop/CardDetailsDesktop/CardDetailBody/AdditionalInfos/OtherInfo';
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
  padding: 10px 5vw 32px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
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
            <FriendsCollection
              oracle_id={oracle_id}
              selectedCardId={selectedCardId}
              setSelectedCardId={setSelectedCardId}
            />
          </>
        )}
        <Divider>Oracle Text</Divider>
        <OracleText card={fullCard} loading={loading} isFlipped={isFlipped} />
        <OtherInfo card={card} loading={loading} />
        <Divider>Resources</Divider>
        <CardLinks card={card} />
        <Divider>Scryfall Tags</Divider>
        <ScryfallTagList card={card} loading={loading} />
      </StyledBodyWrapper>
    </StyledWrapper>
  );
};
