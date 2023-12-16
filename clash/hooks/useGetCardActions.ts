import { ItemType } from 'antd/es/menu/hooks/useItems';
import useGameActions from 'components/Game/useGameActions';

interface Props {
  cardIds: string[];
  battlefieldPlayerId?: string;
  hiddenActionKeys?: string[];
}

const useGetCardActions = ({ cardIds, battlefieldPlayerId, hiddenActionKeys }: Props) => {
  const { onTapCards, onFlipCards } = useGameActions();

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

  const contextMenuItems: (ItemType & { hidden?: boolean })[] = [
    {
      key: 'tap',
      label: 'Tap [T]',
      hidden: !battlefieldPlayerId,
      onClick: tapCards,
    },
    {
      key: 'flip',
      label: 'Flip [F]',
      hidden: !battlefieldPlayerId,
      onClick: flipCards,
    },
  ];

  const filteredContextMenuItems = contextMenuItems.filter(
    (item) => !item.hidden && !hiddenActionKeys?.includes(item.key as string)
  );

  return {
    tapCards,
    flipCards,
    contextMenuItems: filteredContextMenuItems,
  };
};

export default useGetCardActions;
