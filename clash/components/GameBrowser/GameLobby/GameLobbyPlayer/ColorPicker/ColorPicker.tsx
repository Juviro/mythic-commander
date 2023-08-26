import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';

import { PLAYER_COLORS } from 'constants/colors';
import GameBrowserContext from 'components/GameBrowser/GameBrowserContext';
import styles from './ColorPicker.module.css';
import ColorField from './ColorField';

interface Props {
  canSelectColor: boolean;
  color: string | null;
}

const ColorPicker = ({ canSelectColor, color }: Props) => {
  const { onSelectColor, currentLobby } = useContext(GameBrowserContext);

  const availableColors = PLAYER_COLORS.filter(
    (c) => !currentLobby?.players.some((player) => player.color === c)
  );

  useEffect(() => {
    if (!canSelectColor || color) return;

    onSelectColor?.(availableColors[0]);
  }, []);

  if (!canSelectColor || !color) {
    return <ColorField color={color} />;
  }

  const colorOptions = availableColors.map((value) => ({
    value,
    label: value,
  }));

  const currentValue = {
    value: color,
    label: <ColorField color={color} />,
  };

  return (
    <Select
      onChange={({ value }) => onSelectColor!(value)}
      className={styles.select}
      value={currentValue}
      labelInValue
    >
      {colorOptions.map(({ value }) => (
        <Select.Option key={value} value={value}>
          <ColorField color={value} />
        </Select.Option>
      ))}
    </Select>
  );
};

export default ColorPicker;
