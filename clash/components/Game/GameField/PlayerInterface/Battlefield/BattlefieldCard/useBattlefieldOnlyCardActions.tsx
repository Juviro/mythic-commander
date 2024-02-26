import { MouseEvent } from 'react';
import { MenuProps } from 'antd';

import { BattlefieldCard, Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { ALL_COUNTERS, DEFAULT_COUNTERS } from 'constants/counters';
import SubmittableSelect from 'components/GameComponents/ContextMenu/SubmittableSelect';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import { SwapOutlined } from '@ant-design/icons';
import { getPeekSubItems } from '../../Library/useLibraryActions';

interface Props {
  card: BattlefieldCard;
  player: Player;
}

const useBattlefieldOnlyCardActions = ({ card, player }: Props) => {
  const { onAddCounters, copyCard, onTurnFaceDown } = useGameActions();

  const onAddCounter = (type: string) => (e?: MouseEvent) => {
    e?.stopPropagation();
    onAddCounters({
      cardIds: [card.clashId],
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
    copyCard({
      clashId: card.clashId,
      amount,
      battlefieldPlayerId: player.id,
    });
  };

  const turnFaceDown = () => {
    onTurnFaceDown({
      cardIds: [card.clashId],
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

  if (!card.isToken) {
    additionalBattlefieldContextMenuItems.unshift({
      key: 'turn-face-down',
      label: card.faceDown ? 'Turn Face Up' : 'Turn Face Down',
      onClick: turnFaceDown,
      icon: <SwapOutlined />,
    });
  }
  if (!card.faceDown) {
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
