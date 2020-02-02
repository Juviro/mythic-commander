import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { Drawer as AddCardsDrawer } from '../../../Elements/AddCards';
import { addToCollectionByName } from '../../../../queries';

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
  const [mutate] = useMutation(addToCollectionByName);
  const onAddCards = cardNames => {
    mutate({
      variables: { cards: cardNames.map(name => ({ name })) },
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
