import React, { useContext } from 'react';

import UserContext from 'components/Provider/UserProvider';
import DecksAndWants from './DecksAndWants';
import PreviewAndSets from './PreviewAndSets';
import AdditionalInfos from './AdditionalInfos';
import CardTitle from './CardTitle';
import { useToggle } from '../../../../Hooks';

export default ({ card, loading, selectedCardId, setSelectedCardId, largeHeader }) => {
  const [isFlipped, toggleIsFlipped] = useToggle(false);
  const { user } = useContext(UserContext);

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
      {user && <DecksAndWants card={card} />}
      <AdditionalInfos card={card} loading={loading} isFlipped={isFlipped} />
    </>
  );
};
