import React, { useRef, useContext } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { getCollectionNames } from '../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../CardProvider/CardProvider';
import renderOption from './renderOption';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import unifyCardFormat from '../../../../utils/unifyCardFormat';
import { useToggle } from '../../../Hooks';

const MAX_RESULTS = 20;

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

const SearchBar = ({ history, transparent, style, hideLayover }) => {
  const inputEl = useRef(null);
  const [isOpen, toggleIsOpen] = useToggle(false);
  const { cards } = useContext(CardContext);
  const { data: collectionData } = useQuery(getCollectionNames);
  const collection =
    (collectionData && unifyCardFormat(collectionData.collection.cards)) || [];

  const [{ query = '' }, setQuery] = useQueryParams({
    query: StringParam,
  });

  const onSetSearch = (value = '') => {
    const newQuery = value.startsWith('{') ? '' : value.split(';')[0];
    setQuery({ query: newQuery });
  };

  const onSelect = oracleId => {
    blur();
    onSetSearch();
    inputEl.current.blur();
    if (!oracleId) return;

    const isCardView = history.location.pathname.match(/\/cards\/.+/);
    history[isCardView ? 'replace' : 'push'](
      `/m/cards/${oracleId}?query=${query}`
    );
  };

  const filteredCards = filterAndSortByQuery(cards, query);

  const slicedCards = filteredCards.slice(0, MAX_RESULTS).map(card => ({
    ...card,
    owned: collection.some(({ name }) => name === card.name),
  }));

  const onShowAll = () => {
    setTimeout(() => window.scrollTo(0, 0), 100);
    history.push(`/m/search?name=${query}`);
    onSelect();
  };

  const dataSource = [
    {
      label: (
        <OptionGroupHeader
          numberOfCards={filteredCards.length}
          onShowAll={onShowAll}
        />
      ),
      options: slicedCards.map(renderOption(query)),
    },
  ];

  return (
    <>
      <AutoComplete
        open={isOpen}
        value={query}
        ref={inputEl}
        onChange={onSetSearch}
        onSelect={onSelect}
        options={dataSource}
        defaultActiveFirstOption
        onBlur={() => toggleIsOpen(false)}
        dropdownMatchSelectWidth={false}
        listHeight={360}
        placeholder="Search for a card..."
        style={{ width: 'calc(100% - 16px)', ...style }}
        className={transparent ? 'transparent' : 'dark-placeholder'}
      >
        <Input
          allowClear
          theme="dark"
          className="no-border"
          onClick={() => toggleIsOpen(true)}
          onInput={() => toggleIsOpen(true)}
        />
      </AutoComplete>
      {!hideLayover && <StyledBackground isVisible={isOpen} />}
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.transparent !== nextProps.transparent) return false;
  if (prevProps.location.search !== nextProps.location.search) return false;

  return true;
};

export default withRouter(React.memo(SearchBar, areEqual));
