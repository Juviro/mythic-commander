import React from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import Setting from './Setting';

import styles from './GuideModal.module.css';

export const SETTINGS_STORAGE_KEY = 'settings';

interface Settings {
  autoUntap: boolean;
  useGrid: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  autoUntap: true,
  useGrid: true,
};

const Settings = () => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS
  );

  const onChangeSetting = (key: keyof Settings) => (value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div>
      <h2 className={styles.guide_title}>Game</h2>
      <Setting
        label="Untap lands when it's your turn"
        checked={settings.autoUntap}
        onChange={onChangeSetting('autoUntap')}
      />
      <Setting
        label="Snap cards to grid"
        checked={settings.useGrid}
        onChange={onChangeSetting('useGrid')}
      />
    </div>
  );
};

export default Settings;
