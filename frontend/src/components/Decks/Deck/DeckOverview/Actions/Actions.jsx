import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Icon } from 'antd';

import ActionDelete from './ActionDelete';
import ActionChangeSet from './ActionChangeSet';
import ActionChangeZone from './ActionChangeZone';
import ActionAddOrRemoveFromCollection from './ActionAddOrRemoveFromCollection';

const StyledActions = styled.div`
  padding-left: 20px;
`;

export default ({ card }) => {
  const [isVisible, setIsVisible] = useState(false);

  const menu = (
    <Menu>
      <ActionAddOrRemoveFromCollection card={card} setIsVisible={setIsVisible} />
      <ActionChangeSet card={card} setIsVisible={setIsVisible} />
      <ActionChangeZone card={card} setIsVisible={setIsVisible} />
      <Menu.Divider />
      <ActionDelete card={card} setIsVisible={setIsVisible} />
    </Menu>
  );

  return (
    <StyledActions>
      <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
        <Icon type="ellipsis" />
      </Dropdown>
    </StyledActions>
  );
};
