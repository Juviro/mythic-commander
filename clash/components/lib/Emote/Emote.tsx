import React from 'react';
import classNames from 'classnames';

import { EmoteId } from './emoteIds';
import styles from './Emote.module.css';

interface Props {
  id: EmoteId;
  additionalClassName?: string;
}

const Emote = ({ id, additionalClassName }: Props) => {
  return (
    <img
      src={`/assets/emotes/${id}.gif`}
      alt={id}
      className={classNames(styles.emote, additionalClassName)}
    />
  );
};

export default Emote;
