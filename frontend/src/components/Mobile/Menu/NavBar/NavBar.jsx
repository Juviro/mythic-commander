import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';

import SearchBar from './SearchBar';
import { darkBackground } from '../../../../constants/colors';

const StyledMenu = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  z-index: 1001;
  position: fixed;
  background-color: ${darkBackground};

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

const isCardView = pathname =>
  Boolean(
    pathname.match(
      /^\/m\/(search|collection|cards|wants|decks\/\d+)+\/[\w-/]+$/
    )
  );

const isTransparentSearchBar = (pathname = '') => {
  return Boolean(pathname.match(/^\/m\/decks\/[0-9]+$/));
};

const Menu = ({ onToggleDrawer, location: { pathname }, history }) => {
  const transparentSearchBar = isTransparentSearchBar(pathname);
  const canGoBack = isCardView(pathname);

  const onClickIcon = () => {
    if (canGoBack) {
      history.goBack();
    } else {
      onToggleDrawer();
    }
  };

  const iconStyle = transparentSearchBar
    ? { color: '#fff', filter: 'drop-shadow( 0px 0px 1px rgba(0, 0, 0, .7))' }
    : { color: 'white' };

  iconStyle.padding = '10px 15px 10px 10px';

  return (
    <>
      <StyledMenu transparent={transparentSearchBar}>
        {canGoBack ? (
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
