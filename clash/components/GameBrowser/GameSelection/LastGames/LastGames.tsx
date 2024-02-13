import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { LoadingOutlined } from '@ant-design/icons';
import { formatDate, formatTime } from 'utils/i18nUtils';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { ClashGame } from 'pages/api/last-games';
import styles from './LastGames.module.css';
import GamesList from '../GamesList';
import LastGamesPlayers from './LastGamesPlayers';

const getLastGames = async (page = 0) => {
  const res = await fetch(`/api/last-games?page=${page}`);
  const response = res.json();
  return response;
};

interface Response {
  lastGames: ClashGame[];
  nextCursor: number;
}

const LastGames = () => {
  const router = useRouter();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<Response>(
      'last-games',
      ({ pageParam = 0 }) => getLastGames(pageParam),
      {
        refetchInterval: Infinity,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        keepPreviousData: true,
      }
    );

  const onRejoinGame = (lobbyId: string) => {
    router.push(`/match/${lobbyId}`);
  };

  const allGames = data?.pages.flatMap((page) => page.lastGames);

  const games = allGames?.map(({ id, lobby, state, lastUpdate }) => ({
    id,
    name: <LastGamesPlayers players={lobby.players} />,
    description: (
      <div>
        <div>{`Turn ${state.turn}`}</div>
        <div>{`${formatDate(lastUpdate, true)}`}</div>
        <div>{`${formatTime(lastUpdate)}`}</div>
      </div>
    ),
  }));

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <GamesList
          games={games}
          onJoinGame={onRejoinGame}
          emptyText={
            <div>
              <div>No games found.</div>
              <div>Inactive games are deleted</div>
              <div>automatically after 60 days</div>
            </div>
          }
        />
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          type="primary"
          ghost
          loading={isFetchingNextPage}
        >
          Load More games
        </Button>
      )}
    </div>
  );
};

export default LastGames;
