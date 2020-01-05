import React, { useState } from 'react';
import { getCardsFromCache } from './cardCache';

const CardContext = React.createContext({});

// const getSettings = () => {
//   const get = key => localStorage.getItem(key)
//   return {
//     display: {
//       collection: {
//         listView: get('display.collection.listView') || 'LIST',
//       },
//     },
//   }
// }

// const setSetting = (key, value) => {
//   localStorage.setItem(key, value)
// }

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState([]);
  const value = {
    cardNames,
    // settings: getSettings(),
    // setSetting,
  };

  const getCardNames = async () => {
    const allCardNames = await getCardsFromCache();
    setCardNames(allCardNames);
  };
  if (!cardNames.length) getCardNames();

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardContext;
