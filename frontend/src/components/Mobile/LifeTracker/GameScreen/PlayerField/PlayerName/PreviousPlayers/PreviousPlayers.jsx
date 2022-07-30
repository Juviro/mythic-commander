import React, { useContext } from 'react';
import { useQuery } from 'react-apollo';
import { List, Divider } from 'antd';
import UserContext from 'components/Provider/UserProvider';
import { ltPlayers } from './queries';
import PreviousPlayer from './PreviousPlayer';

export default ({ onSelectPlayer }) => {
  const { user } = useContext(UserContext);
  const { data } = useQuery(ltPlayers, { fetchPolicy: 'cache-and-network' });
  const previousPLayers = data?.ltPlayers ?? [];

  if (!user) return null;

  return (
    <>
      {Boolean(previousPLayers.length) && (
        <Divider style={{ margin: '32px 0px 16px' }}>Previous Players</Divider>
      )}
      <List loading={!data}>
        {previousPLayers.map((player) => (
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
