import uniqid from 'uniqid';

import { randomizeArray } from 'utils/randomizeArray';
import { InitMatchCard } from 'backend/database/matchStore';
import { VisibleCard } from 'backend/database/gamestate.types';
import { isCatOrDog } from './easterEggs';
import getCardMeta from '../getCardMeta';

const getclashCardProps = (card: InitMatchCard): Omit<VisibleCard, 'ownerId'> => ({
  id: card.id,
  name: card.name,
  manaValue: card.manaValue,
  transformable: card.transformable,
  flippable: card.flippable,
  type_line: card.type_line,
  produced_mana: card.produced_mana,
  layout: card.layout,
  clashId: uniqid(),
  meta: {
    relatedCards: getCardMeta(card),
  },
});

const getInitialCards = (cards: InitMatchCard[], commanderIds?: string[]) => {
  let isFurryFriend = false;

  const commanders: Omit<VisibleCard, 'ownerId'>[] = [];

  const filteredCards = cards
    .filter((card) => {
      if (commanderIds?.includes(card.id)) {
        if (isCatOrDog(card)) {
          isFurryFriend = true;
        }
        commanders.push(getclashCardProps(card));
        return false;
      }

      return true;
    })
    .map((card) => {
      const spreadeCards = [];
      for (let i = 0; i < card.amount; i += 1) {
        spreadeCards.push(getclashCardProps(card));
      }

      return spreadeCards;
    })
    .flat();

  const randomizedCards = randomizeArray(filteredCards);

  return {
    cards: randomizedCards,
    commanders,
    isFurryFriend,
  };
};

export default getInitialCards;
