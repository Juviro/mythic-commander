import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { MythicCommanderBanner, Flex, SearchBar } from '../../Elements/Shared';
import { darkBackground } from '../../../constants/colors';
import UserMenu from './UserMenu';

const StyledMenu = styled.div`
  width: 100%;
  top: 0;
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBackground};
`;

const MENU_ENTRIES = [
  {
    title: 'Decks',
    href: '/decks',
  },
  {
    title: 'Wants',
    href: '/wants',
  },
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
        <MythicCommanderBanner
          style={{ marginLeft: 8 }}
          showCollectionOnClick
          hideWhenSmall
        />
        <Menu
          mode="horizontal"
          selectedKeys={pathname}
          theme="dark"
          style={{ marginLeft: 12 }}
        >
          {MENU_ENTRIES.map(({ title, href }) => (
            <Menu.Item
              key={href}
              style={{ padding: '0 3vw', fontSize: 16, fontWeight: 400 }}
            >
              <Link to={href}>{title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Flex>
      <SearchBar hideLayover style={{ margin: '0 8px', width: 330 }} />
      <UserMenu />
    </StyledMenu>
  );
};

export default withRouter(DesktopMenu);
