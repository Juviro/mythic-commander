import { ReactNode, useContext } from 'react';
import { ArrowRightOutlined, BookOutlined, SwitcherOutlined } from '@ant-design/icons';

import { Zone, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';

import CardPositionContext from 'components/Game/CardPositionContext';
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
  const { setRulesCardId } = useContext(CardPositionContext);
  const { player } = useContext(GameStateContext);
  const { onTapCards, onTransformCards, onMoveCard } = useGameActions();

  const moveCardActions = useMoveCardActions({
    zone,
    cardIds,
    player: player!,
  });

  const moveOntoStack = () => onMoveCard(cardIds[0], ZONES.STACK, null);

  const transformCards = () => {
    if (!battlefieldPlayerId) return;
    onTransformCards({
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

  const transformItem = {
    key: 'transform',
    label: 'Transform [F]',
    onClick: transformCards,
    icon: <ClashIcon id="dfc-modal-back" size={16} />,
  };

  const moveItem = {
    key: 'move',
    label: `Move ${cardIds.length === 1 ? 'card' : 'all cards'} to...`,
    children: moveCardActions,
    icon: <ArrowRightOutlined />,
  };

  const putOntoStack = {
    key: 'put-onto-stack',
    label: 'Put onto Stack',
    onClick: moveOntoStack,
    icon: <SwitcherOutlined />,
  };

  const rulesItem = {
    key: 'rules',
    label: 'Rules',
    onClick: () => setRulesCardId(cardIds.at(0)!),
    icon: <BookOutlined />,
  };

  return {
    transformCards,
    tapCards,
    titleItem,
    tapItem,
    transformItem,
    moveItem,
    putOntoStack,
    rulesItem,
  };
};

export default useBaseCardActions;
