import React from 'react';
import { Typography, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import Flex from 'components/Elements/Shared/Flex';
import Avatar from '../Avatar';
import { deleteLtPlayer } from './queries';

export default ({ player, onSelectPlayer }) => {
  const [mutate] = useMutation(deleteLtPlayer);

  const onDeletePlayer = (e) => {
    e.stopPropagation();
    mutate({ variables: { name: player.name }, refetchQueries: ['ltPlayers'] });
  };

  return (
    <List.Item>
      <Flex
        direction="row"
        style={{ fontSize: 20, width: '100%' }}
        justify="space-between"
        align="center"
        onClick={() => onSelectPlayer(player)}
      >
        <Flex direction="row" align="center">
          <Avatar img={player.img} color={player.color} />
          <Typography.Text ellipsis style={{ marginLeft: 8, maxWidth: 220 }}>
            {player.name}
          </Typography.Text>
        </Flex>
        <CloseOutlined onClick={onDeletePlayer} />
      </Flex>
    </List.Item>
  );
};
