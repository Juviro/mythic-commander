import React from 'react';
import { useMutation } from 'react-apollo';

import { CardListWithActions } from '../../Elements/Desktop';
import message from '../../../utils/message';
import { deleteFromWantsListDesktop } from './queries';

export default ({ cards, loading, widthOffset, wantsList }) => {
  const [mutateDelete] = useMutation(deleteFromWantsListDesktop);

  const deleteByOracle = (oracleIds, numberOfCards) => {
    const cardsLabel = numberOfCards > 1 ? 'cards' : 'card';
    message(
      `Deleted <b>${numberOfCards}</b> ${cardsLabel} from ${wantsList.name}!`
    );
    mutateDelete({
      variables: { oracleIds, wantsListId: wantsList.id },
    });
  };

  const title = wantsList && `${wantsList.name} - Wants`;

  return (
    <CardListWithActions
      deleteByOracle={deleteByOracle}
      loading={loading}
      cards={cards}
      title={title}
      widthOffset={widthOffset}
    />
  );
};
