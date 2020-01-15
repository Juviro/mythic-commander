import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const OwnedWrapper = styled.div`
  margin-left: 20px;
`;

export default ({ owned }) => (
  <OwnedWrapper>
    {owned ? (
      <Icon type="check-circle" style={{ color: 'green' }} />
    ) : (
      <Icon type="close-circle" style={{ color: 'red' }} />
    )}
  </OwnedWrapper>
);
