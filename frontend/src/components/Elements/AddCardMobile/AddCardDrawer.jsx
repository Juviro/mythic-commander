import React from 'react';
import { Drawer } from 'antd';

import { useQuery } from 'react-apollo';
import SearchField from '../SearchField';
import { getCollectionNames } from '../../../queries';

export default ({ containedCardNames, isVisible, onClose, onAddCard }) => {
  const searchInputRef = React.createRef();
  const { data } = useQuery(getCollectionNames);

  const afterVisibleChange = visible => {
    if (!visible) return;
    searchInputRef.current.focus();
  };

  const ownedCardNames = data
    ? data.collection.cards.map(({ name }) => name)
    : [];

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
        ownedCardNames={ownedCardNames}
        ref={searchInputRef}
        onSearch={onAddCard}
        containedCardNames={containedCardNames}
        defaultActiveFirstOption
      />
    </Drawer>
  );
};
