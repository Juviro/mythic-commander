import { useContext, useMemo } from 'react';
import CardContext from 'components/Provider/CardProvider';
import { useQuery } from '@apollo/client';
import { getOwnedCardNames } from 'queries';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';

const MAX_RESULTS = 15;

const useSearchSuggestions = (query: string) => {
  const [lastSearchedOracleIds, setLastSearchedOracleIds] = useLocalStorage(
    'lastSearchedOracleIds',
    []
  );
  const { cards } = useContext(CardContext);
  const { data: ownedCardNamesData } = useQuery(getOwnedCardNames);
  const ownedCardNames = ownedCardNamesData ? ownedCardNamesData.ownedCardNames : [];

  const filteredCards = filterAndSortByQuery(cards, query);

  const slicedCards = filteredCards.slice(0, MAX_RESULTS).map((card) => ({
    ...card,
    owned: ownedCardNames.includes(card.name),
  }));

  const lastSearchedCards = useMemo(() => {
    return lastSearchedOracleIds
      .map((oracleId) => cards.find((card) => card.oracle_id === oracleId))
      .filter((card) => card);
  }, [lastSearchedOracleIds]);

  const searchSuggestions =
    query || !lastSearchedOracleIds?.length ? slicedCards : lastSearchedCards;

  const onSearchElement = (oracleId: string) => {
    if (!oracleId) return;
    setLastSearchedOracleIds([oracleId, ...lastSearchedOracleIds].slice(0, MAX_RESULTS));
  };

  return {
    searchSuggestions,
    totalResults: filteredCards.length,
    onSearchElement,
  };
};

export default useSearchSuggestions;
