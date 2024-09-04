import { createSoundStore } from '@davstack/sound';

// TODO: allow setting this via settings
const IS_ACTIVE = true;

// interface Sounds {
//   [key: string]: {
//     url: string;
//     volume?: number;
//   };
// }

// TODO: add zustand for this package to work

const SOUND_BASE_PATH = '/assets/sounds';

const soundStore = createSoundStore({
  soundNameToPath: {
    activePlayer: `${SOUND_BASE_PATH}/gong2.wav`,
    shuffle: `${SOUND_BASE_PATH}/shuffle2.wav`,
    draw: `${SOUND_BASE_PATH}/draw2.wav`,
    play: `${SOUND_BASE_PATH}/play.wav`,
  },
});

// TODO: type allowwed sounds
const useSound = (sound: string) => {
  const playSound = () => {
    if (!IS_ACTIVE) return;
    soundStore.play(sound);
  };

  return playSound;
};

export default useSound;
