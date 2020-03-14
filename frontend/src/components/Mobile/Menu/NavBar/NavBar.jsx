import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';

const StyledMenu = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  z-index: 99;
  position: fixed;
  background-color: white;

  ${({ transparent }) =>
    transparent
      ? `
          background-color: transparent;
        `
      : `
          box-shadow: 0px 1px 8px #dedede;
      `}
`;

const StyledInvisibleWrapper = styled.div`
  height: 50px;
  width: 100%;
  background-color: transparent;
`;

const isCardsUrl = pathname => Boolean(pathname.match(/^\/m\/cards\/[\w-/]+$/));

const getSearchBarProps = (pathname = '', previousUrl) => {
  if (pathname.match(/^\/m\/decks\/[0-9]+$/))
    return { goBackUrl: '/m/decks', transparentSearchBar: true };
  if (isCardsUrl(pathname)) {
    return { goBackUrl: previousUrl || '/m/cards' };
  }

  return {};
};

const Menu = ({ onToggleDrawer, location: { pathname, search }, history }) => {
  const [previousUrl, setPreviousUrl] = useState('');

  const { goBackUrl, transparentSearchBar } = getSearchBarProps(
    pathname,
    previousUrl
  );

  useEffect(() => {
    if (!isCardsUrl(pathname)) {
      setPreviousUrl(pathname + search);
    }
  }, [pathname, search]);

  const onClickIcon = () => {
    if (goBackUrl) history.push(goBackUrl);
    else onToggleDrawer();
  };

  const iconStyle = transparentSearchBar
    ? { color: '#fff', filter: 'drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7))' }
    : {};

  iconStyle.padding = '10px 15px 10px 10px';

  return (
    <>
      <StyledMenu transparent={transparentSearchBar}>
        {goBackUrl ? (
          <ArrowLeftOutlined onClick={onClickIcon} style={iconStyle} />
        ) : (
          <MenuOutlined onClick={onClickIcon} style={iconStyle} />
        )}
        <SearchBar transparentSearchBar={transparentSearchBar} />
      </StyledMenu>
      {!transparentSearchBar && <StyledInvisibleWrapper />}
    </>
  );
};

export default withRouter(Menu);
