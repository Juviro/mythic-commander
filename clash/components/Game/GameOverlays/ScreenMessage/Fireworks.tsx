import React, { useContext, useEffect, useRef } from 'react';
import FireworksJs, { FireworksHandlers } from '@fireworks-js/react';

import GameStateContext from 'components/Game/GameStateContext';

const Fireworks = () => {
  const ref = useRef<FireworksHandlers>(null);

  const { gameState } = useContext(GameStateContext);

  useEffect(() => {
    if (gameState?.winner) {
      ref.current?.start();
    } else {
      ref.current?.stop();
    }
  }, [gameState?.winner]);

  return (
    <FireworksJs
      ref={ref}
      options={{
        opacity: 0.5,
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Fireworks;
