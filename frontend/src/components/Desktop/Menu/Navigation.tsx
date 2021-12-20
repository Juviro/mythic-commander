import React, { useContext } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import { primary } from 'constants/colors';

const StyledMenu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0 0 0 12px;
`;

const StyledMenuItem = styled.li<{ active: boolean }>`
  padding: 11px 24px;
  font-size: 16px;
  color: hsla(0, 0%, 100%, 0.65);
  transition: background-color 0.3s;
  white-space: nowrap;

  @media (min-width: 1400px) {
    padding: 11px 48px;
  }

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

  &:hover {
    color: inherit;
  }
`;

const Navigation = ({ location: { pathname } }: RouteComponentProps) => {
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
        <StyledLink to={href} key={href}>
          <StyledMenuItem active={active}>{title}</StyledMenuItem>
        </StyledLink>
      ))}
    </StyledMenu>
  );
};

export default withRouter(Navigation);
