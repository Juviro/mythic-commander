import { Collapse } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FriendsCollection } from 'types/graphql';
import FriendsCollectionEntry from './FriendsCollectionEntry';

const StyledCollapse = styled(Collapse)`
  width: 100%;
  margin-top: -16px;
`;

interface Props {
  friends: FriendsCollection[];
  selectedCardId?: string;
  setSelectedCardId?: (id: string) => void;
}

const FriendsCollectionEntries = ({
  friends,
  selectedCardId,
  setSelectedCardId,
}: Props) => {
  const items = friends.map((friend) => ({
    key: friend.userId,
    label: (
      <span>
        <span>{`${friend.username}: `}</span>
        <b>{friend.amountTotal}</b>
        <span> collected</span>
      </span>
    ),
    children: (
      <FriendsCollectionEntry
        sets={friend.sets}
        setSelectedCardId={setSelectedCardId}
        selectedCardId={selectedCardId}
      />
    ),
  }));

  return <StyledCollapse ghost items={items} />;
};

export default FriendsCollectionEntries;
