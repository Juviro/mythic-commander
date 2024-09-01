import React from 'react';
import { Switch } from 'antd';

import styles from './GuideModal.module.css';

interface Props {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const Setting = ({ checked, label, onChange }: Props) => {
  return (
    <div className={styles.setting} onClick={() => onChange(!checked)}>
      <Switch checked={checked} onChange={onChange} size="small" />
      <span>{label}</span>
    </div>
  );
};

export default Setting;
