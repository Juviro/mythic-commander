import React from 'react';
import { List, Typography, Icon } from 'antd';
import styled from 'styled-components';

import CardImage from './CardImage';

const StyledListItem = styled(List.Item)`
  width: 100%;
  display: flex;
  margin: 2px 4px;
  padding: 2px 4px;
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
  position: absolute;
  transition: all 0.2s;
  left: 46px;
  display: flex;

  width: calc(100% - ${({ isOpen }) => (isOpen ? '60px' : '90px')});
  left: ${({ isOpen }) => (isOpen ? '12px' : '46px')};
`;

const StyledIconWrapper = styled.div`
  transition: all 0.2s;
  position: absolute;
  right: 16px;

  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '270deg')});
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

export default ({
  card,
  isOpen,
  setOpenCardId,
  cardBody = null,
  additionalIcon = null,
}) => {
  // TODO: make card flippable
  return (
    <StyledListItem
      onClick={!isOpen ? () => setOpenCardId(card.oracle_id) : undefined}
    >
      <StyledBody>
        <CardImage card={card} isOpen={isOpen} />
        <StyledCardNameWrapper
          isOpen={isOpen}
          onClick={isOpen ? () => setOpenCardId(null) : undefined}
        >
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {card.name}
          </Typography.Text>
          {card.amount > 1 && (
            <Typography.Text
              style={{ display: 'block', marginLeft: 4 }}
              ellipsis
            >
              {`x${card.amount}`}
            </Typography.Text>
          )}
        </StyledCardNameWrapper>
        {additionalIcon}
        <StyledIconWrapper isOpen={isOpen} onClick={() => setOpenCardId(null)}>
          <Icon type="up" />
        </StyledIconWrapper>
        {cardBody}
      </StyledBody>
    </StyledListItem>
  );
};
