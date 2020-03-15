import React from 'react';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { List, Typography, Row, Col } from 'antd';
import { highlightText } from '../../../utils/highlightText';
import CardListImage from '../CardListImage';

const StyledRow = styled(Row)`
  align-items: center;
  display: flex;
  width: 100%;
`;

const CardListItem = ({ card, history, searchString }) => {
  const onClick = () => {
    history.push(`/m/cards/${card.oracle_id}`);
  };
  return (
    <List.Item style={{ padding: '2px 8px', height: 40 }}>
      <StyledRow onClick={onClick}>
        <Col span={3}>
          <CardListImage card={card} />
        </Col>
        <Col span={20}>
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {highlightText(searchString, card.name)}
          </Typography.Text>
        </Col>
      </StyledRow>
    </List.Item>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  if (prevProps.location.search !== nextProps.location.search) return false;

  return ['id', 'amount', 'amountFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default withRouter(React.memo(CardListItem, areEqual));
