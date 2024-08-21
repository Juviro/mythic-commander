import React, { useContext } from 'react';
import { Badge, Dropdown } from 'antd';
import styled from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import UserAvatar from 'components/Elements/Shared/UserAvatar';
import Logout from 'components/Elements/Shared/Logout';
import { LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useToggle } from '../../Hooks';

const StyledAvatarWrapper = styled.div`
  margin-right: 8px;

  @media only screen and (max-width: 1200px) {
    min-width: unset;
  }
`;

export default () => {
  const [isOpen, toggleIsOpen] = useToggle();
  const { user, loading } = useContext(UserContext);
  const { push } = useHistory();

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
        label: <Logout hideIcon />,
        icon: <LogoutOutlined />,
      },
      {
        key: 'friends',
        label: 'Friends',
        icon: user.openFriendRequests ? (
          <Badge count={user.openFriendRequests} size="small" />
        ) : (
          <UsergroupAddOutlined />
        ),
        onClick: () => push('/friends'),
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
