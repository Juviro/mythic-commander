import React from 'react';

interface Props {
  games: string[];
}

const GameList = ({ games }: Props) => {
  return (
    <ul>
      <li>Game 1</li>
      <li>Game 2</li>
    </ul>
  );
};

export default GameList;
