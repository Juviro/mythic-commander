import React from 'react';
import styled from 'styled-components';

import { Row, Col, Typography } from 'antd';
import Flex from '../Flex';
import FlippableCard from '../FlippableCard';
import SetPicker from '../SetPicker';
import AmountInput from '../AmountInput';

const StyledImageWrapper = styled.div`
  height: 400px;
  width: 290px;
`;

export default ({ card, onChangeProp, canSubmit, onSubmit }) => {
  return (
    <Row>
      <Col span={12}>
        <StyledImageWrapper>
          <FlippableCard card={card} />
        </StyledImageWrapper>
      </Col>
      <Col span={12}>
        <Flex
          align="center"
          justify="space-between"
          direction="column"
          style={{ height: '50%' }}
        >
          <Typography.Text
            style={{ width: '100%', fontSize: 20 }}
          >{`Edit ${card.name}`}</Typography.Text>
          <AmountInput
            canSubmit={canSubmit}
            card={card}
            onSubmit={onSubmit}
            onChange={onChangeProp('amount')}
          />
          <SetPicker size="default" card={card} onSelect={onChangeProp('id')} />
        </Flex>
      </Col>
    </Row>
  );
};
