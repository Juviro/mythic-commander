import React from 'react';

import Setting from './Setting';
import useSettings, { Settings as SettingsType } from './useSettings';

import styles from './Settings.module.css';

const Settings = () => {
  const [settings, setSettings] = useSettings();

  const onChangeSetting = (key: keyof SettingsType) => (value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className={styles.settings}>
      <h2 className={styles.guide_title}>Game</h2>
      <Setting
        label={
          <span>
            Untap all <b>lands</b> at the beginngin of your turn
          </span>
        }
        checked={settings.autoUntapLands}
        onChange={onChangeSetting('autoUntapLands')}
        disabled={settings.autoUntapAll}
      >
        <Setting
          label={
            <span>
              Untap all <b>permanents</b> at the beginngin of your turn
            </span>
          }
          checked={settings.autoUntapAll}
          onChange={onChangeSetting('autoUntapAll')}
          disabled={!settings.autoUntapLands}
        />
      </Setting>
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
      <Setting
        label="Display tip of the day"
        checked={settings.displayTipOfTheDay}
        onChange={onChangeSetting('displayTipOfTheDay')}
      />
    </div>
  );
};

export default Settings;
