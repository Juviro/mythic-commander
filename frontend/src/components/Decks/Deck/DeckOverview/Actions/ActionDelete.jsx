import React from 'react';
import { Menu, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { deleteFromDeck } from '../../../../../queries';

export default ({ card, setIsVisible, ...rest }) => {
  const { id: deckId } = useParams();
  const [onDelete] = useMutation(deleteFromDeck);
  const onClick = () => {
    setIsVisible(false);
    onDelete({ variables: { cardId: card.id, deckId } });
  };

  return (
    <Menu.Item {...rest} key="delete" onClick={onClick}>
      <Icon type="delete" />
      <span>Delete from Deck</span>
    </Menu.Item>
  );
};
