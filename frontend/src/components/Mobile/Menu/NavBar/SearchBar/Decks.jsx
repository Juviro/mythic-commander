import React from 'react';
import styled from 'styled-components';
import { AutoComplete } from 'antd';

import OptionGroupHeader from './OptionGroupHeader';

const StyledDeck = styled.div`
  display: flex;
  flex-direction: row;
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

const renderDeck = onClick => ({ name, id, imgSrc }) => {
  return (
    <AutoComplete.Option key={id} onClick={onClick} value={`${name};${id}`}>
      <StyledDeck>
        <StyledImage src={imgSrc} />
        {name}
      </StyledDeck>
    </AutoComplete.Option>
  );
};

export const getDecks = (decksData, query = '', history, maxResults) => {
  const decks = (decksData && decksData.decks) || [];

  const onOpenDeck = ({ key }) => {
    const id = key.split(';')[1];
    history.push(`/m/deck/${id}`);
  };

  const onShowAll = () => {
    history.push(`/m/decks?query=${query}`);
  };

  const deckList = decks
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (a.name < b.name ? -1 : 1));
  const totalResults = deckList.length;

  if (!totalResults) return null;

  return (
    <AutoComplete.OptGroup
      key="decks"
      label={
        <OptionGroupHeader
          title="Decks"
          showMoreButton={{
            onClick: onShowAll,
            visible: totalResults > maxResults,
            totalResults,
          }}
        />
      }
    >
      {deckList.slice(0, maxResults).map(renderDeck(onOpenDeck))}
    </AutoComplete.OptGroup>
  );
};
