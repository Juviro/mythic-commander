import React from 'react';
import { Button, message } from 'antd';
import { useMutation } from 'react-apollo';

import { withRouter } from 'react-router';
import { useToggle } from '../../../../Hooks';
import { ConfirmDelete } from '../../../../Elements/Shared';
import boldText from '../../../../../utils/boldText';
import { deleteWantsListDesktop } from '../../queries';
import { wantsListsDesktop } from '../../../WantsLists/queries';

const DeleteList = ({ wantsList: { id: wantsListId, name }, history }) => {
  const [isDeleting, toggleisDeleting] = useToggle();
  const [mutate] = useMutation(deleteWantsListDesktop);

  const onDeleteList = () => {
    toggleisDeleting(false);
    mutate({
      variables: {
        wantsListId,
      },
      //   refetchQueries: [
      //     {
      //       query: wantsListsForDeckMobile,
      //       variables: { deckId },
      //     },
      //   ],
      update: cache => {
        const existing = cache.readQuery({
          query: wantsListsDesktop,
        });
        if (!existing) return;

        const newWantsLists = existing.wantsLists.filter(
          ({ id }) => id !== wantsListId
        );

        cache.writeQuery({
          query: wantsListsDesktop,
          data: { wantsLists: newWantsLists },
        });
        message.success('Deleted wants list!');
      },
    });
    history.replace('/wants');
  };

  const text = boldText(
    `Are you sure you want to delete <b>${name}</b>? This cannot be undone!`
  );

  return (
    <>
      <Button type="link" danger onClick={toggleisDeleting}>
        Delete
      </Button>
      {isDeleting && (
        <ConfirmDelete
          onCancel={toggleisDeleting}
          onOk={onDeleteList}
          text={text}
        />
      )}
    </>
  );
};

export default withRouter(DeleteList);
