import React from 'react';
import styled from 'styled-components';
import { AutoComplete } from 'antd';

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

export const getDecks = (decksData, query = '', history) => {
  const decks = (decksData && decksData.decks) || [];

  const onOpenDeck = ({ key }) => {
    const id = key.split(';')[1];
    history.push(`/m/deck/${id}`);
  };

  const deckList = decks
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    .map(renderDeck(onOpenDeck));

  if (!deckList.length) return null;

  return (
    <AutoComplete.OptGroup key="decks" label="Decks">
      {deckList}
    </AutoComplete.OptGroup>
  );
};
