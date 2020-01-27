import React from 'react';
import { List, Typography, Icon } from 'antd';
import styled from 'styled-components';

import { isCardLegal } from '../../../../../../utils/cardStats';
import CardStats from './CardStats';
import CardImage from './CardImage';

const StyledListItem = styled(List.Item)`
  padding: 2px 4px;
  margin: 2px 4px;
  width: 100%;
  display: flex;
  min-height: 36px;
  align-items: end;
  line-height: 36px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const StyledCardNameWrapper = styled.div`
  font-size: 14;
  position: absolute;
  transition: all 0.4s;
  left: 46px;

  width: calc(100% - ${({ isOpen }) => (isOpen ? '60px' : '90px')});
  left: ${({ isOpen }) => (isOpen ? '12px' : '46px')};
`;

const StyledIconWrapper = styled.div`
  transition: all 0.4s;
  position: absolute;
  right: 16px;

  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '270deg')});
`;

const StyledSeparator = styled.div`
  width: 100vw;
  height: 1px;
  position: absolute;
  margin-top: 32px;
  background-color: rgba(100, 100, 100, 0.3);
  transition: all 0.4s;

  ${({ isVisible }) => {
    if (isVisible) return 'left:  0;';
    return `
      left: -100vw;
      transition: none;
    `;
  }};
`;

export default ({ card, commander, setOpenCardId, isOpen }) => {
  // TODO: show attention icon for non legal cards
  const isLegal = isCardLegal(card, commander);
  const cardName = `${card.name}${card.amount > 1 ? ` x${card.amount}` : ''}`;

  return (
    <StyledListItem onClick={!isOpen ? () => setOpenCardId(card.oracle_id) : undefined}>
      <StyledBody>
        <CardImage card={card} isOpen={isOpen} />
        <StyledCardNameWrapper isOpen={isOpen} onClick={isOpen ? () => setOpenCardId(null) : undefined}>
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {cardName}
          </Typography.Text>
        </StyledCardNameWrapper>
        <StyledIconWrapper isOpen={isOpen} onClick={() => setOpenCardId(null)}>
          <Icon type="up" />
        </StyledIconWrapper>
        <StyledSeparator isVisible={isOpen} />
        <CardStats card={card} isVisible={isOpen} isLegal={isLegal} />
      </StyledBody>
    </StyledListItem>
  );
};
