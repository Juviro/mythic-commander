import { MenuProps } from 'antd';

import { BattlefieldCard, Player, ZONES } from 'backend/database/gamestate.types';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import { RefObject, useContext } from 'react';
import useGameActions from 'components/Game/useGameActions';
import { AppstoreOutlined, ArrowRightOutlined, CopyOutlined } from '@ant-design/icons';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import GameStateContext from 'components/Game/GameStateContext';
import useOrganizeLands from './useOrganizeLands';
import useCreateTokenActions from './useCreateTokenActions';

interface Props {
  cards: BattlefieldCard[];
  player: Player;
  battlefieldRef: RefObject<HTMLDivElement | null>;
}

const useBattlefieldActions = ({ cards, player, battlefieldRef }: Props) => {
  const { player: self } = useContext(GameStateContext);
  const cardIds = cards.map((card) => card.clashId);
  const { onTapCards } = useGameActions();
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.BATTLEFIELD,
  });

  const onUntapBoard = () => {
    onTapCards({
      cardIds,
      battlefieldPlayerId: player.id,
      tapped: false,
    });
  };

  const { organizeLands } = useOrganizeLands({ player, battlefieldRef });

  const isSelf = player.id === self?.id;

  useShortcut(SHORTCUTS.ORGANIZE_LANDS, organizeLands, {
    disabled: !isSelf,
  });

  const createTokenActions = useCreateTokenActions({ cards, player, battlefieldRef });

  const battlefieldActions: MenuProps['items'] = [
    {
      key: 'untap-all',
      label: 'Untap board [U]',
      onClick: onUntapBoard,
      icon: <ClashIcon id="untap" size={16} />,
    },
    {
      key: 'move-to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
      icon: <ArrowRightOutlined />,
    },
    {
      key: 'create-token',
      label: 'Create token',
      children: createTokenActions,
      icon: <CopyOutlined />,
    },
  ];

  if (isSelf) {
    battlefieldActions.push({
      key: 'organize-lands',
      label: 'Organize Lands [O]',
      onClick: organizeLands,
      icon: <AppstoreOutlined />,
    });
  }

  return battlefieldActions;
};

export default useBattlefieldActions;
