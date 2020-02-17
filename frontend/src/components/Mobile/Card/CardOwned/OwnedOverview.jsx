import React, { useState } from 'react';
import styled from 'styled-components';
import { List } from 'antd';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ cards, isOpen }) => {
  console.log('cards :', cards);
  const [isEditing, setIsEditing] = useState(false);
  const ownedCards = cards.filter(
    ({ amount, amountFoil }) => amount + amountFoil
  );

  return (
    <StyledWrapper isOpen={isOpen}>
      <List
        size="small"
        bordered
        dataSource={ownedCards}
        renderItem={card => <List.Item>{card.set_name}</List.Item>}
      />
    </StyledWrapper>
  );
};
