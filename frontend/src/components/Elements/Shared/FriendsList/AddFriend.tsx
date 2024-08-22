import { useMutation, useQuery } from '@apollo/client';
import { AutoComplete } from 'antd';
import React, { useState } from 'react';

import message from 'utils/message';
import { SearchOutlined } from '@ant-design/icons';
import { searchUsers, sendFriendRequest } from './queries';

const AddFriend = () => {
  const [search, setSearch] = useState('');

  const { data, loading } = useQuery(searchUsers, {
    variables: { search },
    skip: search.length < 3,
  });

  const [mutate] = useMutation(sendFriendRequest);

  const options =
    data?.searchUsers.map((user) => ({
      value: user.id,
      label: user.username,
    })) ?? [];

  let notFoundContent = 'No users found';
  if (loading) notFoundContent = 'Loading...';
  if (search.length < 3) notFoundContent = 'Please enter at least 3 characters';

  const onSelect = async (value: string) => {
    setSearch('');
    await mutate({ variables: { userId: value }, refetchQueries: ['friends'] });
    message('Friend request sent');
  };

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      defaultActiveFirstOption
      notFoundContent={notFoundContent}
      placeholder="Find new friends"
      style={{ width: '100%' }}
      value={search}
      suffixIcon={<SearchOutlined />}
      onChange={(value) => setSearch(value)}
    />
  );
};

export default AddFriend;
