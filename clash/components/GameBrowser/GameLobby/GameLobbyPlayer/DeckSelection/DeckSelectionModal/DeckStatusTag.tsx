import React from 'react';

import classNames from 'classnames';
import styles from './DecksList.module.css';

interface Props {
  status: string;
  setImg?: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DeckStatusTag = ({ status, setImg }: Props) => {
  if (status === 'decks') return null;

  return (
    <div
      className={classNames(styles.deck_status_tag, {
        [styles[`deck_status_tag__${status}`]]: status,
      })}
    >
      {setImg && <img className={styles.set_img} src={setImg} alt="" />}
      <span>{capitalizeFirstLetter(status)}</span>
    </div>
  );
};

export default DeckStatusTag;
