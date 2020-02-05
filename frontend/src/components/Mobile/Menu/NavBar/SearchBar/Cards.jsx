import React from 'react';
import styled from 'styled-components';
import { AutoComplete, Icon } from 'antd';

import OptionGroupHeader from './OptionGroupHeader';
import {
  filterCards,
  sortCards,
} from '../../../../Elements/SearchField/filterNames';
import CardIcon from '../../../../Elements/Card/Preview/CardIcon';
import client from '../../../../../network/graphqlClient';
import { getCardByName } from '../../../../../queries';

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
`;

const renderCard = onClick => card => {
  const { name, id } = card;
  return (
    <AutoComplete.Option key={id} onClick={onClick} value={`${name};${id}`}>
      <StyledCard>
        <CardImageWrapper>
          {card.id ? (
            <CardIcon card={card} />
          ) : (
            <Icon type="file-image" style={{ fontSize: 24 }} />
          )}
        </CardImageWrapper>
        <StyledName>{name}</StyledName>
      </StyledCard>
    </AutoComplete.Option>
  );
};

export const getCards = (
  collectionData,
  query,
  history,
  maxResults,
  cardNames
) => {
  if (!query) return [];
  const collection = filterCards(
    (collectionData && collectionData.collection.cards) || [],
    query
  ).sort(sortCards(query));

  const cards = filterCards(
    cardNames.map(name => ({ name, id: '' })),
    query
  )
    .filter(
      ({ name }) =>
        !collection.some(collectionCard => collectionCard.name === name)
    )
    .sort(sortCards(query));

  const totalResultsCollection = collection.length;
  const totalResultsCards = cards.length;

  const onClick = async ({ key }) => {
    // eslint-disable-next-line prefer-const
    let [name, id] = key.split(';');
    if (!id) {
      const result = await client.query({
        query: getCardByName,
        variables: { name },
      });
      id = result && result.data.getCardByName.id;
    }
    history.push(`/m/cards/${id}?query=${name}`);
  };

  const onShowAllCollection = () => {
    history.push(`/m/collection?query=${query}`);
  };
  const onShowAllCards = () => {
    history.push(`/m/cards?query=${query}`);
  };

  return [
    collection.length && (
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
        {collection.slice(0, maxResults).map(renderCard(onClick))}
      </AutoComplete.OptGroup>
    ),
    cards.length && (
      <AutoComplete.OptGroup
        key="cards"
        label={
          <OptionGroupHeader
            title="Other Cards"
            showMoreButton={{
              onClick: onShowAllCards,
              visible: totalResultsCards > maxResults,
              totalResults: totalResultsCards,
            }}
          />
        }
      >
        {cards.slice(0, maxResults).map(renderCard(onClick))}
      </AutoComplete.OptGroup>
    ),
  ];
};
