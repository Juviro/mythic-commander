import React, { useContext } from 'react';
import { Dropdown } from 'antd';
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

  const menu = {
    items: [
      {
        key: 'logout',
        label: <Logout />,
      },
    ],
  };

  return (
    <Dropdown
      menu={menu}
      open={isOpen}
      onOpenChange={toggleIsOpen}
      trigger="click"
      style={{ width: 30 }}
    >
      {avatarComponent}
    </Dropdown>
  );
};
