import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, Divider } from 'antd';
import { ltPlayers } from './queries';
import PreviousPlayer from './PreviousPlayer';

export default ({ onSelectPlayer }) => {
  const { data } = useQuery(ltPlayers, { fetchPolicy: 'cache-and-network' });
  const previousPLayers = data?.ltPlayers ?? [];

  return (
    <>
      {Boolean(previousPLayers.length) && (
        <Divider style={{ margin: '32px 0px 16px' }}>Previous Players</Divider>
      )}
      <List loading={!data}>
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
