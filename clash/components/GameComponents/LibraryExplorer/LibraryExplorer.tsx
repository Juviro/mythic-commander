import React, { RefObject, useContext, useEffect, useState } from 'react';
import { XYCoord } from 'react-dnd';
import { createPortal } from 'react-dom';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import { CARD_MODAL_PORTAL_ROOT_ID } from 'components/Game/GameField/playerInterfacePortal';
import LibraryExplorerContent from './LibraryExplorerContent';
import ColoredPlayerName from '../ColoredPlayerName/ColoredPlayerName';
import DraggableModal from '../DraggableModal/DraggableModal';

const MODAL_HEIGHT = 450;
const MODAL_WIDTH = 1500;
const MODAL_MARGIN = 20;

const getInitialPosition = (element: HTMLDivElement) => {
  if (!element) {
    return { x: 0, y: 0 };
  }
  const { x, y, height } = element.getBoundingClientRect();

  const shouldOpenDown = y < window.innerHeight / 2;
  const shouldOpenRight = x < window.innerWidth / 2;

  let positionX: number;
  let positionY: number;

  if (shouldOpenRight) {
    positionX = x;
  } else {
    positionX = window.innerWidth - MODAL_MARGIN - MODAL_WIDTH;
  }

  if (shouldOpenDown) {
    positionY = y + height;
  } else {
    positionY = y - MODAL_HEIGHT - MODAL_MARGIN * 2;
  }

  if (positionX + MODAL_WIDTH + MODAL_MARGIN > window.innerWidth) {
    // This is the player in the top left
    if (shouldOpenDown) {
      positionX = MODAL_MARGIN;
    } else {
      // This is the player in the bottom right
      positionX = window.innerWidth - MODAL_MARGIN - MODAL_WIDTH;
    }
  }

  return {
    x: positionX,
    y: positionY,
  };
};

interface Props {
  player: Player;
  libraryRef: RefObject<HTMLDivElement | null>;
}

const LibraryExplorer = ({ player, libraryRef }: Props) => {
  const { getPlayerColor, player: self } = useContext(GameStateContext);
  const { peekingCards } = useContext(GameStateContext);
  const [currentPosition, setCurrentPosition] = useState<XYCoord | null>(null);

  const isPeeking =
    player.id === peekingCards?.playerId && peekingCards?.zone === ZONES.LIBRARY;

  const cards = isPeeking ? peekingCards.cards : null;

  useEffect(() => {
    if (currentPosition || !libraryRef.current) return;

    setCurrentPosition(getInitialPosition(libraryRef.current));
  }, [libraryRef.current]);

  useEffect(() => {
    if (cards?.length || !libraryRef.current) return;

    setCurrentPosition(getInitialPosition(libraryRef.current));
  }, [cards?.length, libraryRef.current]);

  if (!cards?.length || !currentPosition) return null;

  const color = getPlayerColor(cards[0].ownerId);
  const isSelf = self!.id === player.id;

  return createPortal(
    <DraggableModal
      initialPosition={currentPosition}
      onMove={setCurrentPosition}
      title={
        <span>
          <ColoredPlayerName
            id={player.id}
            addGenetiveSuffix
            name={player.name}
            isSelf={isSelf}
          />{' '}
          Library
        </span>
      }
    >
      <LibraryExplorerContent color={color} />
    </DraggableModal>,
    document.getElementById(CARD_MODAL_PORTAL_ROOT_ID)!
  );
};

export default LibraryExplorer;
