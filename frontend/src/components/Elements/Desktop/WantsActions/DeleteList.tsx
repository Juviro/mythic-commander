import React from 'react';
import { Button, message } from 'antd';
import { useMutation } from 'react-apollo';

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
}

const DeleteList = ({
  wantsList: { id: wantsListId, name, deck },
  history,
  onDelete,
}: Props) => {
  const [isDeleting, toggleisDeleting] = useToggle();
  const [mutate] = useMutation(deleteWantsListDesktop);

  const onDeleteList = async () => {
    toggleisDeleting(false);
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
      <Button type="link" danger onClick={toggleisDeleting} icon={<DeleteOutlined />}>
        Delete
      </Button>
      {isDeleting && (
        <ConfirmDelete onCancel={toggleisDeleting} onOk={onDeleteList} text={text} />
      )}
    </>
  );
};

export default withRouter(DeleteList);
