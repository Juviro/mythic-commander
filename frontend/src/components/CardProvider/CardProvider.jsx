import React, { useState, useEffect } from 'react';
import { getCollectionFromCache } from './cardCache';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState([]);
  const [creatureTypes, setCreatureTypes] = useState([]);
  const [sets, setSets] = useState({});

  useEffect(() => {
    const getSets = async () => {
      const allSets = await getCollectionFromCache('sets');
      setSets(allSets);
    };
    getSets();
  }, []);

  useEffect(() => {
    const getSets = async () => {
      const allcreatureTypes = await getCollectionFromCache('creatureTypes');
      setCreatureTypes(allcreatureTypes);
    };
    getSets();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const allCards = await getCollectionFromCache('cards');
      const fullCards = allCards.map(({ i, n, k, o }) => ({
        id: i,
        oracle_id: o,
        name: n,
        imgKey: k,
      }));
      setCards(fullCards);
      setCardNames(fullCards.map(({ name }) => name));
    };
    getCards();
  }, []);

  return (
    <CardContext.Provider
      value={{
        cardNames,
        cards,
        creatureTypes,
        sets,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
