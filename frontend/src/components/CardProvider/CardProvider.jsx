import React, { useState } from 'react';
import { getCollectionFromCache } from './cardCache';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState();
  const [sets, setSets] = useState();

  const getSets = async () => {
    setSets({});
    const allSets = await getCollectionFromCache('sets');
    setSets(allSets);
  };
  if (!sets) getSets();

  const getCards = async () => {
    setCards([]);
    const allCards = await getCollectionFromCache('cards');
    const fullCards = allCards.map(({ i, n, s }) => ({
      id: i,
      name: n,
      img: `https://img.scryfall.com/cards/small/front/${s}.jpg`,
    }));
    setCards(fullCards);
    setCardNames(fullCards.map(({ name }) => name));
  };
  if (!cards) getCards();

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
