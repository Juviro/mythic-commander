import React, { useState, useEffect, useMemo } from 'react';
import useFeatureFlag from 'components/Elements/Shared/FeatureFlag/useFeatureFlag';
import { FEATURE_FLAG_DEBUG } from 'constants/featureFlags';
import { getCollectionFromCache } from './cardCache';
import { CARD_TYPES, CardType } from './staticTypes';
import { formatCachedCards } from '../../../utils/cachedCards';

interface StoredCard {
  id: string;
  imgKey: string;
  name: string;
  oracle_id: string;
}

interface StoredSet {
  name: string;
  icon_svg_uri: string;
}

interface StoredSets {
  [key: string]: StoredSet;
}

interface SubTypes {
  category: CardType;
  types: string[];
}

const CardContext = React.createContext<{
  cardNames: string[];
  cards: StoredCard[];
  subTypes: SubTypes[];
  subTypesMap: { [key: string]: CardType };
  sets: StoredSets;
  cardTypes: typeof CARD_TYPES;
}>(null);

export const CardContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [cardNames, setCardNames] = useState<string[]>();
  const [cards, setCards] = useState<StoredCard[]>([]);
  const [subTypes, setSubTypes] = useState<SubTypes[]>([]);
  const [sets, setSets] = useState<StoredSets>({});
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
  }, [debug]);

  const subTypesMap: { [key: string]: CardType } = useMemo(() => {
    return subTypes.reduce((acc, { category, types }) => {
      types.forEach((type) => {
        acc[type] = category;
      });
      return acc;
    }, {});
  }, [subTypes]);

  const value = useMemo(
    () => ({
      cardNames,
      cards,
      subTypes,
      subTypesMap,
      sets,
      cardTypes: CARD_TYPES,
    }),
    [cards?.length, cardNames?.length, subTypes?.length, sets?.length]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardContext;
