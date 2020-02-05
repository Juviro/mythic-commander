import React from 'react';
import styled from 'styled-components';
import { AutoComplete } from 'antd';

import OptionGroupHeader from './OptionGroupHeader';
import {
  filterCards,
  sortCards,
} from '../../../../Elements/SearchField/filterNames';
import CardIcon from '../../../../Elements/Card/Preview/CardIcon';

const StyledDeck = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3px;
  margin: -4px 0;
`;

const StyledName = styled.span`
  margin-left: 11px;
`;

const renderCard = onClick => card => {
  const { name, id } = card;
  return (
    <AutoComplete.Option key={id} onClick={onClick} value={`${name};${id}`}>
      <StyledDeck>
        {card.id && <CardIcon card={card} />}
        <StyledName>{name}</StyledName>
      </StyledDeck>
    </AutoComplete.Option>
  );
};

export const getCards = (
  collectionData,
  query = '',
  history,
  maxResults,
  cardNames
) => {
  const collection = (collectionData && collectionData.collection.cards) || [];
  const cardListCollection = filterCards(collection, query).sort(
    sortCards(query)
  );
  const totalResultsCollection = cardListCollection.length;
  const onClickCollection = ({ key }) => {
    const id = key.split(';')[1];
  };
  const onShowAllCollection = () => {
    history.push(`/m/collection?query=${query}`);
  };

  const cardListCards = filterCards(
    cardNames.map(name => ({ name, id: '' })),
    query
  )
    .filter(
      ({ name }) =>
        !cardListCollection.some(collectionCard => collectionCard.name === name)
    )
    .sort(sortCards(query));
  const totalResultsCards = cardListCards.length;
  const onClickCards = ({ key }) => {
    console.log('TCL: onClickCards -> key', key);
  };
  const onShowAllCards = () => {
    history.push(`/m/search?query=${query}`);
  };

  return [
    cardListCollection.length && (
      <AutoComplete.OptGroup
        key="collection"
        label={
          <OptionGroupHeader
            title="Collection"
            showMoreButton={{
              onClick: onShowAllCollection,
              visible: totalResultsCollection > maxResults,
              totalResults: totalResultsCollection,
            }}
          />
        }
      >
        {cardListCollection
          .slice(0, maxResults)
          .map(renderCard(onClickCollection))}
      </AutoComplete.OptGroup>
    ),
    cardListCards.length && (
      <AutoComplete.OptGroup
        key="cards"
        label={
          <OptionGroupHeader
            title="Cards"
            showMoreButton={{
              onClick: onShowAllCards,
              visible: totalResultsCards > maxResults,
              totalResults: totalResultsCards,
            }}
          />
        }
      >
        {cardListCards.slice(0, maxResults).map(renderCard(onClickCards))}
      </AutoComplete.OptGroup>
    ),
  ];
};
