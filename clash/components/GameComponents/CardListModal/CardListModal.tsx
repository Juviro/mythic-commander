import React, {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Player, VisibleCard, Zone } from 'backend/database/gamestate.types';
import { XYCoord } from 'react-dnd';
import { createPortal } from 'react-dom';
import { CARD_MODAL_PORTAL_ROOT_ID } from 'components/Game/GameField/playerInterfacePortal';
import { pluralizeCards } from 'utils/i18nUtils';
import GameStateContext from 'components/Game/GameStateContext';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import useClickedOutside from 'hooks/useClickedOutside';
import { Checkbox } from 'antd';
import StackedCardList from '../StackedCardList/StackedCardList';
import ColoredPlayerName from '../ColoredPlayerName/ColoredPlayerName';
import DraggableModal from '../DraggableModal/DraggableModal';

const MODAL_HEIGHT = 420;
const MODAL_MARGIN = 80;

const getInitialPosition = (numberOfCards: number, element?: HTMLDivElement | null) => {
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
    positionY = y + 20 + height;
  } else {
    positionY = y - MODAL_HEIGHT - 50;
  }

  return {
    x: positionX,
    y: positionY,
  };
};

interface Props {
  title: string;
  cards: VisibleCard[];
  element?: HTMLDivElement | null;
  zone: Zone;
  player?: Player;
  resetPosition?: boolean;
  open?: boolean;
  closable?: boolean;
  footer?: ReactNode;
}

const CardListModal = ({
  cards,
  element,
  zone,
  title,
  resetPosition,
  player,
  open,
  closable = true,
  footer,
}: Props) => {
  const { player: self } = useContext(GameStateContext);
  const [internalIsOpen, setIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<XYCoord | null>(null);
  const [keepOpen, setKeepOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isOpen = open ?? internalIsOpen;

  useShortcut(SHORTCUTS.CANCEL, () => setIsOpen(false), {
    disabled: !isOpen || !closable,
  });

  useClickedOutside(modalRef, () => setIsOpen(false), {
    disabled: keepOpen || !closable,
  });

  useEffect(() => {
    if (currentPosition || !element) return;

    setCurrentPosition(getInitialPosition(cards.length, element));
  }, [element]);

  useEffect(() => {
    if (!resetPosition || isOpen) return;

    setCurrentPosition(getInitialPosition(cards.length, element));
  }, [resetPosition, isOpen]);

  useEffect(() => {
    if (!element) return undefined;

    const onClick = (event: MouseEvent) => {
      event.preventDefault();

      setIsOpen(true);
    };

    element.addEventListener('click', onClick);

    return () => {
      element?.removeEventListener('click', onClick);
    };
  }, [element]);

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
      modalRef={modalRef}
      closable={closable}
      title={displayedTitle}
      subtitle={`${pluralizeCards(cards.length, '1')}`}
      onClose={() => setIsOpen(false)}
      initialPosition={currentPosition}
      onMove={setCurrentPosition}
    >
      <StackedCardList cards={cards} draggable zone={zone} />
      {closable && (
        <Checkbox checked={keepOpen} onChange={(e) => setKeepOpen(e.target.checked)}>
          Always visible
        </Checkbox>
      )}
      {footer}
    </DraggableModal>,
    document.getElementById(CARD_MODAL_PORTAL_ROOT_ID)!
  );
};

export default CardListModal;
