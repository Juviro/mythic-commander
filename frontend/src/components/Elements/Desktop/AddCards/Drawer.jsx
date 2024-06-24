import React from 'react';
import { Drawer } from 'antd';
import AddCards from './AddCards';

export default ({ isVisible, setIsVisible, onAddCards }) => {
  return (
    <Drawer
      width={300}
      mask={false}
      placement="left"
      title="Add Cards"
      open={isVisible}
      maskClosable={false}
      onClose={() => setIsVisible(false)}
    >
      <AddCards onAddCards={onAddCards} autoFocus />
    </Drawer>
  );
};
