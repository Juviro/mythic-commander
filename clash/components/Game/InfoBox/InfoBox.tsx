import React from 'react';

import useInfoBoxText from './useInfoBoxText';

import styles from './InfoBox.module.css';

const InfoBox = () => {
  const text = useInfoBoxText();

  if (!text) return null;

  const { title, description } = text;

  const descriptionLines = [description].flat();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {descriptionLines.map((line) => (
        <p key={line} className={styles.description}>
          {line}
        </p>
      ))}
    </div>
  );
};

export default InfoBox;
