import React from 'react';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';

import { unlinkWantsListDesktop } from './queries';
import message from '../../../../../utils/message';

export default ({ id: wantsListId }) => {
  const [mutate] = useMutation(unlinkWantsListDesktop);

  const onUnlink = async () => {
    mutate({
      variables: { wantsListId },
      // refetchQueries: [
      //   {
      //     query: wantsListsForDeckMobile,
      //     variables: { deckId },
      //   },
      // ],
      optimisticResponse: () => ({
        __typename: 'Mutation',
        unlinkWantsList: {
          id: wantsListId,
          deck: null,
          __typename: 'WantsList',
        },
      }),
    });
    message('Unlinked Deck');
  };

  return (
    <Button type="link" onClick={onUnlink}>
      Unlink Deck
    </Button>
  );
};
