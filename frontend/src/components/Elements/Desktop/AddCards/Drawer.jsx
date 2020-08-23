import React from 'react';
import { Drawer } from 'antd';
import AddCards from './AddCards';

export default ({ isVisible, setIsVisible, onAddCards }) => {
  const searchInputRef = React.createRef();

  const afterVisibleChange = (visible) => {
    if (!visible) return;
    searchInputRef.current.focus();
  };

  return (
    <Drawer
      width={300}
      mask={false}
      placement="left"
      title="Add Cards"
      visible={isVisible}
      maskClosable={false}
      onClose={() => setIsVisible(false)}
      afterVisibleChange={afterVisibleChange}
    >
      <AddCards onAddCards={onAddCards} searchInputRef={searchInputRef} />
    </Drawer>
  );
};
