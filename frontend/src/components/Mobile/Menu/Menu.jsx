import React, { useState } from 'react';

import Drawer from './Drawer/Drawer';
import NavBar from './NavBar';

const Menu = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <NavBar onToggleDrawer={onToggleDrawer} />
      <Drawer
        isVisible={isDrawerOpen}
        onCloseDrawer={() => setIsDrawerOpen(false)}
      />
      {children}
    </>
  );
};

export default Menu;
