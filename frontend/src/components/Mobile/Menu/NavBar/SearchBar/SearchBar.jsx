import React, { useRef, useContext, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { getDecks, getCollectionNames } from '../../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../../CardProvider/CardProvider';
import renderOption from './renderOption';
import {
  filterAndSortByQuery,
  filterByName,
} from '../../../../../utils/cardFilter';
import { wantsLists as wantsListsQuery } from '../../../WantsLists/queries';
import unifyCardFormat from '../../../../../utils/unifyCardFormat';

const MAX_RESULTS = 4;

const StyledBackground = styled.div`
  top: 48px;
  left: 0;
  width: 100vw;
  height: calc(100% - 48px);
  position: fixed;
  transition: opacity 0.3s;

  background-color: #1e1e1e;

  opacity: ${({ isVisible }) => (isVisible ? 0.7 : 0)};
  ${({ isVisible }) => (!isVisible ? 'pointer-events: none;' : '')};
`;

const sortByName = query => (a, b) => {
  if (query) return a.name > b.name ? 1 : -1;
  return Number(b.lastEdit) - Number(a.lastEdit);
};

const blur = () => {
  const field = document.createElement('input');
  field.setAttribute('type', 'text');
  document.body.appendChild(field);

  setTimeout(() => {
    field.focus();
    setTimeout(() => {
      field.setAttribute('style', 'display:none;');
    }, 50);
  }, 50);
};

const SearchBar = ({ history, transparentSearchBar }) => {
  const inputEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { cards } = useContext(CardContext);
  const { data: decksData } = useQuery(getDecks);
  const { data: wantsListData } = useQuery(wantsListsQuery);
  const { data: collectionData } = useQuery(getCollectionNames);
  const decks = (decksData && decksData.decks) || [];
  const wantsLists = (wantsListData && wantsListData.wantsLists) || [];
  const collection =
    (collectionData && unifyCardFormat(collectionData.collection.cards)) || [];

  const [{ query = '' }, setQuery] = useQueryParams({
    query: StringParam,
  });
  const onSetSearch = (value = '') => {
    const newQuery = value.startsWith('{') ? '' : value.split(';')[0];
    setQuery({ query: newQuery });
  };
  const onSelect = val => {
    blur();
    if (!val) {
      inputEl.current.blur();
      return;
    }
    const { type, id } = JSON.parse(val);
    inputEl.current.blur();

    if (type === 'DECK') {
      history.push(`/m/decks/${id}`);
    } else if (type === 'CARD') {
      const isCardView = history.location.pathname.match(/\/cards\/.+/);
      history[isCardView ? 'replace' : 'push'](`/m/cards/${id}?query=${query}`);
    } else {
      history.push(`/m/wants/${id}`);
    }
  };

  const filteredCards = filterAndSortByQuery(cards, query, MAX_RESULTS).map(
    card => ({
      ...card,
      owned: collection.some(({ name }) => name === card.name),
    })
  );
  const filteredDecks = filterByName(decks, query)
    .slice(0, MAX_RESULTS)
    .sort(sortByName(query));

  const filteredWantsLists = filterByName(wantsLists, query)
    .slice(0, MAX_RESULTS)
    .sort(sortByName(query));

  const optionCategories = [
    {
      name: 'Decks',
      type: 'DECK',
      options: filteredDecks,
    },
    {
      name: 'Wants Lists',
      type: 'WANTS',
      options: filteredWantsLists,
    },
    {
      name: 'Cards',
      type: 'CARD',
      options: filteredCards,
      onShowAll: () => {
        history.push(`/m/search?name=${query}&autoSearch=true`);
        onSelect();
      },
    },
  ];

  const dataSource = optionCategories
    .filter(({ options }) => options && options.length)
    .map(({ name, type, options, onShowAll }) => ({
      label: <OptionGroupHeader title={name} onShowAll={onShowAll} />,
      options: options.map(renderOption(query, type)),
    }));

  return (
    <>
      <AutoComplete
        allowClear
        open={isOpen}
        value={query}
        ref={inputEl}
        onChange={onSetSearch}
        onSelect={onSelect}
        options={dataSource}
        defaultActiveFirstOption
        onBlur={() => setIsOpen(false)}
        dropdownMatchSelectWidth={false}
        listHeight={360}
        placeholder="Search for card or deck"
        style={{ width: 'calc(100% - 16px)' }}
        className={transparentSearchBar && 'transparent'}
      >
        <Input
          className="no-border"
          onClick={() => setIsOpen(true)}
          onInput={() => setIsOpen(true)}
        />
      </AutoComplete>
      <StyledBackground isVisible={isOpen} />
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.transparentSearchBar !== nextProps.transparentSearchBar)
    return false;
  if (prevProps.location.search !== nextProps.location.search) return false;

  return true;
};

export default withRouter(React.memo(SearchBar, areEqual));
