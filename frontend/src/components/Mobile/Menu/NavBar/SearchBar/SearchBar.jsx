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

const MAX_RESULTS = 4;

const StyledBackground = styled.div`
  top: 48px;
  left: 0;
  width: 100vw;
  height: calc(100% - 50px);
  position: fixed;
  transition: opacity 0.3s;
  background-color: #1e1e1e;

  opacity: ${({ isVisible }) => (isVisible ? 0.7 : 0)};
  ${({ isVisible }) => (!isVisible ? 'pointer-events: none;' : '')};
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3px;
  height: 36px;
  align-items: center;
  margin: -2px 0;
`;

const CardImageWrapper = styled.div`
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledName = styled.span`
  margin-left: 11px;
  max-width: calc(100vw - ${({ isShort }) => (isShort ? 170 : 130)}px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledOwnedTag = styled.span`
  right: 16px;
  color: #1fb31f;
  font-size: 12px;
  position: absolute;
`;

const StyledDeckImage = styled.img`
  margin: 0 8px 0 0;
  border-radius: 2px;
  overflow: hidden;
  height: 23px;
  min-width: 32px;
  max-width: 32px;
  display: block;
`;

const StyledCardImage = styled.img`
  height: 36px;
  width: 26px;
  display: flex;
`;

const renderOption = onClick => element => {
  const { name, id, imgSrc, img, owned } = element;
  return (
    <AutoComplete.Option key={id} onClick={onClick} value={`${name};${id}`}>
      <StyledCard>
        <CardImageWrapper>
          {imgSrc ? (
            <StyledDeckImage src={imgSrc} />
          ) : (
            <StyledCardImage src={img} />
          )}
        </CardImageWrapper>
        <StyledName isShort={owned}>{name}</StyledName>
        <StyledOwnedTag>{owned && 'owned'}</StyledOwnedTag>
      </StyledCard>
    </AutoComplete.Option>
  );
};

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
        dropdownMenuStyle={{ maxHeight: '90vw' }}
        className={transparentSearchBar && 'transparent'}
      >
        <Input className="no-border" />
      </AutoComplete>
      <StyledBackground isVisible={isOpen} />
    </>
  );
};

export default withRouter(Menu);
