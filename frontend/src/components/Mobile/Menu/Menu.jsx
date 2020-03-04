import React, { useState } from 'react';

import Drawer from './Drawer';
import NavBar from './NavBar';

const Menu = () => {
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
    </>
  );
};

export default Menu;
