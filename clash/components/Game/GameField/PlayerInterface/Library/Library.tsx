import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import LibraryImage from 'public/assets/icons/library.svg';
import useGameActions from 'components/Game/useGameActions';
import CardStack from '../CardStack/CardStack';

import StyleSheet from './Library.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Library = ({ player, isSelf }: Props) => {
  const { onDrawCard } = useGameActions();
  const { library } = player.zones;

  const cards = library.slice(0, MAX_DISPLAYED_CARDS);

  return (
    <div className={StyleSheet.wrapper} onDoubleClick={isSelf ? onDrawCard : undefined}>
      <CardStack cards={cards} emptyImage={<LibraryImage />} />
    </div>
  );
};

export default Library;
