import React, {
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { Player, VisibleCard, Zone } from 'backend/database/gamestate.types';
import DraggableModal from 'components/Game/DraggableModal/DraggableModal';
import { XYCoord } from 'react-dnd';
import { createPortal } from 'react-dom';
import { CARD_MODAL_PORTAL_ROOT_ID } from 'components/Game/GameField/playerInterfacePortal';
import { pluralizeCards } from 'utils/i18nUtils';
import GameStateContext from 'components/Game/GameStateContext';
import StackedCardList from '../StackedCardList/StackedCardList';
import ColoredPlayerName from '../ColoredPlayerName/ColoredPlayerName';

const MODAL_HEIGHT = 420;
const MODAL_MARGIN = 80;

const getInitialPosition = (element: HTMLDivElement, numberOfCards: number) => {
  if (!element) {
    return { x: 0, y: 0 };
  }
  const { x, y, height } = element.getBoundingClientRect();

  const shouldOpenDown = y - MODAL_HEIGHT - MODAL_MARGIN < 0;
  const shouldOpenRight = x + MODAL_MARGIN + 300 > window.innerWidth;

  let positionX: number;
  if (shouldOpenRight) {
    positionX = x - (320 + (numberOfCards - 1) * 70);
  } else {
    positionX = x + 10;
  }

  let positionY: number;
  if (shouldOpenDown) {
    positionY = y + 10 + height;
  } else {
    positionY = y - MODAL_HEIGHT - 10;
  }

  return {
    x: positionX,
    y: positionY,
  };
};

interface Props {
  title: string;
  cards: VisibleCard[];
  elementRef: RefObject<HTMLDivElement>;
  zone: Zone;
  player?: Player;
  resetPosition?: boolean;
}

const CardListModal = ({
  cards,
  elementRef,
  zone,
  title,
  resetPosition,
  player,
}: Props) => {
  const { player: self } = useContext(GameStateContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<XYCoord | null>(null);

  useEffect(() => {
    if (currentPosition || !elementRef.current) return;

    setCurrentPosition(getInitialPosition(elementRef.current, cards.length));
  }, [elementRef.current]);

  useEffect(() => {
    if (!resetPosition || isOpen) return;

    setCurrentPosition(getInitialPosition(elementRef.current!, cards.length));
  }, [resetPosition, isOpen]);

  useEffect(() => {
    if (!elementRef.current) return undefined;

    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      setIsOpen(true);
    };

    elementRef.current.addEventListener('click', onClick);

    return () => {
      elementRef.current?.removeEventListener('click', onClick);
    };
  }, [elementRef.current]);

  useLayoutEffect(() => {
    if (cards.length) return;
    setIsOpen(false);
  }, [cards.length]);

  if (!isOpen || !currentPosition) return null;

  let displayedTitle: ReactNode = title;
  if (player) {
    const isSelf = player.id === self!.id;
    displayedTitle = (
      <span>
        <ColoredPlayerName
          id={player.id}
          addGenetiveSuffix
          name={player.name}
          isSelf={isSelf}
        />{' '}
        {title}
      </span>
    );
  }

  return createPortal(
    <DraggableModal
      title={displayedTitle}
      subtitle={`(${pluralizeCards(cards.length, '1').trim()})`}
      onClose={() => setIsOpen(false)}
      initialPosition={currentPosition}
      onMove={setCurrentPosition}
    >
      <StackedCardList cards={cards} draggable zone={zone} />
    </DraggableModal>,
    document.getElementById(CARD_MODAL_PORTAL_ROOT_ID)!
  );
};

export default CardListModal;
