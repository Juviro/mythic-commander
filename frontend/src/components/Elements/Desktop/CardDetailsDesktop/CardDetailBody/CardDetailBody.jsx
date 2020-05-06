import React, { useEffect } from 'react';

import DecksAndWants from './DecksAndWants';
import PreviewAndSets from './PreviewAndSets';
import AdditionalInfos from './AdditionalInfos';
import CardTitle from './CardTitle';
import { useToggle } from '../../../../Hooks';

export default ({
  card,
  loading,
  selectedCardId,
  setSelectedCardId,
  largeHeader,
}) => {
  const [isFlipped, toggleIsFlipped] = useToggle(false);

  const cardId = card && card.id;
  useEffect(() => {
    toggleIsFlipped(false);
    // eslint-disable-next-line
  }, [cardId]);

  return (
    <>
      {largeHeader && <CardTitle card={card} loading={loading} />}
      <PreviewAndSets
        card={card}
        showTitle={!largeHeader}
        loading={loading}
        toggleIsFlipped={toggleIsFlipped}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
      />
      <AdditionalInfos card={card} loading={loading} isFlipped={isFlipped} />
      <DecksAndWants card={card} />
    </>
  );
};
