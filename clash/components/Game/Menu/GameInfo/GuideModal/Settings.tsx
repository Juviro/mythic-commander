import React from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import {
  Settings as SettingsType,
  SETTINGS_STORAGE_KEY,
} from 'components/Game/InitSettings/InitSettings';
import Setting from './Setting';

import styles from './GuideModal.module.css';

const Settings = () => {
  const [settings, setSettings] = useLocalStorage<SettingsType>(SETTINGS_STORAGE_KEY);

  const onChangeSetting = (key: keyof SettingsType) => (value: boolean) => {
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
