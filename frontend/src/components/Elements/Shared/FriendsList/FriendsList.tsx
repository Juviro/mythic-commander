import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';

import { Query } from 'types/graphql';
import FriendsListEntry from './FriendsListEntry';
import AddFriend from './AddFriend';
import { getFriends } from './queries';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  gap: 16px;
  width: 100%;
  max-width: 400px;
`;

const FriendsList = () => {
  const { data, loading } = useQuery<Query>(getFriends);
  const friends = data?.friends;

  return (
    <StyledWrapper>
      <AddFriend />
      {loading && <LoadingOutlined />}
      {Boolean(friends?.length) && !loading && (
        <StyledList>
          {friends.map((friend) => (
            <FriendsListEntry key={friend.username} friend={friend} />
          ))}
        </StyledList>
      )}
      {!loading && !friends?.length && (
        <Empty description="You have not added any friends yet" />
      )}
    </StyledWrapper>
  );
};

export default FriendsList;
