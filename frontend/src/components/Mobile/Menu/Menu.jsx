import React from 'react';

import Drawer from './Drawer';
import NavBar from './NavBar';
import { useToggle } from '../../Hooks';

const Menu = () => {
  const [isDrawerOpen, toggleIsDrawerOpen] = useToggle(false);

  const onToggleDrawer = () => {
    toggleIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <NavBar onToggleDrawer={onToggleDrawer} />
      <Drawer
        isVisible={isDrawerOpen}
        onCloseDrawer={() => toggleIsDrawerOpen(false)}
      />
    </>
  );
};

export default Menu;
