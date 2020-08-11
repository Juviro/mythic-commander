import React from 'react';
import { Typography, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useMutation } from 'react-apollo';

import Avatar from '../Avatar';
import { deleteLtPlayer } from './queries';
import { Flex } from '../../../../../../Elements/Shared';

export default ({ player, onSelectPlayer }) => {
  const [mutate] = useMutation(deleteLtPlayer);

  const onDeletePlayer = e => {
    e.stopPropagation();
    mutate({ variables: { name: player.name }, refetchQueries: ['ltPlayer'] });
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