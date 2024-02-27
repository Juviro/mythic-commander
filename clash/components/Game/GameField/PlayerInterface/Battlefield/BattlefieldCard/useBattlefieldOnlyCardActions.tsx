import { MouseEvent } from 'react';
import { MenuProps } from 'antd';

import { Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { ALL_COUNTERS, DEFAULT_COUNTERS } from 'constants/counters';
import SubmittableSelect from 'components/GameComponents/ContextMenu/SubmittableSelect';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import { EyeOutlined, SwapOutlined } from '@ant-design/icons';
import { getPeekSubItems } from '../../Library/useLibraryActions';

interface Props {
  cardIds: string[];
  player: Player;
  canCopy?: boolean;
  isFaceDown?: boolean;
  canTurnFaceDown?: boolean;
}

const useBattlefieldOnlyCardActions = ({
  cardIds,
  player,
  canCopy,
  isFaceDown,
  canTurnFaceDown,
}: Props) => {
  const { onAddCounters, copyCard, onTurnFaceDown, onPeekFaceDown } = useGameActions();

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

  const additionalBattlefieldContextMenuItems: MenuProps['items'] = [
    {
      type: 'divider',
    },
    {
      key: 'add-counter',
      label: 'Add counter...',
      children: addCounterOptions,
      icon: <ClashIcon id="counter-shield" size={16} />,
    },
  ];

  if (canTurnFaceDown) {
    let label = 'Turn Face Up / Down';
    if (typeof isFaceDown === 'boolean') {
      label = isFaceDown ? 'Turn Face Up' : 'Turn Face Down';
    }
    additionalBattlefieldContextMenuItems.unshift({
      key: 'turn-face-down',
      label,
      onClick: turnFaceDown,
      icon: <SwapOutlined />,
    });
  }
  if (isFaceDown && cardIds.length === 1) {
    additionalBattlefieldContextMenuItems.unshift({
      key: 'peek-face-down',
      label: 'Peek at face down card',
      onClick: peekFaceDown,
      icon: <EyeOutlined />,
    });
  }

  if (canCopy) {
    additionalBattlefieldContextMenuItems.push({
      key: 'create-copy',
      label: 'Create Copy...',
      children: createCopiesSubItems,
      icon: <ClashIcon id="ability-transform" size={16} />,
    });
  }

  return additionalBattlefieldContextMenuItems;
};

export default useBattlefieldOnlyCardActions;
