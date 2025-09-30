import React, { useState } from 'react';

import Emote from 'components/lib/Emote/Emote';
import { EMOTES } from 'components/lib/Emote/emoteIds';
import usePreloadImages from 'hooks/usePreloadImages';
import styles from './EmoteSelection.module.css';
import EmoteOverlay from './EmoteOverlay';

const EmoteSelection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emoteUrls = Object.keys(EMOTES).map((emote) => `/assets/emotes/${emote}.gif`);
  usePreloadImages(emoteUrls);

  return (
    <>
      <div className={styles.emote_selection_wrapper}>
        <button
          className={styles.emote_selection}
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <Emote id="kamigawa-hello" additionalClassName={styles.emote_animated} />
          <img
            src="/assets/images/kamigawa-hello-static.png"
            alt=""
            className={styles.emote_static}
          />
        </button>
      </div>
      {isOpen && <EmoteOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default EmoteSelection;
