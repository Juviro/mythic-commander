import React from 'react';

import classNames from 'classnames';
import styles from './DecksList.module.css';

interface Props {
  status: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DeckStatusTag = ({ status }: Props) => {
  return (
    <div
      className={classNames(styles.deck_status_tag, {
        [styles[`deck_status_tag__${status}`]]: status,
      })}
    >
      <span>{capitalizeFirstLetter(status)}</span>
    </div>
  );
};

export default DeckStatusTag;
