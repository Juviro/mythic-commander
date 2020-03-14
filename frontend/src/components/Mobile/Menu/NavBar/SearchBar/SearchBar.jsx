import React, { useRef, useContext, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { getDecks, getCollectionNames } from '../../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../../CardProvider/CardProvider';
import filterNames, {
  filterByName,
} from '../../../../Elements/SearchField/filterNames';
import renderOption from './renderOption';

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

const sortDecks = query => (a, b) => {
  if (query) return a.name > b.name ? 1 : -1;
  return Number(b.lastEdit) - Number(a.lastEdit);
};

const SearchBar = ({ history, transparentSearchBar }) => {
  const inputEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { cards } = useContext(CardContext);
  const { data: decksData } = useQuery(getDecks);
  const { data: collectionData } = useQuery(getCollectionNames);
  const decks = (decksData && decksData.decks) || [];
  const collection = (collectionData && collectionData.collection.cards) || [];

  const [{ query = '' }, setQuery] = useQueryParams({
    query: StringParam,
  });
  const onSetSearch = (value = '') => {
    setQuery({ query: value.split(';')[0] });
  };
  const onSelect = val => {
    const { type, id } = JSON.parse(val);
    setQuery({ query: '' });
    inputEl.current.blur();

    if (type === 'DECK') {
      history.push(`/m/decks/${id}`);
    } else {
      history.push(`/m/cards/${id}?query=${query}`);
    }
  };

  const filteredCards = filterNames(cards, query, MAX_RESULTS).map(card => ({
    ...card,
    owned: collection.some(({ name }) => name === card.name),
  }));
  const filteredDecks = filterByName(decks, query)
    .slice(0, MAX_RESULTS)
    .sort(sortDecks(query));

  const optionCategories = [
    {
      name: 'Cards',
      options: filteredCards,
      onShowAll: () => history.push(`/m/cards?query=${query}`),
    },
    {
      name: 'Decks',
      options: filteredDecks,
      onShowAll: () => history.push(`/m/decks?query=${query}`),
    },
  ];

  const dataSource = optionCategories
    .filter(({ options }) => options && options.length)
    .map(({ name, options, onShowAll }) => ({
      label: (
        <OptionGroupHeader
          title={name}
          onShowAll={() => {
            onShowAll();
            onSelect();
          }}
        />
      ),
      options: options.map(renderOption(query)),
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
