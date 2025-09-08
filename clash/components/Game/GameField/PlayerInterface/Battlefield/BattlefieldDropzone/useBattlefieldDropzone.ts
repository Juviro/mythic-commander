import { RefObject, useContext } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import CardPositionContext from 'components/Game/CardPositionContext';
import useGameActions from 'components/Game/useGameActions';

import { DropCard, DropCardGroup } from 'types/dnd.types';

interface Props {
  player: Player;
  isFlipped: boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
}

export const getRelativePosition = (
  { x, y }: { x: number; y: number },
  battlefieldElement: HTMLDivElement
) => {
  const { left, top } = battlefieldElement.getBoundingClientRect();
  const relativeX = x - left;
  const relativeY = y - top;
  const posX = (relativeX / battlefieldElement.clientWidth) * 100;
  const posY = (relativeY / battlefieldElement.clientHeight) * 100;

  return { x: posX, y: posY };
};

const useBattlefieldDropzone = ({ player, wrapperRef, isFlipped }: Props) => {
  const { onMoveCard, onMoveCardsGroup } = useGameActions();
  const { snapChoords, cardPositions } = useContext(CardPositionContext);

  const getRelativeMonitorPosition = (clientOffset: { x: number; y: number } | null) => {
    if (!clientOffset || !wrapperRef.current) return { x: 0, y: 0 };

    const { left, top } = wrapperRef.current!.getBoundingClientRect();

    return {
      x: clientOffset.x - left,
      y: clientOffset.y - top,
    };
  };

  const moveCardGroup = (cardGroup: DropCardGroup, monitor: DropTargetMonitor) => {
    if (!wrapperRef.current) return;
    const { cardIds, offset } = cardGroup;

    cardIds.forEach((cardId) => {
      cardPositions.current[cardId] = null;
    });

    const clientOffset = getRelativeMonitorPosition(monitor.getClientOffset());
    const initialOffset = getRelativeMonitorPosition(monitor.getInitialClientOffset());
    const initialSourceOffset = getRelativeMonitorPosition(
      monitor.getInitialSourceClientOffset()
    );

    const diffX = initialOffset.x - initialSourceOffset.x;
    const diffY = initialOffset.y - initialSourceOffset.y;
    clientOffset.x -= diffX;
    clientOffset.y -= diffY;

    const hasGroupFlipped = isFlipped !== offset.isFlipped;

    const { clientWidth, clientHeight } = wrapperRef.current;

    const offsetX = hasGroupFlipped ? clientWidth - (offset.x + offset.width) : offset.x;
    const offsetY = hasGroupFlipped
      ? clientHeight - (offset.y + offset.height)
      : offset.y;

    const deltaX = clientOffset.x - offsetX;
    const deltaY = clientOffset.y - offsetY;

    let relativeX = (deltaX / clientWidth) * 100;
    let relativeY = (deltaY / clientHeight) * 100;

    if (typeof snapChoords.current.groupX === 'number') {
      relativeX = snapChoords.current.groupX;
      snapChoords.current.x = null;
    }
    if (typeof snapChoords.current.groupY === 'number') {
      relativeY = snapChoords.current.groupY;
      snapChoords.current.y = null;
    }

    if (isFlipped) {
      relativeX *= -1;
      relativeY *= -1;
    }

    const delta = { x: relativeX, y: relativeY };

    onMoveCardsGroup(cardIds, player.id, delta);
  };

  const moveSingleCard = (card: DropCard, monitor: DropTargetMonitor) => {
    if (!wrapperRef.current) return;
    const { clashId } = card;
    cardPositions.current[clashId] = null;
    let { x, y } = monitor.getClientOffset()!;

    if (typeof snapChoords.current.x === 'number') {
      x = snapChoords.current.x;
      snapChoords.current.x = null;
    }
    if (typeof snapChoords.current.y === 'number') {
      y = snapChoords.current.y;
      snapChoords.current.y = null;
    }

    let { x: posX, y: posY } = getRelativePosition({ x, y }, wrapperRef.current);

    if (isFlipped) {
      posX = 100 - posX;
      posY = 100 - posY;
    }

    const position = { x: posX, y: posY };

    onMoveCard(clashId, ZONES.BATTLEFIELD, player.id, {
      position,
      index: snapChoords?.current?.placeBehindOthers ? 0 : undefined,
    });
  };

  return {
    moveCardGroup,
    moveSingleCard,
  };
};

export default useBattlefieldDropzone;
