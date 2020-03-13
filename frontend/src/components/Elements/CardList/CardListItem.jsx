import React from 'react';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { List, Typography, Row, Col } from 'antd';
import { getImageUris } from '../../../utils/cardStats';

const StyledRow = styled(Row)`
  align-items: center;
  display: flex;
  width: 100%;
`;

const StyledPreview = styled.img`
  height: auto;
  width: 26px;
  margin-right: 12px;
`;

const CardListItem = ({ card, history }) => {
  const image = card.previewImg || card.img || getImageUris(card).small;
  const onClick = () => {
    history.push(`/m/cards/${card.oracle_id}`);
  };
  return (
    <List.Item style={{ padding: '2px 8px' }}>
      <StyledRow onClick={onClick}>
        <Col span={3}>
          <StyledPreview src={image} />
        </Col>
        <Col span={20}>
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {card.name}
          </Typography.Text>
        </Col>
      </StyledRow>
    </List.Item>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  return ['id', 'amount', 'amountFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(withRouter(CardListItem, areEqual));
