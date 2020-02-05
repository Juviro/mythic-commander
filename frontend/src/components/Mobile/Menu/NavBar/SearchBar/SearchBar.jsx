import React, { useContext, useRef } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import {
  getDecks as getDecksQuery,
  getCollection,
} from '../../../../../queries';
import { getDecks } from './Decks';
import { getCards } from './Cards';
import CardContext from '../../../../CardProvider/CardProvider';

const MAX_RESULTS = 4;

const Menu = ({ history, transparentSearchBar }) => {
  const inputEl = useRef(null);

  const [{ query }, setQuery] = useQueryParams({
    query: StringParam,
  });

  const { data: decksData } = useQuery(getDecksQuery);
  const { data: collectionData } = useQuery(getCollection);
  const { cardNames } = useContext(CardContext);

  const onSetSearch = value => {
    setQuery({ query: value.split(';')[0] });
  };

  const dataSource = [
    getDecks(decksData, query, history, MAX_RESULTS),
    ...getCards(collectionData, query, history, MAX_RESULTS, cardNames),
  ].filter(Boolean);

  const onSelect = () => {
    inputEl.current.blur();
  };

  return (
    <AutoComplete
      value={query}
      ref={inputEl}
      onChange={onSetSearch}
      onSelect={onSelect}
      dataSource={dataSource}
      dropdownMatchSelectWidth={false}
      placeholder="Search for something"
      style={{ width: 'calc(100% - 16px)' }}
      dropdownMenuStyle={{ maxHeight: '95vh' }}
      className={transparentSearchBar && 'transparent'}
    >
      <Input className="no-border" />
    </AutoComplete>
  );
};

export default withRouter(Menu);
