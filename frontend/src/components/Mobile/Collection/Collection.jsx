import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo';
import { Divider, message } from 'antd';
import { getMobileCollection, addToCollection } from './queries';

import { CardList, ListOrder, AddCardMobile } from '../../Elements';
import CollectionOverview from './CollectionOverview';
import CollapsableFilter from '../../Elements/Filter/CollapsableFilter';

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
  const [mutate] = useMutation(addToCollection);

  const onAddCard = (card, name) => {
    message.success(
      <span>
        Added <b>{name}</b> to your collection!
      </span>
    );
    mutate({
      variables: { cards: [card] },
    });
  };

  return (
    <StyledWrapper>
      <CollectionOverview cards={cards} />
      <CollapsableFilter />
      <ListOrder />
      <Divider />
      <CardList cards={cards} />
      <AddCardMobile onAddCard={onAddCard} />
    </StyledWrapper>
  );
};
