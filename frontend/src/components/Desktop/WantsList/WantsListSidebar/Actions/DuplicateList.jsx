import React from 'react';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';

import { withRouter } from 'react-router';
import { duplicateWantsListDesktop } from '../../queries';
import { useToggle } from '../../../../Hooks';

const DuplicateList = ({ id: wantsListId, history }) => {
  const [mutate] = useMutation(duplicateWantsListDesktop);
  const [loading, toggleLoading] = useToggle();

  const onDuplicate = async () => {
    toggleLoading();
    const {
      data: {
        duplicateWantsList: { id },
      },
    } = await mutate({
      variables: {
        wantsListId,
      },
      refetchQueries: ['wantsListsDesktop'],
    });
    history.push(`/wants/${id}`);
  };

  return (
    <Button type="link" onClick={onDuplicate} loading={loading}>
      Duplicate
    </Button>
  );
};

export default withRouter(DuplicateList);
