import { useQuery } from '@apollo/client';

import { Query } from 'types/graphql';
import { userPage } from './queries';

interface Props {
  username: string;
}

const useUserPage = ({ username }: Props) => {
  const { data, loading } = useQuery<Query>(userPage, {
    variables: {
      username,
    },
  });

  const decks = data?.userPage.decks.map((deck) => ({
    ...deck,
    canEdit: false,
  }));
  const wantsLists = data?.userPage.wantsLists;

  return {
    isCollectionPublic: data?.userPage.isCollectionPublic,
    canSendFriendRequest: data?.userPage.canSendFriendRequest,
    decks,
    wantsLists,
    loading,
    username: data?.userPage.username ?? username,
    userId: data?.userPage.userId,
  };
};

export default useUserPage;
