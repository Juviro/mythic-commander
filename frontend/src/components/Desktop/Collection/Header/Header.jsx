import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { Drawer as AddCardsDrawer } from '../../../Elements';
import { addToCollection } from '../../../../queries';
import { getCollectionDesktop } from '../queries';

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const AddCardsButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 255px;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [mutate] = useMutation(addToCollection);
  const onAddCards = cards => {
    mutate({
      variables: { cards },
      update: (cache, { data }) => {
        if (!data) return;
        const { addToCollection: newCards } = data;
        const existing = cache.readQuery({
          query: getCollectionDesktop,
        });

        const existingCards = existing.collection.cards.filter(
          ({ id }) => !newCards.some(card => card.id === id)
        );

        cache.writeQuery({
          query: getCollectionDesktop,
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
    <StyledHeader>
      <AddCardsButtonWrapper>
        <Button type="primary" onClick={() => setIsDrawerVisible(true)}>
          <Icon type="plus" />
          Add Cards
        </Button>
      </AddCardsButtonWrapper>
      <AddCardsDrawer
        onAddCards={onAddCards}
        isVisible={isDrawerVisible}
        setIsVisible={setIsDrawerVisible}
      />
    </StyledHeader>
  );
};
