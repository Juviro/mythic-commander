import React, { useState, useEffect } from 'react';
import useFeatureFlag from 'components/Elements/Shared/FeatureFlag/useFeatureFlag';
import { FEATURE_FLAG_DEBUG } from 'constants/featureFlags';
import { getCollectionFromCache } from './cardCache';
import { CARD_TYPES } from './staticTypes';
import { formatCachedCards } from '../../../utils/cachedCards';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [sets, setSets] = useState({});
  const debug = useFeatureFlag(FEATURE_FLAG_DEBUG);

  const getSets = async () => {
    const allSets = await getCollectionFromCache('sets', { debug });
    setSets(allSets);
  };
  const getCreatureTypes = async () => {
    const allcreatureTypes = await getCollectionFromCache('subTypes', { debug });
    setSubTypes(allcreatureTypes);
  };
  const getCards = async () => {
    const allCards = await getCollectionFromCache('cards', { debug });
    const fullCards = formatCachedCards(allCards);
    setCards(fullCards);
    setCardNames(fullCards.map(({ name }) => name));
  };

  useEffect(() => {
    if (debug === null || isFetching) return;
    setIsFetching(true);
    getSets();
    getCreatureTypes();
    getCards();
    // eslint-disable-next-line
  }, [debug]);

  return (
    <CardContext.Provider
      value={{
        cardNames,
        cards,
        subTypes,
        sets,
        cardTypes: CARD_TYPES,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
