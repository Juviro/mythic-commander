import React, { useState } from 'react';
import { getCollectionFromCache } from './cardCache';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [sets, setSets] = useState();
  const value = {
    cardNames,
    sets,
  };

  const getCardNames = async () => {
    const allCardNames = await getCollectionFromCache('cardNames');
    setCardNames(allCardNames);
  };
  if (!cardNames) getCardNames();

  const getSets = async () => {
    const allSets = await getCollectionFromCache('sets');
    setSets(allSets);
  };
  if (!sets) getSets();

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardContext;
