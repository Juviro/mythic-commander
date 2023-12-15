import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { VisibleCard } from 'backend/database/gamestate.types';
import { Popover } from 'antd';
import { getImageUrl } from 'utils/getImageUrl';
import { TooltipPlacement } from 'antd/es/tooltip';

import styles from './Card.module.css';

interface Props extends PropsWithChildren {
  card: VisibleCard;
  tooltipPlacement?: TooltipPlacement;
  open?: boolean;
}

const CardPreview = ({ card, children, tooltipPlacement, open }: Props) => {
  const { flippable } = card;

  return (
    <Popover
      content={
        <div className={styles.tooltip_images}>
          <img className={styles.tooltip_image} src={getImageUrl(card.id)} />
          {flippable && (
            <img
              className={styles.tooltip_image}
              src={getImageUrl(card.id, 'normal', 'back')}
            />
          )}
        </div>
      }
      trigger={['contextMenu']}
      overlayClassName={classNames(styles.tooltip_wrapper, {
        [styles.tooltip_wrapper__flippable]: flippable,
      })}
      open={open}
      placement={tooltipPlacement}
    >
      {children}
    </Popover>
  );
};

export default CardPreview;
