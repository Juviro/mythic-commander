import React, { PropsWithChildren, ReactNode } from 'react';
import { Space, Switch } from 'antd';

import styles from './Settings.module.css';

interface Props extends PropsWithChildren {
  label: ReactNode;
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
}

const Setting = ({ checked, label, onChange, disabled, children }: Props) => {
  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div className={styles.setting} onClick={onClick}>
      <Space>
        <Switch checked={checked} onChange={onChange} size="small" disabled={disabled} />
        <span>{label}</span>
      </Space>
      {children && <div className={styles.subsettings}>{children}</div>}
    </div>
  );
};

export default Setting;
