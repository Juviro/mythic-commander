import { Button, Tooltip } from 'antd';
import React from 'react';

import SVG from 'react-inlinesvg';

import styles from './Planechase.module.css';

interface PlanechaseButtonProps {
  label: string;
  icon: string;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PlanechaseButton = ({
  label,
  icon,
  tooltip,
  onClick,
  disabled,
}: PlanechaseButtonProps) => {
  return (
    <Tooltip title={tooltip} overlayClassName={styles.tooltip} placement="right">
      <Button
        size="small"
        type="primary"
        className={styles.button}
        icon={<SVG src={`/assets/${icon}.svg`} className={styles.button_icon} />}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default PlanechaseButton;
