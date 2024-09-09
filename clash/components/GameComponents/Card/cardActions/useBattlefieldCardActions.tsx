import { MouseEvent } from 'react';
import { EnterOutlined, EyeOutlined } from '@ant-design/icons';

import { Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { ALL_COUNTERS, DEFAULT_COUNTERS } from 'constants/counters';
import SubmittableSelect from 'components/GameComponents/ContextMenu/SubmittableSelect';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import { getPeekSubItems } from 'components/Game/GameField/PlayerInterface/Library/useLibraryActions';

interface Props {
  cardIds: string[];
  player: Player;
  isFaceDown?: boolean;
}

const useBattlefieldCardActions = ({ cardIds, player, isFaceDown }: Props) => {
  const { onAddCounters, copyCard, onTurnFaceDown, onPeekFaceDown, onRotateCards } =
    useGameActions();

  const onAddCounter = (type: string) => (e?: MouseEvent) => {
    e?.stopPropagation();
    onAddCounters({
      cardIds,
      type,
      amount: 1,
    });
  };

  const otherCounterOptions = ALL_COUNTERS.map((label) => ({
    label,
    value: label,
  }));

  const addCounterOptions = DEFAULT_COUNTERS.map(({ type, label }) => ({
    key: type as string,
    // prevent the context menu from closing when clicking on the label,
    // that way the user can add multiple counters in a row
    label: <div onClick={onAddCounter(type)}>{label}</div>,
  })).concat({
    key: 'custom-counter',
    label: (
      <SubmittableSelect
        onSelect={(value) => onAddCounter(value)()}
        options={otherCounterOptions}
      />
    ),
  });

  const createCopies = (amount: number) => {
    cardIds.forEach((clashId) => {
      copyCard({
        clashId,
        amount,
        battlefieldPlayerId: player.id,
      });
    });
  };

  const turnFaceDown = () => {
    onTurnFaceDown({
      cardIds,
      battlefieldPlayerId: player.id,
    });
  };

  const rotateCards = (event: any) => {
    onRotateCards({
      cardIds,
      rotateLeft: event.domEvent.shiftKey,
      battlefieldPlayerId: player.id,
    });
  };

  const peekFaceDown = () => {
    onPeekFaceDown({
      cardId: cardIds[0],
      battlefieldPlayerId: player.id,
    });
  };

  const createCopiesSubItems = getPeekSubItems(createCopies, 'create-copy', (index) => {
    if (!index) return '1 Copy';
    return `${index + 1} Copies`;
  });

  const addCounterItem = {
    key: 'add-counter',
    label: 'Add counter...',
    children: addCounterOptions,
    icon: <ClashIcon id="counter-shield" size={16} />,
  };

  let label = 'Turn Face Up / Down';
  if (typeof isFaceDown === 'boolean') {
    label = isFaceDown ? 'Turn Face Up' : 'Turn Face Down';
  }
  const turnFacDownItem = {
    key: 'turn-face-down',
    label,
    onClick: turnFaceDown,
    icon: <ClashIcon id="flip" size={16} />,
  };

  const rotateItem = {
    key: 'rotate',
    label: 'Rotate 90°',
    onClick: rotateCards,
    icon: <EnterOutlined style={{ transform: 'rotate(180deg)' }} />,
  };

  const peekItem = {
    key: 'peek-face-down',
    label: 'Peek at face down card',
    onClick: peekFaceDown,
    icon: <EyeOutlined />,
  };

  const copyItem = {
    key: 'create-copy',
    label: 'Create Copy... [C]',
    children: createCopiesSubItems,
    icon: <ClashIcon id="ability-transform" size={16} />,
  };

  return {
    addCounterItem,
    turnFacDownItem,
    rotateItem,
    peekItem,
    copyItem,
  };
};

export default useBattlefieldCardActions;
