import React from 'react';
import { UnifiedDeck } from 'types/unifiedTypes';
import { Space, Typography } from 'antd';
import Hint from '../Hint';
import BracketOverview from './BracketOverview';

interface BracketInfoProps {
  deck: UnifiedDeck;
}

const getPossibleBrackets = (numberOfGameChangers: number) => {
  if (numberOfGameChangers === 0) {
    return '1-3';
  }
  if (numberOfGameChangers <= 3) {
    return '3-4';
  }
  return '4-5';
};

const BracketInfo = ({ deck }: BracketInfoProps) => {
  if (!deck) return null;

  const gameChangers = deck.cards.filter((card) => card.game_changer);
  const numberOfGameChangers = gameChangers.length;
  const bracket = getPossibleBrackets(numberOfGameChangers);

  return (
    <Space>
      <Typography.Text>
        <b>{numberOfGameChangers}</b>
        {` Game Changer${numberOfGameChangers === 1 ? '' : 's'}`}
      </Typography.Text>
      <Typography.Text>-</Typography.Text>
      <Typography.Text>
        {`Bracket `}
        <b>{bracket}</b>
        <Hint text={<BracketOverview gameChangers={gameChangers} />} asModal />
      </Typography.Text>
    </Space>
  );
};

export default BracketInfo;
