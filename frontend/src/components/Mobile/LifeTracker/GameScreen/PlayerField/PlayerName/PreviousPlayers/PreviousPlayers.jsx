import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, Divider } from 'antd';
import { ltPlayer } from './queries';
import PreviousPlayer from './PreviousPlayer';

export default ({ onSelectPlayer }) => {
  const { data, loading } = useQuery(ltPlayer, { fetchPolicy: 'cache-first' });
  const previousPLayers = data?.ltPlayer ?? [];

  return (
    <>
      <Divider style={{ margin: '32px 0px 16px' }}>Previous Players</Divider>
      <List loading={loading}>
        {previousPLayers.map(player => (
          <PreviousPlayer
            player={player}
            key={player.name}
            onSelectPlayer={onSelectPlayer}
          />
        ))}
      </List>
    </>
  );
};
