import React, { useState } from 'react';

import { Deck } from 'types/graphql';

import LandSuggestionIcon from './LandSuggestionIcon';
import LandSuggestionModal from './LandSuggestionModal/LandSuggestionModal';
import { LandSuggestionContextProvider } from './LandSuggestionContext';

interface LandSuggestionProps {
  deck: Deck;
}

const LandSuggestion = ({ deck }: LandSuggestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LandSuggestionIcon onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <LandSuggestionContextProvider setIsOpen={setIsOpen} deckId={deck.id}>
          <LandSuggestionModal
            deck={deck}
            // reset the form on close
            key={isOpen.toString()}
          />
        </LandSuggestionContextProvider>
      )}
    </>
  );
};

export default LandSuggestion;
