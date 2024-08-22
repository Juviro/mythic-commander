import { useQuery } from '@apollo/client';
import { Divider, Empty } from 'antd';
import React from 'react';
import { Query } from 'types/graphql';
import { LoadingOutlined } from '@ant-design/icons';

import { friendsCollection } from './queries';
import Flex from '../Flex';
import FriendsCollectionEntries from './FriendsCollectionEntries';

interface Props {
  oracle_id: string;
  selectedCardId?: string;
  setSelectedCardId?: (id: string) => void;
}

const FriendsCollection = ({ oracle_id, selectedCardId, setSelectedCardId }: Props) => {
  const { data, loading } = useQuery<Query>(friendsCollection, {
    variables: { oracle_id },
    skip: !oracle_id,
  });
  const friends = data?.cardByOracleId?.oracleCard?.friendsCollection;

  return (
    <>
      <Divider>Your Friends&apos; Collection</Divider>
      {loading && (
        <Flex justify="center">
          <LoadingOutlined />
        </Flex>
      )}
      {!loading && !friends?.length && (
        <Empty
          description="None of your friends has collected this card yet"
          style={{ fontSize: 12, maxWidth: 150 }}
          imageStyle={{ transform: 'scale(0.8)' }}
        />
      )}
      {!loading && Boolean(friends?.length) && (
        <FriendsCollectionEntries
          friends={friends}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      )}
    </>
  );
};

export default FriendsCollection;
