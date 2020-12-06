import React, { useState, useEffect } from 'react';
import { getCollectionFromCache } from './cardCache';
import { CARD_TYPES } from './staticTypes';
import { formatCachedCards } from '../../../utils/cachedCards';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [sets, setSets] = useState({});

  const getSets = async () => {
    const allSets = await getCollectionFromCache('sets');
    setSets(allSets);
  };
  const getCreatureTypes = async () => {
    const allcreatureTypes = await getCollectionFromCache('subTypes');
    setSubTypes(allcreatureTypes);
  };
  const getCards = async () => {
    const allCards = await getCollectionFromCache('cards');
    const fullCards = formatCachedCards(allCards);
    setCards(fullCards);
    setCardNames(fullCards.map(({ name }) => name));
  };

  useEffect(() => {
    getSets();
    getCreatureTypes();
    getCards();
  }, []);

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
