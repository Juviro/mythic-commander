import React from 'react';
import { Menu, Icon } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';

import { editDeckCard } from '../../../../../queries';

export default ({ card, setIsVisible, ...rest }) => {
  const { owned } = card;
  const { id: deckId } = useParams();

  const [mutation] = useMutation(editDeckCard);
  const onToggleOwned = () => {
    setIsVisible(false);
    mutation({
      variables: {
        deckId,
        cardOracleId: card.oracle_id,
        newProps: { owned: !owned },
      },
    });
  };

  return (
    <Menu.Item {...rest} key="changeZone" onClick={onToggleOwned}>
      <Icon type={owned ? 'minus' : 'plus'} />
      <span>{owned ? 'Remove from Collection' : 'Add to Collection'}</span>
    </Menu.Item>
  );
};
