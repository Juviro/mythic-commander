import React, { useContext } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import { defaultText, lightWhite, primary } from 'constants/colors';
import { Menu } from 'antd';

const StyledMenu = styled(Menu)`
  height: 48px;
  border-bottom: none;
  font-size: 16px;
  margin-left: 12px;

  .ant-menu-item,
  .ant-menu-submenu {
    top: 0;
    display: flex;
    align-items: center;
    padding: 0 !important;

    &:after {
      display: none;
    }
  }

  .ant-menu-item-selected,
  .ant-menu-item-active,
  .ant-menu-submenu-selected,
  .ant-menu-submenu-active {
    background-color: ${primary} !important;
  }
`;

const StyledLink = styled(Link)`
  color: ${lightWhite} !important;

  @media (min-width: 1200px) {
    padding: 20px 48px;
  }

  .ant-menu-item-selected &,
  .ant-menu-submenu-selected & {
    color: #fff !important;
  }

  .ant-menu-sub & {
    padding: 0;
    color: ${defaultText} !important;

    &:hover {
      color: ${primary} !important;
    }
  }
`;

const Navigation = ({ location: { pathname } }: RouteComponentProps) => {
  const { user, loading } = useContext(UserContext);

  const selectedKeys = [];

  const menuItems = [
    {
      label: 'Decks',
      key: 'decks',
      href: '/my-decks',
      additionalPaths: ['/decks'],
      hidden: !user && !loading,
      children: [
        {
          label: 'Token finder',
          key: 'token-finder',
          href: '/proxy?type=tokens',
        },
      ],
    },
    {
      label: 'Wants',
      key: 'wants',
      href: '/my-wants',
      additionalPaths: ['/wants'],
      hidden: !user && !loading,
    },
    {
      label: 'Collection',
      key: 'collection',
      href: '/collection',
      hidden: !user && !loading,
      children: [
        {
          label: 'Set Completion',
          key: 'by-set',
          href: '/collection/by-set',
        },
      ],
    },
    {
      label: 'Advanced Search',
      key: 'search',
      href: '/search',
    },
  ]
    .filter(({ hidden }) => !hidden)
    .map(({ label, href, additionalPaths, ...item }) => {
      const active = [href, ...(additionalPaths ?? [])].some((path) =>
        pathname.includes(path)
      );

      if (active) {
        selectedKeys.push(item.key);
      }

      return {
        ...item,
        label: <StyledLink to={href}>{label}</StyledLink>,
        children: item.children?.map((child) => ({
          ...child,
          label: <StyledLink to={child.href}>{child.label}</StyledLink>,
        })),
      };
    });

  return <StyledMenu mode="horizontal" items={menuItems} selectedKeys={selectedKeys} />;
};

export default withRouter(Navigation);
