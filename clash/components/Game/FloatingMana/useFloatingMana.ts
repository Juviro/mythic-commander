import { useLayoutEffect, useState } from 'react';
import { XYCoord } from 'react-dnd';

import { Player } from 'backend/database/gamestate.types';
import useGameActions from '../useGameActions';

const INTIAL_POSITION_PADDING_X = 270;
const INTIAL_POSITION_PADDING_Y = 15;

const getInitialPosition = (playerId: string) => {
  const playerInterface = document.getElementById(
    `battlefield-${playerId}`
  ) as HTMLElement;

  if (!playerInterface) return { x: 300, y: 300 };

  const { x, y, width } = playerInterface.getBoundingClientRect();

  const positionX = x + width - INTIAL_POSITION_PADDING_X;
  const positionY = y + INTIAL_POSITION_PADDING_Y;

  return { x: positionX, y: positionY };
};

interface Props {
  player: Player;
  isSelf?: boolean;
}

const useFloatingMana = ({ player, isSelf }: Props) => {
  const [initialPosition, setInitialPosition] = useState<XYCoord | null>(null);

  const { trackFloatingMana } = useGameActions();

  useLayoutEffect(() => {
    if (initialPosition) return;

    // Wait for the player interface to be rendered
    const playerInterface = document.getElementById(
      `battlefield-${player.id}`
    ) as HTMLElement;

    if (!playerInterface) return;

    setInitialPosition(getInitialPosition(player.id));
  }, []);

  const onClose = () => {
    if (!isSelf) return;
    trackFloatingMana({ visible: false });
  };

  const onReset = () => {
    trackFloatingMana({
      mana: {
        w: 0,
        u: 0,
        b: 0,
        r: 0,
        g: 0,
        c: 0,
      },
    });
  };

  const floatingMana = player.activeUtils?.floatingMana?.mana;
  const visible = player.activeUtils?.floatingMana?.visible;
  const canReset = floatingMana && Object.values(floatingMana).some((value) => value > 0);

  return {
    initialPosition,
    visible,
    setInitialPosition,
    floatingMana,
    onClose,
    onReset,
    canReset,
  };
};

export default useFloatingMana;
