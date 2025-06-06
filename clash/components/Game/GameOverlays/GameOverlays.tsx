import React from 'react';

import ScreenMessage from './ScreenMessage/ScreenMessage';
import Fireworks from './ScreenMessage/Fireworks';
import TipOfTheDay from './TipOfTheDay/TipOfTheDay';
import FloatingMana from './FloatingMana/FloatingMana';
import Stack from './Stack/Stack';
import CardRules from './CardRules/CardRules';
import RevealedCards from './RevealedCards/RevealedCards';
import Rematch from './Rematch/Rematch';

const GameOverlays = () => {
  return (
    <>
      <ScreenMessage />
      <Fireworks />
      <TipOfTheDay />
      <FloatingMana />
      <RevealedCards />
      <Stack />
      <CardRules />
      <Rematch />
    </>
  );
};

export default GameOverlays;
