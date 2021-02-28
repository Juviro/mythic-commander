import React, { useContext } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import UserContext from 'components/Provider/UserProvider';
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

const DesktopMenu = ({ location: { pathname } }) => {
  const { user } = useContext(UserContext);
  const menuItems = [
    {
      title: 'Decks',
      href: '/my-decks',
      hidden: !user,
    },
    {
      title: 'Wants',
      href: '/my-wants',
      hidden: !user,
    },
    {
      title: 'Collection',
      href: '/collection',
      hidden: !user,
    },
    {
      title: 'Advanced Search',
      href: '/search',
    },
  ].filter(({ hidden }) => !hidden);

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
          {menuItems.map(({ title, href }) => (
            <Menu.Item
              key={href}
              style={{ padding: '0 3vw', fontSize: 16, fontWeight: 400 }}
            >
              <Link to={href}>{title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Flex>
      <Flex direction="row">
        <SearchBar hideLayover style={{ margin: '0 16px', width: 330 }} />
        <UserMenu />
      </Flex>
    </StyledMenu>
  );
};

export default withRouter(DesktopMenu);
