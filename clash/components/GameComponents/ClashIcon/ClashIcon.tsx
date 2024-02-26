import React, { CSSProperties } from 'react';
import SVG from 'react-inlinesvg';

import { IconId, GENERIC_ICON_IDS, GenericIconId } from './clashIconIds';
import styles from './ClashIcon.module.css';

type Props = {
  size?: string | number;
  id: IconId;
};

const ClashIcon = ({ id, size = '100%' }: Props) => {
  const cssSize = typeof size === 'number' ? `${size}px` : size;

  const cssVariables = {
    '--icon-size': cssSize,
  } as CSSProperties;

  const getDirectory = () => {
    const isGeneric = GENERIC_ICON_IDS.includes(id as GenericIconId);

    return isGeneric ? 'icons' : 'mtgicons';
  };

  return (
    <SVG
      style={cssVariables}
      src={`/assets/${getDirectory()}/${id}.svg`}
      className={styles.icon}
    />
  );
};

export default ClashIcon;
