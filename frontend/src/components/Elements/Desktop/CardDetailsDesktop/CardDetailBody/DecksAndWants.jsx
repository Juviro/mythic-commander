import React from 'react';
import styled from 'styled-components';
import { Col, Divider, Row } from 'antd';

import { IncludedDecks, IncludedWants } from '../../../Shared';

const StyledBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  overflow: auto;
  margin-bottom: 16px;
`;

export default ({ card }) => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={12}>
        <Divider>Your Decks</Divider>
        <StyledBottomWrapper>
          <IncludedDecks card={card} large />
        </StyledBottomWrapper>
      </Col>
      <Col span={12}>
        <Divider>Your Wants Lists</Divider>
        <StyledBottomWrapper>
          <IncludedWants card={card} large cardId={card.id} />
        </StyledBottomWrapper>
      </Col>
    </Row>
  );
};
