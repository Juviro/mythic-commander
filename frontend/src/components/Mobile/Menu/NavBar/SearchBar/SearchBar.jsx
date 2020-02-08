import React, { useRef, useContext, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { getDecks, getCollection } from '../../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../../CardProvider/CardProvider';
import filterNames from '../../../../Elements/SearchField/filterNames';
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

const Menu = ({ history, transparentSearchBar }) => {
  const inputEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { cards } = useContext(CardContext);
  const { data: decksData } = useQuery(getDecks);
  const { data: collectionData } = useQuery(getCollection);
  const decks = (decksData && decksData.decks) || [];
  const collection = (collectionData && collectionData.collection.cards) || [];

  const [{ query = '' }, setQuery] = useQueryParams({
    query: StringParam,
  });
  const onSetSearch = (value = '') => {
    setQuery({ query: value.split(';')[0] });
  };
  const onSelect = () => {
    inputEl.current.blur();
  };

  const onOpenCardView = ({ key }) => {
    const id = key.split(';')[1];
    history.push(`/m/cards/${id}?query=${query}`);
  };

  const filteredCards = filterNames(cards, query, MAX_RESULTS).map(card => ({
    ...card,
    owned: collection.some(({ name }) => name === card.name),
  }));
  const filteredDecks = decks
    .filter(({ name }) =>
      name
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(query.toLowerCase().replace(/\s/g, ''))
    )
    .slice(0, MAX_RESULTS);

  const optionCategories = [
    {
      name: 'Decks',
      options: filteredDecks,
      onClick: ({ key }) => {
        const id = key.split(';')[1];
        history.push(`/m/decks/${id}`);
      },
      onShowAll: () => history.push(`/m/decks?query=${query}`),
    },
    {
      name: 'Cards',
      options: filteredCards,
      onClick: onOpenCardView,
      onShowAll: () => history.push(`/m/cards?query=${query}`),
    },
  ];

  const dataSource = optionCategories
    .filter(({ options }) => options && options.length)
    .map(({ name, options, onClick, onShowAll }) => (
      <AutoComplete.OptGroup
        key={name}
        label={
          <OptionGroupHeader
            title={name}
            onShowAll={() => {
              onShowAll();
              onSelect();
            }}
          />
        }
      >
        {options.map(renderOption(onClick))}
      </AutoComplete.OptGroup>
    ));

  return (
    <>
      <AutoComplete
        allowClear
        open={isOpen}
        value={query}
        ref={inputEl}
        onChange={onSetSearch}
        onSelect={onSelect}
        dataSource={dataSource}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        dropdownMatchSelectWidth={false}
        placeholder="Search for something"
        style={{ width: 'calc(100% - 16px)' }}
        dropdownMenuStyle={{ maxHeight: '90vh' }}
        className={transparentSearchBar && 'transparent'}
      >
        <Input className="no-border" />
      </AutoComplete>
      <StyledBackground isVisible={isOpen} />
    </>
  );
};

export default withRouter(Menu);
