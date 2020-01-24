import React from 'react';
import { List } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { duplicateDeck } from '../../../../../queries';

const DuplicateDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [duplicateDeckMutation] = useMutation(duplicateDeck);

  const onDuplicateDeck = async () => {
    const {
      data: { duplicateDeck: id },
    } = await duplicateDeckMutation({
      variables: {
        deckId,
      },
    });
    history.push(`/deck/${id}`);
  };
  return (
    <List.Item onClick={onDuplicateDeck} style={{ color: '#1890ff', padding: 16 }}>
      Duplicate Deck
    </List.Item>
  );
};

export default withRouter(DuplicateDeck);
