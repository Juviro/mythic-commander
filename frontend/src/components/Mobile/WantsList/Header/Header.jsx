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
  margin-bottom: 16px;
  justify-content: space-between;
`;

export default ({ wantsList, canEdit }) => {
  return (
    <>
      <StyledTitleWrapper>
        <WantsListTitle wantsList={wantsList} canEdit={canEdit} />
        {wantsList && <Menu wantsList={wantsList} canEdit={canEdit} />}
      </StyledTitleWrapper>
      <Row>
        <Col span={12}>
          <WantsListStats wantsList={wantsList} />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <WantsListDeckLink wantsList={wantsList} canEdit={canEdit} />
        </Col>
      </Row>
    </>
  );
};
