import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import CardListModal from 'components/GameComponents/CardListModal/CardListModal';
import { getLibraryId } from 'components/Game/GameField/PlayerInterface/Library/Library';
import useGameActions from 'components/Game/useGameActions';
import RevealedCardsMoveToButton from './RevealedCardsMoveToButton';

interface Props {
  player: Player;
  isSelf: boolean;
}

const RevealedCardsModal = ({ player, isSelf }: Props) => {
  const { onRevealCards } = useGameActions();
  const [_, setIsInitialized] = useState(false);

  // force second render to make sure libraryElement is defined
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!player.revealedCards) {
    return null;
  }

  const onRevealSingleCard = () => {
    onRevealCards({ zone: ZONES.LIBRARY, amount: 1 });
  };

  const libraryElement = document.getElementById(
    getLibraryId(player.id)
  ) as HTMLDivElement;

  return (
    <CardListModal
      open
      closable={false}
      cards={player.revealedCards.cards}
      title="revealed cards"
      element={libraryElement}
      zone={ZONES.LIBRARY}
      player={player}
      footer={
        isSelf && (
          <Space>
            <RevealedCardsMoveToButton player={player} />
            <Button onClick={onRevealSingleCard} type="primary">
              Reveal another card [R]
            </Button>
          </Space>
        )
      }
    />
  );
};

export default RevealedCardsModal;
