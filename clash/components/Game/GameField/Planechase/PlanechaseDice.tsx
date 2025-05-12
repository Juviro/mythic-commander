import React, { useContext, useEffect, useRef, useState } from 'react';
import Dice from 'react-dice-roll';

import { PlanarDiceResult, PlanechaseState } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import GameStateContext from 'components/Game/GameStateContext';

import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './Planechase.module.css';

export const DICE_ROLL_ANIMATION_DURATION = 1000;

type PlanechaseDiceProps = Pick<
  PlanechaseState,
  'lastDiceResult' | 'lastDiceRollTimestamp'
>;

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

const DICE_FACES = [
  '/assets/mtgicons/chaos.svg',
  '/assets/icons/empty.svg',
  '/assets/icons/empty.svg',
  '/assets/icons/empty.svg',
  '/assets/icons/empty.svg',
  '/assets/mtgicons/planeswalker.svg',
];

const getNumbericValue = (result: PlanarDiceResult): DiceValue => {
  switch (result) {
    case 'chaos':
      return 1;
    case 'empty':
      return (Math.ceil(Math.random() * 4) + 1) as DiceValue;
    case 'planeswalk':
      return 6;
    default:
      return 1;
  }
};

const PlanechaseDice = ({
  lastDiceResult,
  lastDiceRollTimestamp,
}: PlanechaseDiceProps) => {
  const { player: self, gameState } = useContext(GameStateContext);
  const [isMounted, setIsMounted] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const { rollDice } = useGameActions();
  const diceRef = useRef<any>(null);

  useEffect(() => {
    // Prevent to animate the dice when loading the page
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    if (!lastDiceResult) return;

    // Trigger the dice animation manually once we have the result from the server
    diceRef.current?.rollDice();
    setIsRolling(true);

    setTimeout(() => {
      setIsRolling(false);
    }, DICE_ROLL_ANIMATION_DURATION);
  }, [lastDiceRollTimestamp]);

  const numericValue = getNumbericValue(lastDiceResult);

  const isActivePlayer = gameState!.activePlayerId === self!.id;

  const onClick = () => {
    if (isRolling || !isActivePlayer) return;
    rollDice();
  };

  return (
    <Tooltip
      title={isActivePlayer ? 'Roll the die' : 'Only the active player can roll the die'}
    >
      <div
        className={classNames(styles.dice_click_wrapper, {
          [styles.dice_click_wrapper_disabled]: !isActivePlayer,
        })}
        onClick={onClick}
      >
        <div className={styles.dice_disable_wrapper}>
          <Dice
            size={40}
            faces={DICE_FACES}
            cheatValue={numericValue}
            defaultValue={numericValue}
            ref={diceRef}
            rollingTime={DICE_ROLL_ANIMATION_DURATION}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default PlanechaseDice;
