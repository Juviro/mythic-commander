import React, { useContext } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import { primary } from 'constants/colors';

const StyledMenu = styled.ul`
  height: 48px;
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0 0 0 12px;
`;

const StyledMenuItem = styled.li<{ active: boolean }>`
  font-size: 16px;
  height: 100%;
  display: flex;
  color: hsla(0, 0%, 100%, 0.65);
  transition: background-color 0.3s;
  white-space: nowrap;

  ${({ active }) =>
    active &&
    css`
      color: white;
      background-color: ${primary};
    `}

  &:hover {
    color: white;
    background-color: ${primary};
  }
`;

const StyledLink = styled(Link)`
  color: inherit;

  padding: 11px 24px;

  @media (min-width: 1400px) {
    padding: 11px 48px;
  }

  &:hover {
    color: inherit;
  }
`;

const Navigation = ({ location: { pathname } }: RouteComponentProps) => {
  const { user, loading } = useContext(UserContext);

  const menuItems = [
    {
      title: 'Decks',
      href: '/my-decks',
      additionalPaths: ['/decks'],
      hidden: !user && !loading,
    },
    {
      title: 'Wants',
      href: '/my-wants',
      additionalPaths: ['/wants'],
      hidden: !user && !loading,
    },
    {
      title: 'Collection',
      href: '/collection',
      hidden: !user && !loading,
    },
    {
      title: 'Advanced Search',
      href: '/search',
    },
  ]
    .filter(({ hidden }) => !hidden)
    .map((item) => ({
      ...item,
      active: [item.href, ...(item.additionalPaths ?? [])].some((path) =>
        pathname.includes(path)
      ),
    }));

  return (
    <StyledMenu>
      {menuItems.map(({ title, href, active }) => (
        <StyledMenuItem active={active} key={href}>
          <StyledLink to={href}>{title}</StyledLink>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
};

export default withRouter(Navigation);
