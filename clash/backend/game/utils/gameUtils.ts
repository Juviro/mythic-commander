import { XYCoord } from 'react-dnd';
import {
  BattlefieldCard,
  Card,
  FaceDownCard,
  GameState,
  Player,
  VisibleBattlefieldCard,
  VisibleCard,
} from 'backend/database/gamestate.types';

export const obfuscatePlayer = (player: Player, selfId: string): Player => {
  const obfuscateCard = (card: Card) => {
    if ((card as VisibleCard).visibleTo?.includes(selfId)) {
      return card;
    }

    return {
      clashId: card.clashId,
      ownerId: card.ownerId,
      attachedCardIds: card.attachedCardIds,
    } as Card;
  };

  const isSelf = player.id === selfId;
  const hand = isSelf ? player.zones.hand : player.zones.hand.map(obfuscateCard);
  const battlefield = player.zones.battlefield.map((card) => {
    const isFaceDownCard = (c: BattlefieldCard): c is FaceDownCard => {
      return Boolean((c as FaceDownCard).faceDown);
    };

    if (!isFaceDownCard(card)) return card;

    const baseProps = {
      clashId: card.clashId,
      faceDown: true,
      position: card.position,
      tapped: card.tapped,
      counters: card.counters,
      ownerId: card.ownerId,
      visibleTo: card.visibleTo,
      attachedCardIds: card.attachedCardIds,
    } as FaceDownCard;

    if (!card.visibleTo?.includes(selfId)) {
      return baseProps;
    }

    return {
      ...baseProps,
      id: (card as VisibleBattlefieldCard).id,
      name: (card as VisibleBattlefieldCard).name,
    } as BattlefieldCard;
  }) as BattlefieldCard[];

  const library = player.zones.library.map(obfuscateCard);
  if (player.playWithTopCardRevealed && player.zones.library.length > 0) {
    library.pop();
    library.push(player.zones.library[player.zones.library.length - 1]);
  }

  return {
    ...player,
    zones: {
      ...player.zones,
      library,
      battlefield,
      hand,
    },
  } as Player;
};

export const obfuscateStack = (stack: GameState['stack']) => {
  if (!stack) {
    return {
      visible: false,
      cards: [],
    } as NonNullable<GameState['stack']>;
  }

  return {
    ...stack,
    cards: stack.cards.map((card) => {
      if (!(card as VisibleBattlefieldCard).faceDown) {
        return card;
      }

      return {
        ...card,
        id: null,
        name: '',
        manaValue: undefined,
        meta: null,
        produced_mana: undefined,
        layout: undefined,
        type_line: undefined,
        transformable: false,
        flippable: false,
      };
    }),
  } as NonNullable<GameState['stack']>;
};

export const obfuscatePlanechase = (
  planechase: GameState['planechase']
): GameState['planechase'] => {
  if (!planechase) return undefined;

  return {
    ...planechase,
    planesDeck: planechase.planesDeck.map(({ clashId }) => ({ clashId })),
  } as NonNullable<GameState['planechase']>;
};

export const getStackedPosition = (position: XYCoord, index = 1, direction: 'up' | 'down'): XYCoord => {
  if (direction === 'up') {
    return {
      x: position.x - index * 2,
      y: position.y - index * 4,
    };
  }
  return {
    x: position.x + index * 2,
    y: position.y + index * 4,
  };
};

export const getFirstAvailablePosition = (
  initalPosition: XYCoord,
  battlefield: BattlefieldCard[],
  direction: 'up' | 'down' = 'down'
): XYCoord => {
  const doesCardExistAtPosition = (newPosition: XYCoord) => {
    return battlefield.some(
      (card) => card.position?.x === newPosition.x && card.position?.y === newPosition.y
    );
  };

  let stackedPosition = initalPosition;
  while (doesCardExistAtPosition(stackedPosition)) {
    stackedPosition = getStackedPosition(stackedPosition, 1, direction);
  }
  return stackedPosition;
};

export const fixPosition = (position?: { x: number; y: number }) => {
  if (!position) return position;

  return {
    x: Math.max(0, Math.min(100, position.x)),
    y: Math.max(0, Math.min(100, position.y)),
  };
};

export const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
