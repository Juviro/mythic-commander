import React from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';

import { isCardLegal } from '../../../../../../utils/cardStats';
import CardStats from './CardStats';
import CardImage from './CardImage';

const StyledListItem = styled(List.Item)`
  padding: 2px 4px;
  margin: 2px 4px;
  border-radius: 4px;
`;

const StyledItemWrapper = styled.div`
  width: 100%;
  ${({ isLegal }) => (!isLegal ? 'background-color: #ffcfcf;' : '')}
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  line-height: 36px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCardNameWrapper = styled.div`
  font-size: 14;
  position: absolute;
  transition: all 0.2s;
  width: calc(100% - ${({ isOpen }) => (isOpen ? '60px' : '90px')});

  left: ${({ isOpen }) => (isOpen ? '12px' : '46px')};
`;

export default ({ card, commander, setOpenCardId, isOpen }) => {
  // TODO: show attention icon for non legal cards
  const toggleIsOpen = () => setOpenCardId(isOpen ? null : card.id);

  return (
    <StyledListItem>
      <StyledItemWrapper isLegal={isCardLegal(card, commander)} onClick={toggleIsOpen}>
        <StyledCardWrapper>
          <Left>
            <CardImage card={card} isOpen={isOpen} />
            <StyledCardNameWrapper isOpen={isOpen}>
              <Typography.Text style={{ display: 'block' }} ellipsis>
                {card.name}
              </Typography.Text>
            </StyledCardNameWrapper>
            <CardStats card={card} isVisible={isOpen} />
          </Left>
          {card.amount > 1 && <span>{`${card.amount}x`}</span>}
        </StyledCardWrapper>
      </StyledItemWrapper>
    </StyledListItem>
  );
};
