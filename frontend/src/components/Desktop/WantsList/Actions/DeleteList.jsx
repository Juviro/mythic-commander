import React from 'react';
import { Button, message } from 'antd';
import { useMutation } from 'react-apollo';

import { withRouter } from 'react-router';
import { DeleteOutlined } from '@ant-design/icons';
import { useToggle } from '../../../Hooks';
import { ConfirmDelete } from '../../../Elements/Shared';
import boldText from '../../../../utils/boldText';
import { deleteWantsListDesktop } from '../queries';

const DeleteList = ({ wantsList: { id: wantsListId, name }, history }) => {
  const [isDeleting, toggleisDeleting] = useToggle();
  const [mutate] = useMutation(deleteWantsListDesktop);

  const onDeleteList = async () => {
    toggleisDeleting(false);
    await mutate({
      variables: {
        wantsListId,
      },
    });
    message.success('Deleted wants list!');
    history.replace('/my-wants');
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
