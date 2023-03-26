import React from 'react';
import { Row, Col, Divider } from 'antd';

import styled from 'styled-components';
import CardLegal from 'components/Elements/Shared/CardLegal';
import CardRules from 'components/Elements/Shared/CardRules';
import CardLinks from 'components/Elements/Shared/CardLinks';
import Flex from 'components/Elements/Shared/Flex';
import RelatedCards from './RelatedCards';
import OracleText from '../../../Shared/OracleText/OracleText';

const StyledColumn = styled(Col)`
  padding: 8px;
`;

export default ({ card, loading, isFlipped }) => {
  return (
    <Row style={{ width: '100%' }}>
      <StyledColumn span={9}>
        <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
          <span>
            <Divider>Oracle Text & Rules</Divider>
            <OracleText card={card} loading={loading} isFlipped={isFlipped} />
          </span>
          <Flex align="center" justify="space-between" style={{ height: 32 }}>
            <CardRules card={card} loading={loading} />
            <CardLegal card={card} loading={loading} />
          </Flex>
        </Flex>
      </StyledColumn>
      <StyledColumn
        span={10}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Divider>Related Cards</Divider>
        <RelatedCards card={card} loading={loading} />
      </StyledColumn>
      <StyledColumn span={5}>
        <Divider>Resources</Divider>
        <CardLinks card={card} loading={loading} />
      </StyledColumn>
    </Row>
  );
};
