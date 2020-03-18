import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo';
import { Divider, message } from 'antd';
import { getMobileCollection, addToCollectionMobile } from './queries';

import { ListOrder, AddCardMobile } from '../../Elements';
import CollectionOverview from './CollectionOverview';
import CollapsableFilter from '../../Elements/Filter/CollapsableFilter';
import FilteredCardList from '../../Elements/CardList/FilteredCardList';
import CardModal from '../Card/CardModal';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const { data } = useQuery(getMobileCollection);
  const cards = data && data.collection.cards;
  const [mutate] = useMutation(addToCollectionMobile);

  const onAddCard = (newCard, name) => {
    message.success(
      <span>
        Added <b>{name}</b> to your collection!
      </span>
    );
    mutate({
      variables: { cards: [newCard] },
      update: (cache, { data: updateData }) => {
        if (!updateData) return;
        const { addToCollection: newCards } = updateData;
        const existing = cache.readQuery({
          query: getMobileCollection,
        });

        const existingCards = existing.collection.cards.filter(
          ({ oracle_id }) =>
            !newCards.some(card => card.oracle_id === oracle_id)
        );

        cache.writeQuery({
          query: getMobileCollection,
          data: {
            collection: {
              ...existing.collection,
              cards: existingCards.concat(newCards),
            },
          },
        });
      },
    });
  };

  return (
    <StyledWrapper>
      <CollectionOverview cards={cards} />
      <CollapsableFilter />
      <ListOrder showCollectionFilters />
      <Divider />
      <FilteredCardList cards={cards} />
      <AddCardMobile onAddCard={onAddCard} />
      <CardModal />
    </StyledWrapper>
  );
};
