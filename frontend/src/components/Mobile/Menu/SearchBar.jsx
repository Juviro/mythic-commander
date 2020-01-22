import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import { withRouter } from 'react-router';

const StyledMenu = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;

  ${({ transparent }) =>
    transparent
      ? `
            z-index: 99;
            position: fixed;
            background-color: transparent;
            `
      : `
            box-shadow: 0px 1px 8px #dedede;
      `}
`;

const StyledIcon = styled(Icon)`
  padding: 10px 15px 10px 10px;
`;

const getSearchBarProps = (pathname = '') => {
  if (pathname.match(/^\/m\/deck\/[0-9]+$/)) return { previousUrl: '/m/decks', transparentSearchBar: true };

  return {};
};

const Menu = ({ onToggleDrawer, location: { pathname }, history }) => {
  const { previousUrl, transparentSearchBar } = getSearchBarProps(pathname);

  const onClickIcon = () => {
    if (previousUrl) history.push(previousUrl);
    else onToggleDrawer();
  };

  return (
    <StyledMenu transparent={transparentSearchBar}>
      <StyledIcon
        onClick={onClickIcon}
        type={previousUrl ? 'arrow-left' : 'menu'}
        style={{ color: transparentSearchBar ? '#fff' : undefined }}
      />
      <Input.Search placeholder="Search for something" className={transparentSearchBar && 'transparent'} />
    </StyledMenu>
  );
};

export default withRouter(Menu);
