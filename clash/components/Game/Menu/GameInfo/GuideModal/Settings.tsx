import React, { useEffect } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import Setting from './Setting';

import styles from './GuideModal.module.css';

export const SETTINGS_STORAGE_KEY = 'settings';

interface Settings {
  autoUntap: boolean;
  useGrid: boolean;
  commanderDamageChangesLife: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  autoUntap: true,
  useGrid: true,
  commanderDamageChangesLife: true,
};

const Settings = () => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS
  );

  // make sure new settings are added to local storage
  useEffect(() => {
    const numberOfSettings = Object.keys(settings).filter(
      // make sure we don't count old settings that are no longer used
      (key) => DEFAULT_SETTINGS[key as keyof Settings] !== undefined
    ).length;

    if (numberOfSettings === Object.keys(DEFAULT_SETTINGS).length) return;

    setSettings({ ...DEFAULT_SETTINGS, ...settings });
  }, []);

  const onChangeSetting = (key: keyof Settings) => (value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div>
      <h2 className={styles.guide_title}>Game</h2>
      <Setting
        label="Untap all lands at the beginngin of your turn"
        checked={settings.autoUntap}
        onChange={onChangeSetting('autoUntap')}
      />
      <Setting
        label="Snap cards to grid"
        checked={settings.useGrid}
        onChange={onChangeSetting('useGrid')}
      />
      <Setting
        label="Changing commander damage also changes life total"
        checked={settings.commanderDamageChangesLife}
        onChange={onChangeSetting('commanderDamageChangesLife')}
      />
    </div>
  );
};

export default Settings;
