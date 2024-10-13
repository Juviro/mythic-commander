import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

import styles from './PlayerReady.module.css';

interface Props {
  isReady: boolean;
  canEdit: boolean;
  onChange: (isReady: boolean) => void;
}

const PlayerReadyButton = ({ isReady, canEdit, onChange }: Props) => {
  if (!isReady && !canEdit) {
    return null;
  }

  if (!canEdit && isReady) {
    return <CheckOutlined className={styles.checkmark} />;
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.input_wrapper} htmlFor="ready-checkbox">
        <input
          type="checkbox"
          id="ready-checkbox"
          checked={isReady}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.input}
        />
        <span className={styles.checkbox}>
          <CheckOutlined className={styles.checkmark} />
        </span>
      </label>
    </div>
  );
};

export default PlayerReadyButton;
