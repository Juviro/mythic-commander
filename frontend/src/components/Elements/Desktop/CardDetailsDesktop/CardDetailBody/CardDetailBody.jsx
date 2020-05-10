import React from 'react';

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
      <DecksAndWants card={card} />
      <AdditionalInfos card={card} loading={loading} isFlipped={isFlipped} />
    </>
  );
};
