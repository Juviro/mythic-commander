import React from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import CardStack from '../CardStack/CardStack';

import styles from './Graveyard.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Graveyard = ({ player, isSelf }: Props) => {
  const { onMoveCard } = useGameActions();
  const { graveyard } = player.zones;

  const cards = graveyard.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.GRAVEYARD, player.id);
  };

  return (
    <div className={styles.wrapper}>
      <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id}>
        <CardStack
          cards={cards}
          emptyImage={<GraveyardImage />}
          draggable={isSelf}
          zone="graveyard"
          canHover
        />
      </Dropzone>
    </div>
  );
};

export default Graveyard;
