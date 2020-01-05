import React from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;

const MENU_ENTRIES = [
  {
    title: 'Search',
    href: '/search',
    icon: 'search',
  },
  {
    title: 'Collection',
    href: '/collection',
    icon: 'table',
  },
  {
    title: 'Decks',
    href: '/decks',
    icon: 'appstore',
  },
];

export default class MainMenu extends React.Component {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    if (pathname === '/login') return children;

    return (
      <StyledApp>
        <StyledMenu>
          <Menu mode="horizontal" selectedKeys={pathname}>
            {MENU_ENTRIES.map(({ title, href, icon }) => (
              <Menu.Item key={href}>
                <Link to={href}>
                  <Icon type={icon} />
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <UserAvatar />
        </StyledMenu>
        {children}
      </StyledApp>
    );
  }
}
