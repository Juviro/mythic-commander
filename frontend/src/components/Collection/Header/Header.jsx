import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { Drawer as AddCardsDrawer } from '../../Elements/AddCards';
import { addToCollectionByName, addToCollectionHelper, deleteFromCollection } from '../../../queries';

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

const addCards = (mutate, cards, undoAdd) => {
  mutate({
    variables: { cards },
    optimisticResponse: addToCollectionHelper.optimisticResponse(cards),
    update: addToCollectionHelper.update(undoAdd),
  });
};

export default () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [mutate] = useMutation(addToCollectionByName);
  const [undoAdd] = useMutation(deleteFromCollection);
  const onAddCards = cardNames => {
    addCards(
      mutate,
      cardNames.map(name => ({ name })),
      undoAdd
    );
  };

  return (
    <StyledHeader>
      <AddCardsButtonWrapper>
        <Button type="primary" onClick={() => setIsDrawerVisible(true)}>
          <Icon type="plus" />
          Add Cards
        </Button>
      </AddCardsButtonWrapper>
      <AddCardsDrawer onAddCards={onAddCards} isVisible={isDrawerVisible} setIsVisible={setIsDrawerVisible} />
    </StyledHeader>
  );
};
