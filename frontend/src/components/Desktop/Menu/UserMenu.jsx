import React from 'react';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';

import { useToggle } from '../../Hooks';
import { UserAvatar, Logout } from '../../Elements/Shared';

const StyledAvatarWrapper = styled.span`
  margin-right: 8px;
`;

export default () => {
  const [isOpen, toggleIsOpen] = useToggle();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Logout />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      visible={isOpen}
      onVisibleChange={toggleIsOpen}
      trigger="click"
      style={{ width: 30 }}
    >
      <StyledAvatarWrapper>
        <UserAvatar
          onClick={toggleIsOpen}
          textPosition="left"
          textColor="rgba(255, 255, 255, 0.9)"
        />
      </StyledAvatarWrapper>
    </Dropdown>
  );
};
