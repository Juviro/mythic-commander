import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, DropdownProps, Space, Tag } from 'antd';

import { Friend } from 'types/graphql';
import { error, success } from 'constants/colors';
import { useMutation } from '@apollo/client';
import message from 'utils/message';
import { acceptFriendRequest, removeFriend } from './queries';

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: inherit;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`;

const StyledTag = styled(Tag)`
  padding: 0 4px;
  font-size: 11px;
  line-height: unset;
`;

interface Props {
  friend: Friend;
}

const FriendsListEntry = ({ friend }: Props) => {
  const [accept] = useMutation(acceptFriendRequest, {
    variables: { userId: friend.id },
    refetchQueries: ['friends'],
  });
  const [remove] = useMutation(removeFriend, {
    variables: { userId: friend.id },
    refetchQueries: ['friends'],
  });

  const onAccept = async () => {
    await accept();
    message(`You are now friends with ${friend.username}!`);
  };

  const onRemove = async () => {
    // eslint-disable-next-line max-len
    let confirmMessage = `Are you sure you want to remove ${friend.username} as a friend?`;
    if (friend.canWithdraw)
      confirmMessage = `Withdraw friend request to ${friend.username}?`;
    if (friend.canAccept)
      confirmMessage = `Decline friend request from ${friend.username}?`;

    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;
    await remove();
    message(`Removed ${friend.username} from your friends list`);
  };

  const items: DropdownProps['menu']['items'] = [
    {
      key: 'remove',
      label: friend.canWithdraw ? 'Withdraw request' : 'Remove friend',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: onRemove,
    },
  ];

  return (
    <StyledListItem>
      <StyledLink to={`/users/${encodeURIComponent(friend.username)}`}>
        <StyledAvatar src={friend.avatar} alt={friend.username} />
        <div>{friend.username}</div>
        {friend.canWithdraw && <StyledTag color="blue">Pending</StyledTag>}
      </StyledLink>
      {friend.canAccept ? (
        <Space>
          <CheckOutlined style={{ color: success }} onClick={onAccept} />
          <CloseOutlined style={{ color: error }} onClick={onRemove} />
        </Space>
      ) : (
        <Dropdown menu={{ items }} trigger={['click']}>
          <MoreOutlined style={{ fontSize: 20, marginRight: -6 }} />
        </Dropdown>
      )}
    </StyledListItem>
  );
};

export default FriendsListEntry;
