import { Player } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import { RefObject, useContext } from 'react';
import { VERTICAL_GRID_SIZE } from '../BattlefieldGrid/BattlefieldGrid';

const MIN_STACKED_CARDS = 2;
const PADDING_FACTOR = 1.5;

interface Props {
  player: Player;
  battlefieldRef: RefObject<HTMLDivElement>;
}

const useOrganizeLands = ({ battlefieldRef, player }: Props) => {
  const { battlefieldCardWidth } = useContext(GameStateContext);

  const organizeLands = () => {
    if (!battlefieldRef.current) return;

    const lands = player.zones.battlefield.filter(
      (card) => 'type_line' in card && card.type_line.includes('Land')
    );

    const battlefieldWidth = battlefieldRef.current.clientWidth;
    const maxNumberOfColumns = Math.floor(
      battlefieldWidth / (battlefieldCardWidth * PADDING_FACTOR)
    );

    const numberOfColumns = Math.min(
      Math.ceil(lands.length / MIN_STACKED_CARDS),
      maxNumberOfColumns
    );

    const gridSize = battlefieldWidth / VERTICAL_GRID_SIZE;
    console.log('gridSize', gridSize);
  };

  return { organizeLands };
};

export default useOrganizeLands;
