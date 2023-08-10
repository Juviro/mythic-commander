import { Button, Typography } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import React from 'react';
import Avatar from '../GameScreen/PlayerField/PlayerName/Avatar';
import { Player } from '../LifeTracker.types';

interface Props {
  onRejoin: () => void;
  players: Player[];
}

const RejoinGame = ({ onRejoin, players }: Props) => {
  return (
    <Flex direction="column" gap={16}>
      {players?.map((player) => (
        <Flex justify="space-between" key={player.id}>
          <Flex gap={16}>
            <Avatar img={player.img} color={player.color} />
            <Typography.Text style={{ fontSize: 16 }}>{player.name}</Typography.Text>
          </Flex>
          <Typography.Text style={{ fontSize: 16, justifySelf: 'flex-end' }}>
            {`${player.life} Leben`}
          </Typography.Text>
        </Flex>
      ))}
      <Button
        type="primary"
        onClick={onRejoin}
        style={{ width: '50%', alignSelf: 'flex-end', marginBottom: 24, maxWidth: 250 }}
      >
        Resume Game
      </Button>
    </Flex>
  );
};

export default RejoinGame;
