import React from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import LibraryImage from 'public/assets/icons/library.svg';
import useGameActions from 'components/Game/useGameActions';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import CardStack from '../CardStack/CardStack';

import StyleSheet from './Library.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Library = ({ player, isSelf }: Props) => {
  const { onMoveCard, onDrawCard } = useGameActions();
  const { library } = player.zones;

  const cards = library.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.LIBRARY, player.id);
  };

  return (
    <div className={StyleSheet.wrapper} onClick={isSelf ? onDrawCard : undefined}>
      <Dropzone onDrop={onDrop}>
        <CardStack cards={cards} emptyImage={<LibraryImage />} draggable />
      </Dropzone>
    </div>
  );
};

export default Library;
