import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { UserAvatar, MythicCommanderBanner } from '../../Elements/Shared';
import { darkBackground } from '../../../constants/colors';

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  background-color: ${darkBackground};
`;

const AvatarWrapper = styled.div`
  margin-right: 16px;
`;

const MENU_ENTRIES = [
  // {
  //   title: 'Decks',
  //   href: '/decks',
  // },
  // {
  //   title: 'Wants',
  //   href: '/wants',
  // },
  {
    title: 'Collection',
    href: '/collection',
  },
  {
    title: 'Advanced Search',
    href: '/search',
  },
];

const DesktopMenu = ({ location: { pathname } }) => {
  return (
    <StyledMenu>
      <MythicCommanderBanner />
      <Menu mode="horizontal" selectedKeys={pathname} theme="dark">
        {MENU_ENTRIES.map(({ title, href }) => (
          <Menu.Item
            key={href}
            style={{
              padding: '0 64px',
            }}
          >
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
