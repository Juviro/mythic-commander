import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import Menu from './Menu';
import {
  WantsListDeckLink,
  WantsListTitle,
  WantsListStats,
} from '../../../Elements/Shared';

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  font-size: 26px;
  justify-content: space-between;
`;

export default ({ wantsList }) => {
  return (
    <>
      <StyledTitleWrapper>
        <WantsListTitle wantsList={wantsList} />
        {wantsList && <Menu wantsList={wantsList} />}
      </StyledTitleWrapper>
      <Row>
        <Col span={12}>
          <WantsListStats wantsList={wantsList} />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <WantsListDeckLink wantsList={wantsList} />
        </Col>
      </Row>
    </>
  );
};
