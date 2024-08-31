import { ReactNode, useContext } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
// import { ArrowRightOutlined, BookOutlined } from '@ant-design/icons';

import { Zone } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';

import useMoveCardActions from './useMoveCardActions';

interface Props {
  cardIds: string[];
  battlefieldPlayerId?: string;
  zone?: Zone;
  contextMenuTitle?: ReactNode;
}

const useBaseCardActions = ({
  cardIds,
  battlefieldPlayerId,
  zone,
  contextMenuTitle,
}: Props) => {
  const { player } = useContext(GameStateContext);
  const { onTapCards, onFlipCards } = useGameActions();

  const moveCardActions = useMoveCardActions({
    zone,
    cardIds,
    player: player!,
  });

  const flipCards = () => {
    if (!battlefieldPlayerId) return;
    onFlipCards({
      cardIds,
      battlefieldPlayerId,
    });
  };

  const tapCards = () => {
    if (!battlefieldPlayerId) return;
    onTapCards({
      cardIds,
      battlefieldPlayerId,
    });
  };

  const titleItem = {
    key: 'title',
    label: <b>{contextMenuTitle || `${cardIds.length} cards selected`}</b>,
    style: {
      backgroundColor: 'white',
      cursor: 'default',
    },
  };

  const tapItem = {
    key: 'tap',
    label: 'Tap [T]',
    onClick: tapCards,
    icon: <ClashIcon id="tap" size={16} />,
  };

  const flipItem = {
    key: 'flip',
    label: 'Flip [F]',
    onClick: flipCards,
    icon: <ClashIcon id="dfc-modal-back" size={16} />,
  };

  const moveItem = {
    key: 'move',
    label: `Move ${cardIds.length === 1 ? 'card' : 'all cards'} to...`,
    children: moveCardActions,
    icon: <ArrowRightOutlined />,
  };

  // const rulesItem = {
  //   key: 'rules',
  //   label: 'Rules',
  //   onClick: console.log,
  //   icon: <BookOutlined />,
  // };

  return {
    flipCards,
    tapCards,
    titleItem,
    tapItem,
    flipItem,
    moveItem,
    // rulesItem,
  };
};

export default useBaseCardActions;
