import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { MythicCommanderBanner, Flex } from '../../Elements/Shared';
import { darkBackground } from '../../../constants/colors';
import UserMenu from './UserMenu';

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBackground};
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
      <Flex direction="row" align="center">
        <MythicCommanderBanner style={{ marginLeft: 8 }} />
        <Menu
          mode="horizontal"
          selectedKeys={pathname}
          theme="dark"
          style={{ marginLeft: 24 }}
        >
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
      </Flex>
      <UserMenu />
    </StyledMenu>
  );
};

export default withRouter(DesktopMenu);
