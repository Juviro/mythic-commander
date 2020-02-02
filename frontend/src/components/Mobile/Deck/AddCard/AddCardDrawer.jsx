import React from 'react';
import { Drawer } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import SearchField from '../../../Elements/SearchField';
import { addCardsToDeck } from '../../../../queries/deck';

export default ({ isVisible, onClose }) => {
  const { id: deckId } = useParams();
  const [mutate] = useMutation(addCardsToDeck);
  const searchInputRef = React.createRef();

  const afterVisibleChange = visible => {
    if (!visible) return;
    searchInputRef.current.focus();
  };

  const onAddCard = card => {
    mutate({
      variables: { cards: [card], deckId },
    });
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
