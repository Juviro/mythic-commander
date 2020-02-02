import React, { useState } from 'react';
import styled from 'styled-components';

import Drawer from './Drawer/Drawer';
import SearchBar from './SearchBar';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Menu = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <StyledWrapper>
      <SearchBar onToggleDrawer={onToggleDrawer} />
      <Drawer
        isVisible={isDrawerOpen}
        onCloseDrawer={() => setIsDrawerOpen(false)}
      />
      {children}
    </StyledWrapper>
  );
};

export default Menu;
