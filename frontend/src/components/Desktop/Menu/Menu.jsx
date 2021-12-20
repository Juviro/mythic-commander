import React from 'react';
import styled from 'styled-components';
import MythicCommanderBanner from 'components/Elements/Shared/MythicCommanderBanner';
import Flex from 'components/Elements/Shared/Flex';
import SearchBar from 'components/Elements/Shared/SearchBar';
import { darkBackground, darkBackgroundLight } from '../../../constants/colors';
import UserMenu from './UserMenu';
import Navigation from './Navigation';

const StyledMenu = styled.div`
  width: 100%;
  top: 0;
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(138deg, ${darkBackground} 0%, ${darkBackgroundLight} 100%);
  background-color: ${darkBackgroundLight};

  & .ant-menu-overflowed-submenu {
    background: transparent;
  }
  & .ant-menu {
    background: transparent;
  }
`;

const Menu = () => {
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
          <Navigation />
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

export default Menu;
