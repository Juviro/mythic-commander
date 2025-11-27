import React, { useContext, useState } from 'react';
import SVG from 'react-inlinesvg';
import classNames from 'classnames';
import { Modal, Space, Tooltip } from 'antd';

import GameStateContext, { InitializedGameState } from 'components/Game/GameStateContext';
import CardPositionContext from 'components/Game/CardPositionContext';
import useGameActions from 'components/Game/useGameActions';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import { ZoomInOutlined } from '@ant-design/icons';
import { getImageUrl } from 'utils/getImageUrl';
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
  const [isZoomed, setIsZoomed] = useState(false);

  if (!gameState.planechase) return null;

  const { activePlane, lastDiceResult, lastDiceRollTimestamp } = gameState.planechase;

  const isActivePlayer = gameState!.activePlayerId === self!.id;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.one_player_layout]: gameState.players.length === 1,
        [styles.three_player_layout]: gameState.players.length === 3,
      })}
    >
      <ContextMenu items={items}>
        <div
          className={styles.inner}
          onMouseEnter={() => setHoveredCard(activePlane)}
          onMouseLeave={() => setHoveredCard(null)}
        >
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
              <Space orientation="vertical">
                <ZoomInOutlined
                  className={styles.zoom_in_icon}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                {Boolean(activePlane.counters) && (
                  <CardCounter
                    type="generic"
                    amount={activePlane.counters!}
                    isLabel
                    clashId={activePlane.clashId}
                    additionalClassName={styles.counter}
                  />
                )}
              </Space>
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
          <Modal
            open={isZoomed}
            onCancel={() => setIsZoomed(false)}
            footer={null}
            className={styles.zoomed_modal}
            closeIcon={null}
          >
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={getImageUrl(activePlane.id)}
              className={styles.zoomed_image}
              onClick={() => setIsZoomed(false)}
            />
          </Modal>
        </div>
      </ContextMenu>
    </div>
  );
};

export default Planechase;
