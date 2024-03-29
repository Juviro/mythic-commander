import React, { useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import UserAvatar from 'components/Elements/Shared/UserAvatar';
import Logout from 'components/Elements/Shared/Logout';
import { useToggle } from '../../Hooks';

const StyledAvatarWrapper = styled.div`
  margin-right: 8px;
  min-width: 60px;

  @media only screen and (max-width: 1200px) {
    min-width: unset;
  }
`;

export default () => {
  const [isOpen, toggleIsOpen] = useToggle();
  const { user, loading } = useContext(UserContext);

  if (loading) return <StyledAvatarWrapper />;

  const avatarComponent = (
    <StyledAvatarWrapper>
      <UserAvatar
        onClick={toggleIsOpen}
        textPosition="left"
        textColor="rgba(255, 255, 255, 0.9)"
      />
    </StyledAvatarWrapper>
  );

  if (!user) return avatarComponent;

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
      {avatarComponent}
    </Dropdown>
  );
};
