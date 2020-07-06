import React from 'react';
import { Select, Typography, message } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LockOutlined, GlobalOutlined } from '@ant-design/icons';

import Flex from '../Flex';
import {
  collectionVisibility,
  changeCollectionVisibility,
  getUser,
} from './queries';
import CopyableText from '../CopyableText';

const VISIBILITY_OPTIONS = [
  {
    title: 'Only you',
    value: 'private',
    icon: <LockOutlined />,
  },
  {
    title: 'Everyone with this link',
    value: 'public',
    icon: <GlobalOutlined />,
  },
];

export default () => {
  const [mutate] = useMutation(changeCollectionVisibility);
  const { data: dataVisibility, loading: loadingVisibility } = useQuery(
    collectionVisibility
  );
  const { data: dataUser, loading: loadingUser } = useQuery(getUser);

  const visibility = dataVisibility?.collection?.visibility;
  const username = dataUser?.user?.username;

  const onChange = async value => {
    await mutate({ variables: { visibility: value } });
    message.success('Successfully changed visibility!');
  };

  const isPubliclyVisible = visibility === 'public';
  const publicUrl = `${window.location.origin}/collection/${username}`;

  if (loadingVisibility || loadingUser) return null;

  if (!username)
    return (
      <Typography.Text type="warning">
        You need to set a username to share your collection. Please reload the
        page to pick one.
      </Typography.Text>
    );

  return (
    <Flex direction="column">
      <Typography.Text style={{ fontSize: 12 }} strong>
        Your collection is visible to:
      </Typography.Text>
      <Select
        style={{ width: '100%', marginTop: 8 }}
        defaultValue={visibility}
        onChange={onChange}
      >
        {VISIBILITY_OPTIONS.map(({ title, value, icon }) => (
          <Select.Option key={value} value={value}>
            {icon}
            <Typography.Text style={{ marginLeft: 8, fontSize: 12 }} strong>
              {title}
            </Typography.Text>
          </Select.Option>
        ))}
      </Select>
      {isPubliclyVisible && <CopyableText text={publicUrl} />}
    </Flex>
  );
};
