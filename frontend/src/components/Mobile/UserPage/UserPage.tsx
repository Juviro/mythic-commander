import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { addGenetiveSuffix } from 'utils/i18n';
import useUserPage from 'components/Elements/Shared/UserPage/useUserPage';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { OverviewList } from 'components/Elements/Mobile';
import SendFriendRequestButton from 'components/Elements/Shared/FriendsList/SendFriendRequestButton';
import Externalicon from 'components/Elements/Shared/ExternalIcon/Externalicon';
import { LoadingOutlined } from '@ant-design/icons';
import Flex from 'components/Elements/Shared/Flex';
import getDynamicUrl from 'utils/getDynamicUrl';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  justify-content: flex-end;
`;

const StyledWrapper = styled.div``;

const StyledTitle = styled.h1`
  padding: 16px 16px 0;
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const UserPage = () => {
  const { username } = useParams<{ username: string }>();

  const {
    decks,
    wantsLists,
    loading,
    isCollectionPublic,
    username: actualUsername,
    userId,
    canSendFriendRequest,
  } = useUserPage({
    username,
  });

  const title = `${addGenetiveSuffix(actualUsername)} Profile`;
  useDocumentTitle(title);

  const collectionLink = `/m/collection/${actualUsername}`;

  return (
    <StyledWrapper>
      <StyledTitle>
        {title}
        {canSendFriendRequest && <SendFriendRequestButton userId={userId} />}
      </StyledTitle>
      {loading && (
        <Flex justify="center">
          <LoadingOutlined />
        </Flex>
      )}
      {isCollectionPublic && (
        <StyledLink to={collectionLink}>
          Collection
          <Externalicon size={16} />
        </StyledLink>
      )}
      <OverviewList
        // @ts-ignore
        elements={decks ?? []}
        header={decks?.length ? `Decks (${decks?.length})` : 'Decks'}
        initialLimit={4}
        getHref={(id) => getDynamicUrl(`/decks/${id}`)}
        emptyText={"This user doesn't have any public decks."}
      />
      <OverviewList
        // @ts-ignore
        elements={wantsLists ?? []}
        header={wantsLists?.length ? `Wants (${wantsLists?.length})` : 'Wants'}
        initialLimit={4}
        getHref={(id) => getDynamicUrl(`/wants/${id}`)}
        emptyText={"This user doesn't have any public wants lists."}
      />
    </StyledWrapper>
  );
};

export default UserPage;
