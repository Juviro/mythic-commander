import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import { LobbyDeck } from 'backend/lobby/GameLobby.types';
import useDeckSelection from './useDeckSelection';
import DeckSelectionModal from './DeckSelectionModal/DeckSelectionModal';
import DeckPreview from './DeckSelectionModal/DeckPreview';

interface Props {
  deck?: LobbyDeck | null;
  canSelectDeck: boolean;
  playerId: string;
  isReady: boolean;
}

const DeckSelection = ({ canSelectDeck, playerId, deck, isReady }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, ownDecks, publicDecks, onSelect } = useDeckSelection(
    playerId,
    canSelectDeck
  );

  if (!canSelectDeck && !deck) {
    return <span>No deck selected</span>;
  }

  const onSelectDeck = (deckId: string) => {
    onSelect(deckId);
    setIsOpen(false);
  };

  return (
    <>
      {deck ? (
        <DeckPreview
          condensed
          deck={deck}
          onClick={canSelectDeck && !isReady ? () => setIsOpen(true) : undefined}
        />
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          type="primary"
          ghost
          style={{ marginLeft: 50 }}
          loading={isLoading}
        >
          Pick a deck
        </Button>
      )}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        width={1100}
        styles={{
          body: {
            maxHeight: 'calc(100vh - 200px)',
          },
        }}
        title="Select your deck"
      >
        <DeckSelectionModal
          ownDecks={ownDecks!}
          publicDecks={publicDecks!}
          onSelect={onSelectDeck}
        />
      </Modal>
    </>
  );
};

export default DeckSelection;
