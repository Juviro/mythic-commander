import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'antd';

import { EllipsisOutlined } from '@ant-design/icons';
import ActionsMenu from './ActionsMenu';

const StyledActions = styled.div`
  padding-left: 20px;
`;

export default ({ card }) => {
  return (
    <StyledActions>
      <Dropdown
        overlay={<ActionsMenu card={card} />}
        placement="bottomLeft"
        trigger={['click']}
      >
        <EllipsisOutlined />
      </Dropdown>
    </StyledActions>
  );
};
