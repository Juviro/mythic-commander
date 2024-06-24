import React from 'react';
import { Button, message } from 'antd';
import { useMutation } from '@apollo/client';
import { RouteComponentProps, withRouter } from 'react-router';
import { DeleteOutlined } from '@ant-design/icons';

import { UnifiedWantsList } from 'types/unifiedTypes';
import { getDeckDesktop } from 'components/Desktop/Deck/queries';
import { useToggle } from '../../../Hooks';
import ConfirmDelete from '../../Shared/ConfirmDelete';
import boldText from '../../../../utils/boldText';
import { deleteWantsListDesktop } from '../../../Desktop/WantsList/queries';

interface Props extends RouteComponentProps {
  wantsList: UnifiedWantsList;
  onDelete?: () => void;
  history: any;
}

const DeleteList = ({
  wantsList: { id: wantsListId, name, deck },
  history,
  onDelete,
}: Props) => {
  const [isDeleting, toggleIsDeleting] = useToggle();
  const [mutate] = useMutation(deleteWantsListDesktop);

  const onDeleteList = async () => {
    toggleIsDeleting(false);
    const refetchQueries = deck?.id && [
      {
        query: getDeckDesktop,
        variables: { id: deck.id },
      },
    ];

    await mutate({
      variables: {
        wantsListId,
      },
      refetchQueries,
    });
    message.success('Deleted wants list!');
    if (onDelete) {
      onDelete();
    } else {
      history.replace('/my-wants');
    }
  };

  const text = boldText(
    `Are you sure you want to delete <b>${name}</b>? This cannot be undone.`
  );

  return (
    <>
      <Button type="link" danger onClick={toggleIsDeleting} icon={<DeleteOutlined />}>
        Delete
      </Button>
      {isDeleting && (
        <ConfirmDelete onCancel={toggleIsDeleting} onOk={onDeleteList} text={text} />
      )}
    </>
  );
};

export default withRouter(DeleteList);
