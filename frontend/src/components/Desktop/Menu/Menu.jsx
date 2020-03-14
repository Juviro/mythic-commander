import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  SearchOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { UserAvatar } from '../../Elements';

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

const AvatarWrapper = styled.div`
  margin-right: 16px;
`;

const MENU_ENTRIES = [
  {
    title: 'Search',
    href: '/search',
    icon: <SearchOutlined />,
  },
  {
    title: 'Collection',
    href: '/collection',
    icon: <TableOutlined />,
  },
  {
    title: 'Decks',
    href: '/decks',
    icon: <AppstoreOutlined />,
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
                  {icon}
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <AvatarWrapper>
            <UserAvatar />
          </AvatarWrapper>
        </StyledMenu>
        {children}
      </StyledApp>
    );
  }
}
