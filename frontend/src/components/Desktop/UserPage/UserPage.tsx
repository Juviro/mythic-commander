import React from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import PageLayout, { PageCard } from 'components/Elements/Desktop/PageLayout';
import { addGenetiveSuffix } from 'utils/i18n';
import useUserPage from 'components/Elements/Shared/UserPage/useUserPage';
import OverviewList from 'components/Elements/Desktop/OverviewList';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import Externalicon from 'components/Elements/Shared/ExternalIcon/Externalicon';
import SendFriendRequestButton from 'components/Elements/Shared/FriendsList/SendFriendRequestButton';
import getDynamicUrl from 'utils/getDynamicUrl';

const StyledLink = styled(Link)`
  display: flex;
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

  const collectionLink = `/collection/${actualUsername}`;

  return (
    <PageLayout>
      <PageCard
        title={
          <div>
            {title}
            {canSendFriendRequest && <SendFriendRequestButton userId={userId} />}
          </div>
        }
        extra={
          isCollectionPublic && (
            <StyledLink to={collectionLink}>
              Collection
              <Externalicon size={16} />
            </StyledLink>
          )
        }
      >
        <Divider orientation="left">
          {decks?.length ? `Decks (${decks?.length})` : 'Decks'}
        </Divider>
        <OverviewList
          noPadding
          initialLimit={4}
          loading={loading}
          lists={decks}
          getHref={(id) => getDynamicUrl(`/decks/${id}`)}
          emptyText={"This user doesn't have any public decks."}
        />
        <Divider orientation="left">
          {wantsLists?.length ? `Wants (${wantsLists?.length})` : 'Wants'}
        </Divider>
        <OverviewList
          noPadding
          loading={loading}
          initialLimit={4}
          lists={wantsLists}
          getHref={(id) => getDynamicUrl(`/wants/${id}`)}
          emptyText={"This user doesn't have any public wants lists."}
        />
      </PageCard>
    </PageLayout>
  );
};

export default UserPage;
