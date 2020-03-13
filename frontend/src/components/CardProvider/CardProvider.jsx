import React, { useState, useEffect } from 'react';
import { getCollectionFromCache } from './cardCache';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState([]);
  const [sets, setSets] = useState({});

  useEffect(() => {
    const getSets = async () => {
      const allSets = await getCollectionFromCache('sets');
      setSets(allSets);
    };
    getSets();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      const allCards = await getCollectionFromCache('cards');
      const fullCards = allCards.map(({ i, n, s, o }) => ({
        id: i,
        oracle_id: o,
        name: n,
        img: `https://img.scryfall.com/cards/small/front/${s}.jpg`,
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
        sets,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
