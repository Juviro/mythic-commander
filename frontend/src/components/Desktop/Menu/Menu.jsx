import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { UserAvatar } from '../../Elements';

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;

const AvatarWrapper = styled.div`
  margin-right: 16px;
`;

const MENU_ENTRIES = [
  {
    title: 'Search',
    href: '/search',
  },
  {
    title: 'Collection',
    href: '/collection',
  },
  {
    title: 'Decks',
    href: '/decks',
  },
];

const DesktopMenu = ({ location: { pathname } }) => {
  return (
    <StyledMenu>
      <Menu mode="horizontal" selectedKeys={pathname}>
        {MENU_ENTRIES.map(({ title, href }) => (
          <Menu.Item key={href}>
            <Link to={href}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <AvatarWrapper>
        <UserAvatar />
      </AvatarWrapper>
    </StyledMenu>
  );
};

export default withRouter(DesktopMenu);
