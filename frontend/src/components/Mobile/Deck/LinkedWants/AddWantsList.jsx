import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { withRouter } from 'react-router';
import { createLinkedWantsList, wantsListsForDeckMobile } from './queries';
import { useToggle } from '../../../Hooks';

const AddWantsList = ({ deckId, history }) => {
  const [isCreating, toggleIsCreating] = useToggle(false);
  const [mutate] = useMutation(createLinkedWantsList);

  const onCreateList = () => {
    toggleIsCreating(true);
    mutate({
      variables: { deckId },
      update: (cache, { data: { createWantsList } }) => {
        const existing = cache.readQuery({
          query: wantsListsForDeckMobile,
          variables: { deckId },
        });

        cache.writeQuery({
          query: wantsListsForDeckMobile,
          variables: { deckId },
          data: {
            wantsLists: [...existing.wantsLists, createWantsList],
          },
        });
        history.push(`/m/wants/${createWantsList.id}`);
      },
      refetchQueries: ['wantsListsMobile'],
    });
  };

  return (
    <Button
      icon={<PlusOutlined />}
      size="small"
      type="primary"
      loading={isCreating}
      onClick={onCreateList}
    >
      New wants list
    </Button>
  );
};

export default withRouter(AddWantsList);
