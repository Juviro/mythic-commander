import React, { useRef } from 'react';
import { Input, AutoComplete, Spin } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';
import { useQuery } from 'react-apollo';

import styled from 'styled-components';
import { search } from '../../../../../queries';
import OptionGroupHeader from './OptionGroupHeader';
import CardIcon from '../../../../Elements/Card/Preview/CardIcon';

const MAX_RESULTS = 4;

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
  max-width: calc(100vw - 130px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledImage = styled.img`
  margin: 0 8px 0 0;
  border-radius: 2px;
  overflow: hidden;
  height: 23px;
  min-width: 32px;
  max-width: 32px;
  display: block;
`;

const StyledLoadingWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 14px;
`;

const renderOption = onClick => element => {
  const { name, id, imgSrc } = element;
  return (
    <AutoComplete.Option key={id} onClick={onClick} value={`${name};${id}`}>
      <StyledCard>
        <CardImageWrapper>
          {imgSrc ? <StyledImage src={imgSrc} /> : <CardIcon card={element} />}
        </CardImageWrapper>
        <StyledName>{name}</StyledName>
      </StyledCard>
    </AutoComplete.Option>
  );
};

const loadingIndicator = (
  <StyledLoadingWrapper>
    <Spin style={{ display: 'flex', justifyContent: 'center' }} />
  </StyledLoadingWrapper>
);

const Menu = ({ history, transparentSearchBar }) => {
  const inputEl = useRef(null);

  const [{ query = '' }, setQuery] = useQueryParams({
    query: StringParam,
  });
  const { data, loading } = useQuery(search, {
    variables: { query, limit: MAX_RESULTS },
  });
  const onSetSearch = value => {
    setQuery({ query: value.split(';')[0] });
  };
  const onSelect = () => {
    inputEl.current.blur();
  };

  const onOpenCardView = ({ key }) => {
    const id = key.split(';')[1];
    history.push(`/m/cards/${id}?query=${query}`);
  };

  const { collection, decks, cards } = (data && data.search) || {};
  const optionCategories = [
    {
      name: 'Decks',
      options: decks,
      onClick: ({ key }) => {
        const id = key.split(';')[1];
        history.push(`/m/decks/${id}`);
      },
      onShowAll: () => history.push(`/m/decks?query=${query}`),
    },
    {
      name: 'Collection',
      options: collection,
      onClick: onOpenCardView,
      onShowAll: () => history.push(`/m/collection?query=${query}`),
    },
    {
      name: 'Cards',
      options: cards,
      onClick: onOpenCardView,
      onShowAll: () => history.push(`/m/cards?query=${query}`),
    },
  ];

  const dataSource = optionCategories
    .map(({ options, ...rest }) => ({
      options:
        options &&
        options.filter(({ name: optionName }) =>
          optionName.toLowerCase().includes(query.toLowerCase())
        ),
      ...rest,
    }))
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
        value={query}
        ref={inputEl}
        onChange={onSetSearch}
        onSelect={onSelect}
        dataSource={dataSource}
        dropdownMatchSelectWidth={false}
        placeholder="Search for something"
        style={{ width: 'calc(100% - 16px)' }}
        dropdownMenuStyle={{ maxHeight: '90vw' }}
        className={transparentSearchBar && 'transparent'}
      >
        <Input className="no-border" />
      </AutoComplete>
      {loading && loadingIndicator}
    </>
  );
};

export default withRouter(Menu);
