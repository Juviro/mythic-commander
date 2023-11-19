import React from 'react';
import { Spin, Empty } from 'antd';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import { getImageUrl } from '../../../utils/cardImage';
import CardMenu from './CardMenu';
import shimmer from '../../Animations/shimmer';

const StyledWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 16px;
  padding-top: 8px;
  width: 100%;
  align-self: center;
`;

const StyledCardWrapper = styled.div`
  height: 347px;
  width: 249px;
  position: relative;

  ${shimmer}
`;

const StyledCard = styled.img`
  width: 100%;
  height: 100%;
`;

export default ({ cards, loading, onRemoveCard, onSetAmount }) => {
  if (loading || !cards) {
    return (
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Spin />
      </Flex>
    );
  }

  if (!cards?.length) {
    return (
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Empty description="Add cards to this list to print them" />
      </Flex>
    );
  }

  return (
    <StyledWrapper>
      {cards.map(({ id, imgKey, amount }) => (
        <StyledCardWrapper key={id}>
          <CardMenu
            amount={amount}
            onSetAmount={(newAmount) => onSetAmount(id, newAmount)}
            onRemoveCard={() => onRemoveCard(id)}
          />
          <StyledCard src={getImageUrl(id, imgKey, 'normal')} />
        </StyledCardWrapper>
      ))}
    </StyledWrapper>
  );
};
