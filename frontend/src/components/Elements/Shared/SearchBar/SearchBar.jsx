import React, { useRef, useContext, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQuery } from '@apollo/client';

import styled from 'styled-components';
import { getOwnedCardNames } from '../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../Provider/CardProvider';
import renderOption from './renderOption';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import { useToggle, useBlurOnEsc, useShortcut } from '../../../Hooks';
import getDynamicUrl from '../../../../utils/getDynamicUrl';
import isMobile from '../../../../utils/isMobile';

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

const SearchBar = ({ history, transparent, style, hideLayover }) => {
  const inputEl = useRef(null);
  const [isOpen, toggleIsOpen] = useToggle(false);
  const { cards } = useContext(CardContext);
  const { data: ownedCardNamesData } = useQuery(getOwnedCardNames);
  const ownedCardNames = ownedCardNamesData ? ownedCardNamesData.ownedCardNames : [];

  const [query, setQuery] = useState('');

  const focusInput = () => inputEl.current?.focus();
  useShortcut('c', focusInput);

  const onSetSearch = (value = '') => {
    const newQuery = value.startsWith('{') ? '' : value.split(';')[0];
    setQuery(newQuery);
  };

  const onSelect = (oracleId) => {
    inputEl?.current?.blur();
    onSetSearch();
    toggleIsOpen(false);
    if (!oracleId) return;

    const shouldReplace = history.location.pathname.match(/\/cards\/.+/) && isMobile();
    history[shouldReplace ? 'replace' : 'push'](getDynamicUrl(`/cards/${oracleId}`));
  };

  const filteredCards = filterAndSortByQuery(cards, query);

  const slicedCards = filteredCards.slice(0, MAX_RESULTS).map((card) => ({
    ...card,
    owned: ownedCardNames.includes(card.name),
  }));

  const onShowAll = () => {
    setTimeout(() => window.scrollTo(0, 0), 100);
    history.push(getDynamicUrl(`/search?name=${query}`));
    onSelect();
  };

  const dataSource = [
    {
      label: (
        <OptionGroupHeader numberOfCards={filteredCards.length} onShowAll={onShowAll} />
      ),
      options: slicedCards.map(renderOption(query)),
    },
  ];

  const dropdownStyle = isMobile() ? undefined : { minWidth: 350 };

  return (
    <>
      <AutoComplete
        open={isOpen}
        value={query}
        ref={inputEl}
        onChange={onSetSearch}
        onSelect={onSelect}
        options={dataSource}
        onKeyDown={useBlurOnEsc}
        defaultActiveFirstOption
        onBlur={() => toggleIsOpen(false)}
        listHeight={360}
        popupMatchSelectWidth
        dropdownStyle={dropdownStyle}
        style={{ width: 'calc(100% - 16px)', ...style }}
        className={transparent ? 'transparent' : 'dark-placeholder'}
      >
        <Input
          allowClear
          theme="dark"
          className="no-border"
          placeholder={isMobile() ? 'Search for a card... ' : 'Search for a card... [C]'}
          onClick={() => toggleIsOpen(true)}
          onInput={() => toggleIsOpen(true)}
        />
      </AutoComplete>
      {!hideLayover && <StyledBackground isVisible={isOpen} />}
    </>
  );
};

export default withRouter(SearchBar);
