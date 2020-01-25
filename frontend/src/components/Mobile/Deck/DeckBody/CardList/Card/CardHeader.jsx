import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import CardIcon from '../../../../../Elements/Card/Preview/CardIcon';

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${({ isLegal }) => (!isLegal ? 'background-color: #ffcfcf;' : '')}
`;

export default ({ card, onClick, isLegal }) => {
  return (
    <StyledCardWrapper onClick={onClick} isLegal={isLegal}>
      <Left>
        <CardIcon card={card} />
        <Typography.Text ellipsis style={{ fontSize: 14, width: '100%', marginLeft: 16 }}>
          {card.name}
        </Typography.Text>
      </Left>
      {card.amount > 1 && <span>{`${card.amount}x`}</span>}
    </StyledCardWrapper>
  );
};
