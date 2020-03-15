import React from 'react';
import styled from 'styled-components';
import { List, Typography } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { CardListImage } from '../../../../../Elements';

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
  return (
    <StyledListItem
      onClick={!isOpen ? () => setOpenCardId(card.oracle_id) : undefined}
    >
      <StyledBody>
        <CardListImage card={card} isOpen={isOpen} />
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
          <UpOutlined />
        </StyledIconWrapper>
        {cardBody}
      </StyledBody>
    </StyledListItem>
  );
};
