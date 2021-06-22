import React from 'react';
import styled from 'styled-components';
import { Col, Divider, Row } from 'antd';

import IncludedDecks from 'components/Elements/Shared/IncludedDecks';
import IncludedWants from 'components/Elements/Shared/IncludedWants';

const StyledBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  overflow: auto;
  margin-bottom: 16px;
`;

export default ({ card, loading }) => {
  return (
    <Row style={{ width: '100%', minHeight: 240 }}>
      <Col span={12}>
        <Divider>Your Decks</Divider>
        <StyledBottomWrapper>
          <IncludedDecks card={card} large loading={loading} />
        </StyledBottomWrapper>
      </Col>
      <Col span={12}>
        <Divider>Your Wants Lists</Divider>
        <StyledBottomWrapper>
          <IncludedWants card={card} large cardId={card.id} loading={loading} />
        </StyledBottomWrapper>
      </Col>
    </Row>
  );
};
