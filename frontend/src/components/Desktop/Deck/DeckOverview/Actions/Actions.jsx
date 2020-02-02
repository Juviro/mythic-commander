import React from 'react';
import styled from 'styled-components';
import { Dropdown, Icon } from 'antd';

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
        <Icon type="ellipsis" />
      </Dropdown>
    </StyledActions>
  );
};
