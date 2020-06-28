import { useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { filterCards, sortCards } from '../../../../utils/cardFilter';

export default ({ cards, search = '', children, ...props }) => {
  const [
    { page = 1, pageSize, orderByAdvanced, addedWithin },
    setParams,
  ] = useQueryParams({
    page: NumberParam,
    addedWithin: NumberParam,
    pageSize: NumberParam,
    orderByAdvanced: StringParam,
    layout: StringParam,
  });

  const offset = pageSize * (page - 1);
  const filteredCards = filterCards(cards, {
    name: search,
    addedWithin,
  });
  const sortedCards = sortCards(filteredCards, orderByAdvanced);
  const slicedCards = sortedCards.slice(offset, offset + pageSize);
  const numberOfCards = filteredCards.length;

  useEffect(() => {
    if (!numberOfCards) return;
    if (numberOfCards < offset + pageSize) {
      const lastPage = Math.ceil(numberOfCards / pageSize);
      setParams({ page: lastPage });
    }
    // eslint-disable-next-line
  }, [numberOfCards, pageSize]);

  return children({
    ...props,
    search,
    cards: slicedCards,
    numberOfCards: filteredCards.length,
  });
};
