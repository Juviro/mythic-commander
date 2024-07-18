import useSoundHook from 'use-sound';

// TODO: allow setting this via settings
const IS_ACTIVE = true;

interface Sounds {
  [key: string]: {
    url: string;
    volume?: number;
  };
}

const SOUNDS: Sounds = {
  ACTIVE_PLAYER: {
    url: '/assets/sounds/gong2.wav',
    volume: 0.5,
  },
  SHUFFLE: {
    url: '/assets/sounds/shuffle2.wav',
  },
  DRAW: {
    url: '/assets/sounds/draw2.wav',
  },
  PLAY: {
    url: '/assets/sounds/play.wav',
  },
};

type SoundType = keyof typeof SOUNDS;

const useSound = (sound: SoundType) => {
  const { url, volume = 1 } = SOUNDS[sound];

  return useSoundHook(url, {
    volume,
    soundEnabled: IS_ACTIVE,
  });
};

export default useSound;
