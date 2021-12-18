import React, { useContext } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import UserContext from 'components/Provider/UserProvider';
import MythicCommanderBanner from 'components/Elements/Shared/MythicCommanderBanner';
import Flex from 'components/Elements/Shared/Flex';
import SearchBar from 'components/Elements/Shared/SearchBar';
import { darkBackground, darkBackgroundSemiTransparent } from '../../../constants/colors';
import UserMenu from './UserMenu';

const StyledMenu = styled.div`
  width: 100%;
  top: 0;
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    138deg,
    ${darkBackground} 0%,
    ${darkBackgroundSemiTransparent} 100%
  );

  & .ant-menu-overflowed-submenu {
    background: transparent;
  }
  & .ant-menu {
    background: transparent;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  && {
    font-size: 16px;
    font-weight: 400;

    @media (min-width: 1600px) {
      width: 200px;
      text-align: center;
    }
  }
`;

const DesktopMenu = ({ location: { pathname } }) => {
  const { user } = useContext(UserContext);
  const menuItems = [
    {
      title: 'Decks',
      href: '/my-decks',
      additionalPaths: ['/decks'],
      hidden: !user,
    },
    {
      title: 'Wants',
      href: '/my-wants',
      additionalPaths: ['/wants'],
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

  const selectedMenuKeys = menuItems
    .filter(({ href, additionalPaths = [] }) => {
      return [href, ...additionalPaths].some((path) => pathname.includes(path));
    })
    .map(({ href }) => href);

  return (
    <StyledMenu>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Flex direction="row" align="center">
          <MythicCommanderBanner
            style={{ marginLeft: 8 }}
            showCollectionOnClick
            hideWhenSmall
          />
          <Menu
            mode="horizontal"
            selectedKeys={selectedMenuKeys}
            theme="dark"
            style={{ marginLeft: 12 }}
            color={darkBackground}
          >
            {menuItems.map(({ title, href }) => (
              <StyledMenuItem key={href}>
                <Link to={href}>{title}</Link>
              </StyledMenuItem>
            ))}
          </Menu>
        </Flex>
        <SearchBar
          hideLayover
          style={{ margin: '0 16px', width: '100%', maxWidth: 330 }}
        />
        <UserMenu />
      </Flex>
    </StyledMenu>
  );
};

export default withRouter(DesktopMenu);
