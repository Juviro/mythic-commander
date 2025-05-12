import React, { useContext } from 'react';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import GameStateContext, { InitializedGameState } from 'components/Game/GameStateContext';
import CardPositionContext from 'components/Game/CardPositionContext';
import useGameActions from 'components/Game/useGameActions';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import PlanechaseButton from './PlanechaseButton';
import PlanechaseDice from './PlanechaseDice';
import PlanechaseImage from './PlanechaseImage';

import styles from './Planechase.module.css';
import usePlanechaseActions from './usePlanechaseActions';
import CardCounter from '../PlayerInterface/Battlefield/BattlefieldCard/CardCounters/CardCounter';

const getDiceRollIcon = (diceRollCost: number) => {
  if (diceRollCost <= 20) return diceRollCost;
  // This should never happen. But just in case.
  return 'infinity';
};

const Planechase = () => {
  const { player: self, gameState } = useContext(
    GameStateContext
  ) as InitializedGameState;
  const { setHoveredCard } = useContext(CardPositionContext);
  const { planeswalk } = useGameActions();
  const { items } = usePlanechaseActions();

  if (!gameState.planechase) return null;

  const { activePlane, lastDiceResult, lastDiceRollTimestamp } = gameState.planechase;

  const isActivePlayer = gameState!.activePlayerId === self!.id;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.one_player_layout]: gameState.players.length === 1,
        [styles.three_player_layout]: gameState.players.length === 3,
      })}
      onMouseEnter={() => setHoveredCard(activePlane)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <ContextMenu items={items}>
        <div className={styles.inner}>
          <PlanechaseImage activePlane={activePlane} />
          <div className={styles.content}>
            <div className={styles.header}>
              <Tooltip title="Cost to roll the die">
                <div className={styles.dice_roll_cost}>
                  <SVG
                    src={`/assets/mtgicons/${getDiceRollIcon(
                      gameState.planechase.diceRollCost
                    )}.svg`}
                    className={styles.dice_roll_cost_icon}
                  />
                </div>
              </Tooltip>
              {Boolean(activePlane.counters) && (
                <CardCounter
                  type="generic"
                  amount={activePlane.counters!}
                  isLabel
                  clashId={activePlane.clashId}
                />
              )}
              <PlanechaseDice
                lastDiceResult={lastDiceResult}
                lastDiceRollTimestamp={lastDiceRollTimestamp}
              />
            </div>
            {isActivePlayer && (
              <div className={styles.buttons}>
                <PlanechaseButton
                  label="Planeswalk"
                  onClick={() => planeswalk()}
                  icon="mtgicons/planeswalker"
                  // eslint-disable-next-line max-len
                  tooltip="Move to the next plane. This happens every time roll you the planeswalker symbol on the die."
                />
              </div>
            )}
          </div>
        </div>
      </ContextMenu>
    </div>
  );
};

export default Planechase;
