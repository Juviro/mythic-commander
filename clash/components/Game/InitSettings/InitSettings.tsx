import useLocalStorage from 'hooks/useLocalStorage';
import { useEffect } from 'react';

export interface Settings {
  autoUntapLands: boolean;
  autoUntapAll: boolean;
  useGrid: boolean;
  commanderDamageChangesLife: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  autoUntapLands: true,
  autoUntapAll: true,
  useGrid: true,
  commanderDamageChangesLife: true,
};

export const SETTINGS_STORAGE_KEY = 'settings';

const InitSettings = () => {
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

  return null;
};

export default InitSettings;
