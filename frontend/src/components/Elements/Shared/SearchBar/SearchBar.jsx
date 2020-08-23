import React, { useRef, useContext, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { withRouter } from 'react-router';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { getOwnedCardNames } from '../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardContext from '../../../Provider/CardProvider';
import renderOption from './renderOption';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import { useToggle, useBlurOnEsc } from '../../../Hooks';
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
  const { data: ownedCardNamesData } = useQuery(getOwnedCardNames);
  const ownedCardNames = ownedCardNamesData ? ownedCardNamesData.ownedCardNames : [];

  const [query, setQuery] = useState('');

  const onSetSearch = (value = '') => {
    const newQuery = value.startsWith('{') ? '' : value.split(';')[0];
    setQuery(newQuery);
  };

  const onSelect = (oracleId) => {
    blur();
    onSetSearch();
    inputEl.current.blur();
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
        dropdownMatchSelectWidth={false}
        listHeight={360}
        dropdownStyle={dropdownStyle}
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
