import React from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';

import { DisconnectOutlined } from '@ant-design/icons';
import { unlinkWantsListDesktop } from './queries';
import message from '../../../../utils/message';

export default ({ id: wantsListId }) => {
  const [mutate] = useMutation(unlinkWantsListDesktop);

  const onUnlink = async () => {
    mutate({
      variables: { wantsListId },
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
    <Button type="link" onClick={onUnlink} icon={<DisconnectOutlined />}>
      Unlink Deck
    </Button>
  );
};
