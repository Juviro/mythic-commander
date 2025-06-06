import { BookOutlined } from '@ant-design/icons';
import GameStateContext, { InitializedGameState } from 'components/Game/GameStateContext';
import CardPositionContext from 'components/Game/CardPositionContext';
import useGameActions from 'components/Game/useGameActions';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import { useContext } from 'react';

const usePlanechaseActions = () => {
  const { gameState } = useContext(GameStateContext) as InitializedGameState;
  const { setRulesCardId } = useContext(CardPositionContext);

  const { onAddCounters } = useGameActions();

  const addCounter = () => {
    onAddCounters({
      cardIds: [gameState.planechase!.activePlane.clashId],
      amount: 1,
      type: 'generic',
    });
  };

  const items = [
    {
      key: 'add-counter',
      label: 'Add counter',
      onClick: addCounter,
      icon: <ClashIcon id="counter-shield" size={16} />,
    },
    {
      key: 'rules',
      label: 'Rules',
      onClick: () => setRulesCardId(gameState.planechase!.activePlane.clashId),
      icon: <BookOutlined />,
    },
  ];

  return {
    items,
  };
};

export default usePlanechaseActions;
