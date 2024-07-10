import React, { useContext } from 'react';

import UserContext from 'components/Provider/UserProvider';
import PriceDevelopment from 'components/Elements/Shared/PriceDevelopment';
import DecksAndWants from './DecksAndWants';
import PreviewAndSets from './PreviewAndSets';
import AdditionalInfos from './AdditionalInfos';
import CardTitle from './CardTitle';
import { useToggle } from '../../../../Hooks';
import UpdateCardImage from './UpdateCardImage';
import ShowScryfallApiPage from './ShowScryfallApiPage';

export default ({
  card,
  fallbackCard,
  loading,
  selectedCard,
  selectedCardId,
  setSelectedCardId,
  largeHeader,
  parentLoading,
}) => {
  const [isFlipped, toggleIsFlipped] = useToggle(false);
  const { user } = useContext(UserContext);

  const usedCard = loading && fallbackCard ? fallbackCard : card;

  return (
    <>
      {largeHeader && <CardTitle card={usedCard} />}
      <PreviewAndSets
        card={usedCard}
        showTitle={!largeHeader}
        loading={loading}
        parentLoading={parentLoading}
        toggleIsFlipped={toggleIsFlipped}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
      />
      <div>
        <UpdateCardImage cardId={usedCard.id} />
        <ShowScryfallApiPage cardId={usedCard.id} />
      </div>
      <PriceDevelopment selectedCard={selectedCard} cardId={usedCard.id} />
      {user && <DecksAndWants card={usedCard} loading={loading} />}
      <AdditionalInfos card={usedCard} loading={loading} isFlipped={isFlipped} />
    </>
  );
};
