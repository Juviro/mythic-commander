import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

import { withRouter } from 'react-router';
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

const StyledIcon = styled(Icon)`
  padding: 10px 15px 10px 10px;
`;

const getSearchBarProps = (pathname = '') => {
  if (pathname.match(/^\/m\/decks\/[0-9]+$/))
    return { previousUrl: '/m/decks', transparentSearchBar: true };

  return {};
};

const Menu = ({ onToggleDrawer, location: { pathname }, history }) => {
  const { previousUrl, transparentSearchBar } = getSearchBarProps(pathname);

  const onClickIcon = () => {
    if (previousUrl) history.push(previousUrl);
    else onToggleDrawer();
  };

  const iconStyle = transparentSearchBar
    ? { color: '#fff', filter: 'drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7))' }
    : {};

  return (
    <>
      <StyledMenu transparent={transparentSearchBar}>
        <StyledIcon
          onClick={onClickIcon}
          type={previousUrl ? 'arrow-left' : 'menu'}
          style={iconStyle}
        />
        <SearchBar transparentSearchBar={transparentSearchBar} />
      </StyledMenu>
      {!transparentSearchBar && <StyledInvisibleWrapper />}
    </>
  );
};

export default withRouter(Menu);
