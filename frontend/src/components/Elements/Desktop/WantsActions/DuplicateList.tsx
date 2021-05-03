import React from 'react';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';

import { RouteComponentProps, withRouter } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { duplicateWantsListDesktop } from 'components/Desktop/WantsList/queries';
import { useToggle } from '../../../Hooks';

interface Props extends RouteComponentProps {
  id: string;
}

const DuplicateList = ({ id: wantsListId, history }: Props) => {
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
    <Button type="link" onClick={onDuplicate} loading={loading} icon={<CopyOutlined />}>
      Duplicate
    </Button>
  );
};

export default withRouter(DuplicateList);
