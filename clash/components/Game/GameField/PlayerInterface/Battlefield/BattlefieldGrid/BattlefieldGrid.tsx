import React from 'react';
import classNames from 'classnames';

import useIsShiftPressed from 'hooks/useIsShiftPressed';
import styles from './BattlefieldGrid.module.css';

export const HORIZONTAL_GRID_SIZE = 20;
export const VERTICAL_GRID_SIZE = 50;

const getLinesArray = (size: number) => Array.from({ length: size + 1 });

const BattlefieldGrid = () => {
  const hidden = useIsShiftPressed();

  return (
    <div
      className={classNames(styles.grid, {
        [styles.grid_hidden]: hidden,
      })}
    >
      <div className={classNames(styles.wrapper, styles.wrapper_horizontal)}>
        {getLinesArray(HORIZONTAL_GRID_SIZE).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={styles.line_horizontal}
          />
        ))}
      </div>
      <div className={classNames(styles.wrapper, styles.wrapper_vertical)}>
        {getLinesArray(VERTICAL_GRID_SIZE).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={styles.line_vertical}
          />
        ))}
      </div>
    </div>
  );
};

export default BattlefieldGrid;
