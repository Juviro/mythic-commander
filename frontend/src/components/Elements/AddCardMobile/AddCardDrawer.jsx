import React from 'react';
import { Drawer } from 'antd';

import { SearchField } from '..';

export default ({ isVisible, onClose, onAddCard }) => {
  const searchInputRef = React.createRef();

  const afterVisibleChange = visible => {
    if (!visible) return;
    searchInputRef.current.focus();
  };

  return (
    <Drawer
      height={100}
      placement="bottom"
      title="Add Cards"
      visible={isVisible}
      onClose={onClose}
      bodyStyle={{ padding: 4 }}
      afterVisibleChange={afterVisibleChange}
    >
      <SearchField
        alignTop
        resetSearch
        width="100%"
        ref={searchInputRef}
        onSearch={onAddCard}
        defaultActiveFirstOption
      />
    </Drawer>
  );
};
